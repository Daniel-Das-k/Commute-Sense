from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
from dotenv import load_dotenv
import warnings
import pandas as pd
from datetime import datetime
import random
# from twilio.rest import Client
# Load environment variables
load_dotenv()

GOOGLE_GEMINI_KEY = 'AIzaSyDpeHeAlRsSBeetdJGfaa_MW7CkqX8173U'

# Suppress warnings
warnings.filterwarnings("ignore", category=UserWarning, module="langchain")

app = Flask(__name__)
CORS(app)

def get_pdf_text(pdf_path):
    if os.path.isfile(pdf_path):
        pdf_reader = PdfReader(pdf_path)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
        return text
    else:
        raise FileNotFoundError(f"No such file: '{pdf_path}'")

def get_text_chunks(text):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
    chunks = text_splitter.split_text(text)
    return chunks

def get_vector_store(text_chunks):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key='AIzaSyDpeHeAlRsSBeetdJGfaa_MW7CkqX8173U')
    vector_store = FAISS.from_texts(text_chunks, embedding=embeddings)
    vector_store.save_local("faiss_index_second_dataset")

def get_conversational_chain():
    prompt_template = '''
    Answer the following commuter-related question based on the context provided. 
    Use details about transportation options, expected commuter demand, weather, events, and 
    optimal routes, as available. Consider any specific conditions affecting travel, such as 
    delays, route adjustments, and event-based scheduling. Provide a concise, clear response 
    that helps the commuter make informed travel decisions.

    Context:
    {context}

    Question:
    {question}
    '''
    prompt_template='''
        You are a travel assistant providing information about public transportation options, commuter demand, weather conditions, and events impacting travel. Given a query, retrieve and generate a concise response based on the following:

    Keywords & Intent: Identify core terms related to transportation modes, weather ,locations, events, time, and other important details in the query.
    Contextual Data: Refer to provided context (e.g., transportation schedules, demand trends, weather, and events) relevant to the query.
    Optimized Suggestions: Recommend efficient routes, considering real-time or planned impacts from demand, traffic, and events on different travel options.
    Conciseness: Provide clear, action-oriented information that directly addresses the user’s needs.
    Query: {question}

    Context: {context}

    Response: Generate an informed answer that combines relevant information from the context with keywords and intent from the query.If the answer is
    about making prediction try to understand and analyze the entire context and provide an answer . If the question is relevant to the context then provide 
    the response for sure and dont say that I dont know the answer.If you cant find the direct answer from the context 
    provided , from your analysis try to relate the similar keywords and form an response . Never say you dont have the answer for it . Try to give response for everything asked.
        
    '''

    model = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.3, google_api_key='AIzaSyDpeHeAlRsSBeetdJGfaa_MW7CkqX8173U')
    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
    return chain

def user_input(user_question):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key='AIzaSyDpeHeAlRsSBeetdJGfaa_MW7CkqX8173U')
    print('2')
    new_db_files = FAISS.load_local("faiss_index_second_dataset", embeddings, allow_dangerous_deserialization=True)
    print("1")
    docs = new_db_files.similarity_search(user_question, k=10)
    print("docs.....",docs)
    chain=get_conversational_chain()
    response = chain.invoke({"input_documents": docs, "question": user_question}, return_only_outputs=True)
    return response["output_text"]

# Load the PDF and create the vector store (this runs once on startup)
raw_text = get_pdf_text("dataset/dataset2.pdf")
text_chunks = get_text_chunks(raw_text)
get_vector_store(text_chunks)

@app.route('/ask', methods=['POST'])
def ask_question():
    data = request.json
    question = data.get('question')
    if not question:
        return jsonify({"error": "No question provided"}), 400

    answer = user_input(question)
    return jsonify({"answer": answer})
def time_to_datetime(time_str):
    return datetime.strptime(time_str, '%I:%M %p')

# Load the existing bus route data from the CSV file
df = pd.read_csv('03STL_updated.csv')

# New bus allotment times
new_bus_times = [
    time_to_datetime('06:10 AM'), time_to_datetime('06:40 AM'), time_to_datetime('07:20 AM'),
    time_to_datetime('07:30 AM'), time_to_datetime('07:40 AM'), time_to_datetime('07:50 AM')
]

# Convert the relevant arrival time columns to datetime
arrival_time_columns = ['Arrival Time'] + [f'Arrival Time Bus {i}' for i in range(2, 8)]
for col in arrival_time_columns:
    df[col] = df[col].apply(time_to_datetime)

# Function to track the bus along the route
def track_bus(df, start_time, bus_id, arrival_time_column):
    output = []
    bus_capacity = 0
    max_capacity = 50  # Maximum bus capacity

    # Start tracking the bus from the first stop
    for i, row in df.iterrows():
        current_arrival_time = row[arrival_time_column]

        # Determine the number of passengers getting off at this stop
        passengers_getting_off = random.randint(0, min(bus_capacity, 10))
        bus_capacity -= passengers_getting_off

        # Determine the number of passengers getting on at this stop
        new_passengers = random.randint(1, 10)
        
        # Ensure total passengers do not exceed bus capacity
        if bus_capacity + new_passengers > max_capacity:
            new_passengers = max_capacity - bus_capacity  # Only allow as many passengers as the bus can hold
        
        bus_capacity += new_passengers
        
        output.append(f"Bus {bus_id} reached {row['Stop Name']} at {current_arrival_time.strftime('%I:%M %p')}.")
        output.append(f"{passengers_getting_off} passengers got off, {new_passengers} new passengers got on.")
        output.append(f"Total passengers: {bus_capacity}")
        
        # Check if the current time matches a new bus allotment time
        if current_arrival_time == start_time:
            if bus_capacity > 10:  # Threshold for deciding if a new bus is needed
                output.append("-------------------------------")
                output.append(f"New bus {bus_id} allotted at {current_arrival_time.strftime('%I:%M %p')} due to sufficient passengers in the existing bus.")
                output.append("-------------------------------")
                return output, True  # Return output and True if a new bus is allotted
            else:
                output.append("-------------------------------")
                output.append(f"New bus {bus_id} skipped at {current_arrival_time.strftime('%I:%M %p')} due to low passenger count.")
                output.append("-------------------------------")
                return output, False  # Return output and False if no new bus is needed

    return output, False  # Return output and False if no new bus is needed throughout the route

@app.route('/track_buses', methods=['GET'])
def track_buses():
    output = []
    bus_id = 1
    for start_time, arrival_time_column in zip(new_bus_times, arrival_time_columns):
        output.append(f"Tracking Bus {bus_id} from starting point...")
        bus_output, new_bus_allotted = track_bus(df, start_time, bus_id, arrival_time_column)
        output.extend(bus_output)
        if new_bus_allotted:
            bus_id += 1  # Increment bus ID for the next bus
    output.append("All buses tracked.")
    
    return jsonify(output)  # Return the output as JSON

# TWILIO_ACCOUNT_SID = "AC14b7523ccc01f53ee932c607b35e1f0d"
# TWILIO_AUTH_TOKEN = "ee17ba7cf8ddf86d50fd1986054c7560"
# TWILIO_PHONE_NUMBER = "+19094534179"  # Twilio number, make sure this is authorized to send SMS to India

# # Initialize the Twilio client
# client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

# @app.route('/send-notification', methods=['POST'])
# def send_notification():
#     data = request.json
#     driver_name = data.get('name')
#     phone_number = data.get('phoneNumber')

#     # Ensure the phone number has the correct format for India
#     if not phone_number.startswith("+91"):
#         phone_number = "+91" + phone_number  # Prefix the number with +91 if not present

#     # Define your message content
#     message_body = f"{driver_name}"

#     try:
#         # Send SMS
#         message = client.messages.create(
#             body=message_body,
#             from_=TWILIO_PHONE_NUMBER,
#             to=phone_number
#         )
#         return jsonify({'status': 'success', 'message': 'Notification sent!'}), 200
#     except Exception as e:
#         return jsonify({'status': 'error', 'message': str(e)}), 500
if __name__ == '__main__':
    app.run(port=5000)
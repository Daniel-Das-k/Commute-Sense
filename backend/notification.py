
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from twilio.rest import Client
# import os

# app = Flask(__name__)
# CORS(app)

# # Twilio configuration
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

# if __name__ == '__main__':
#     app.run(debug=True)
from flask import Flask, request, jsonify
from flask_cors import CORS
from twilio.rest import Client

app = Flask(__name__)
CORS(app)

# Twilio configuration
TWILIO_ACCOUNT_SID = "AC14b7523ccc01f53ee932c607b35e1f0d"
TWILIO_AUTH_TOKEN = "ee17ba7cf8ddf86d50fd1986054c7560"
TWILIO_PHONE_NUMBER = "+19094534179"  # Replace with your Twilio number

client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

@app.route('/send-notification', methods=['POST'])
def send_notification():
    data = request.json
    driver_name = data.get('name')
    phone_number = data.get('phoneNumber')

    if not phone_number.startswith("+91"):
        phone_number = "+91" + phone_number  # Prefix with country code for India

    message_body = f"{driver_name}, your bus route is overlapping with route 10 ... kindly use route 9 to avoid congestion."

    try:
        message = client.messages.create(
            body=message_body,
            from_=TWILIO_PHONE_NUMBER,
            to=phone_number
        )
        return jsonify({'status': 'success', 'message': 'Notification sent!'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

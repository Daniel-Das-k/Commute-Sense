// import React, { useState } from 'react';
// import axios from 'axios';
// import 'ldrs/bouncy';
// function Chatbot() {
//     const [question, setQuestion] = useState('');
//     const [answer, setAnswer] = useState('');
//     const [loading,setLoading] = useState(false);
//     const handleAskQuestion = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.post('http://localhost:5000/ask', {
//                 question: question
//             });
//             setAnswer(response.data.answer);
//             setLoading(false);
//         } catch (error) {
//             console.error("Error fetching answer:", error);
//             setAnswer("Sorry, something went wrong. Please try again.");
//         }
//     };

//     return (
//         <div style={{ padding: '20px'}}>
//             <h1>RAG Chatbot</h1>
//             <input
//                 type="text"
//                 placeholder="Enter your question..."
//                 value={question}
//                 onChange={(e) => setQuestion(e.target.value)}
//                 style={{ width: '60%', padding: '10px' ,color:"black"}}
//             />
//             <button onClick={handleAskQuestion} style={{ padding: '10px 20px', marginLeft: '10px' }}>
//                 Ask
//             </button>
//             <div style={{ marginTop: '20px' }}>
//                 {loading ? (
                    
//             <>
//                  <l-bouncy
//                     size="45"
//                     speed="1.75"
//                     color="#fff"
//                   ></l-bouncy>
//             </>
                   
                    
                    
//                 ):(
//                     <>
//                     {answer && (
//                         <>
//                          <h3>Answer:</h3>
//                          <p>{answer}</p>
//                          </>
//                     )}
                    
//                     </>
//                 )}
                
//             </div>
//         </div>
//     );
// }

// export default Chatbot;
// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import styled, { keyframes } from 'styled-components';
// import 'ldrs/bouncy';
// import { CiSearch } from "react-icons/ci";
// const Container = styled.div`
//   display: flex;
//   height: 100vh;
  
// `;

// const SubContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   width: 100%;
// //   background: #000;
// `;

// const SecondContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: 500px;
//   overflow-y: auto;
//   max-height: 500px;
//   padding: 2rem;
// `;

// const MessageContainerRight = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   margin-bottom: 1rem;
//   width: 100%;
//   align-self: flex-end;
// `;

// const MessageContainerLeft = styled.div`
//   display: flex;
//   justify-content: flex-start;
//   margin-bottom: 1rem;
//   max-width: 820px;
//   align-self: flex-start;
// `;

// const P = styled.p`
//   padding: 1rem 1.5rem;
//   border: 1px solid rgba(255, 255, 255, 0.2);
//   border-radius: 30px;
//   font-size: 17px;
//   letter-spacing: 1px;
// `;

// const P2 = styled.p`
//   padding: 1rem 1.5rem;
//   border: 1px solid rgba(255, 255, 255, 0.2);
//   border-radius: 30px;
//   font-size: 1.1rem;
//   letter-spacing: 1px;
// `;

// const ButtonAnimation = keyframes`
//   0% { transform: scale(1); }
//   50% { transform: scale(1.1); }
//   100% { transform: scale(1); }
// `;

// const Button = styled.button`
//   background: linear-gradient(45deg, #004D4D, #009999);
//   border: none;
//   padding: 12px 24px;
//   border-radius: 10px;
//   font-size: 16px;
//   color: white;
//   cursor: pointer;
//   margin-bottom: 20px;
//   transition: background-color 0.3s ease;
//   box-shadow: 0 0 1px 1px #fff;

//   &:hover {
//     background-color: #ff4d4d;
//     animation: ${ButtonAnimation} 1s infinite;
//   }

//   &:disabled {
//     background-color: #999;
//     cursor: not-allowed;
//   }
// `;

// function Chatbot() {
//   const [question, setQuestion] = useState('');
//   const [answer, setAnswer] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const messagesEndRef = useRef(null);

//   const typeWords = (words) => {
//     let currentWordIndex = 0;
//     const typeNextWord = () => {
//       if (currentWordIndex < words.length) {
//         setMessages((prevMessages) => {
//           const updatedMessages = [...prevMessages];
//           const currentResult = updatedMessages[updatedMessages.length - 1].result || '';
//           const nextWord = words[currentWordIndex] + ' ';
//           updatedMessages[updatedMessages.length - 1] = {
//             ...updatedMessages[updatedMessages.length - 1],
//             result: currentResult + nextWord,
//           };
//           return updatedMessages;
//         });
//         currentWordIndex++;
//         setTimeout(typeNextWord, 70);
//       }
//     };
//     typeNextWord();
//   };

//   const handleAskQuestion = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:5000/ask', {
//         question: question
//       });
//       setMessages([...messages, { text: question, result: response.data.answer, loading: false }]);
//       setAnswer(response.data.answer);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching answer:", error);
//       setMessages([...messages, { text: question, result: "Sorry, something went wrong. Please try again.", loading: false }]);
//       setLoading(false);
//     }
//     setQuestion('');
//   };

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   return (
//     <Container>
//       <SubContainer>
//         <SecondContainer>
//           {messages.map((message, index) => (
//             <div key={index}>
//               {message.text && (
//                 <MessageContainerRight>
//                   <P>{message.text}</P>
//                 </MessageContainerRight>
//               )}
//               {message.loading && (
//                 <l-bouncy size="45" speed="1.75" color="#fff"></l-bouncy>
//               )}
//               {!message.loading && message.result && (
//                 <MessageContainerLeft>
//                   <P2>{message.result}</P2>
//                 </MessageContainerLeft>
//               )}
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </SecondContainer>

//         <div style={{display: "flex", justifyContent: "center", width: "100%" ,marginBottom:"20px"}}>
//           <input
//             type="text"
//             placeholder="Enter your question..."
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             style={{
//               width: '60%',
//               padding: '15px',
//               paddingBottom:"20px",
//               color: "black",
//               fontSize: '16px',
//               background:"black",
//               borderRadius: '30px',
//               marginBottom: '10px',
//               border:"1px solid rgba(255, 255, 255, 0.5)",
              
//             }}
//           />
//           <button  onClick={handleAskQuestion}>

//           <CiSearch style={{ width: "70px", height: "40px", marginLeft: "-4.5rem",marginBottom:"8px" }} />
//           </button>
//         </div>
//       </SubContainer>
//     </Container>
//   );
// }

// export default Chatbot;
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import 'ldrs/bouncy';
import { CiSearch } from "react-icons/ci";

const Container = styled.div`
  display: flex;
  height: 90vh;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const SecondContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  overflow-y: auto;
  max-height: 500px;
  padding: 2rem;
`;

const MessageContainerRight = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
  width: 100%;
  align-self: flex-end;
`;

const MessageContainerLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;
  max-width: 820px;
  align-self: flex-start;
`;

const P = styled.p`
  padding: 1rem 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  font-size: 17px;
  letter-spacing: 1px;
`;

const P2 = styled.p`
  padding: 1rem 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  font-size: 1.1rem;
  letter-spacing: 1px;
`;

const ButtonAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const Button = styled.button`
  background: linear-gradient(45deg, #004D4D, #009999);
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 16px;
  color: white;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.3s ease;
  box-shadow: 0 0 1px 1px #fff;

  &:hover {
    background-color: #ff4d4d;
    animation: ${ButtonAnimation} 1s infinite;
  }

  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;

function Chatbot() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  
    const typeWords = (words) => {
        let currentWordIndex = 0;
        const typeNextWord = () => {
            if (currentWordIndex < words.length) {
                setMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages];
                    const currentResult = updatedMessages[updatedMessages.length - 1].result || '';
                    const nextWord = words[currentWordIndex] + ' ';
                    updatedMessages[updatedMessages.length - 1] = {
                        ...updatedMessages[updatedMessages.length - 1],
                        result: currentResult + nextWord,
                    };
                    return updatedMessages;
                });
                currentWordIndex++;
                setTimeout(typeNextWord, 70);
            }
        };
        typeNextWord();
    };
    const handleAskQuestion = async () => {
        setLoading(true);
        setMessages([...messages, { text: question, result: '', loading: true }]); // Add question to messages with loading
        setQuestion(''); // Reset the question input
    
        try {
            // Request to get the answer
            const response = await axios.post('http://localhost:5000/ask', { question: question });
            const answerText = response.data.answer;
    
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];
                updatedMessages[updatedMessages.length - 1].loading = false; // Stop loading
                return updatedMessages;
            });
    
            // Process the answer for typing animation
            let resultArray = answerText.split(""); // Split answer text by each character
            let newArray = '';
            for (let i = 0; i < resultArray.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    newArray += resultArray[i]; // Add character to the result
                } else {
                    newArray += resultArray[i]; // Add character to the result
                }
            }
    
            // Replace specific characters (optional)
            let newArray2 = newArray.split("*").join("<br/>");
            let newArray3 = newArray2.split("#").join("<br/>");
    
            // Update the last message with the processed answer using typing effect
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];
                updatedMessages[updatedMessages.length - 1] = {
                    ...updatedMessages[updatedMessages.length - 1],
                    loading: false,
                    result: '',
                };
                return updatedMessages;
            });
    
            // Trigger the typing effect
            typeWords(newArray3.split(' ')); // Break the words by space and pass them to the typeWords function
    
        } catch (error) {
            console.error("Error fetching answer:", error);
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: question, result: "Sorry, something went wrong. Please try again.", loading: false },
            ]);
            setLoading(false);
        }
    };
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Container>
      <SubContainer>
        <SecondContainer>
          {messages.map((message, index) => (
            <div key={index}>
              {message.text && (
                <MessageContainerRight>
                  <P>{message.text}</P>
                </MessageContainerRight>
              )}
              {message.loading && (
                <l-bouncy size="45" speed="1.75" color="#fff"></l-bouncy>
              )}
              {!message.loading && message.result && (
                <MessageContainerLeft>
                  <P2>{message.result}</P2>
                </MessageContainerLeft>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </SecondContainer>

        <div style={{ display: "flex", justifyContent: "center", width: "100%", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Enter your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            style={{
              width: '60%',
              padding: '15px',
              paddingBottom: "20px",
              color: "white",
              fontSize: '16px',
              background: "black",
              borderRadius: '30px',
              marginBottom: '10px',
              border: "1px solid rgba(255, 255, 255, 0.5)",
            }}
          />
          <button onClick={handleAskQuestion}>
            <CiSearch style={{ width: "70px", height: "40px", marginLeft: "-4.5rem", marginBottom: "8px" }} />
          </button>
        </div>
      </SubContainer>
    </Container>
  );
}

export default Chatbot;


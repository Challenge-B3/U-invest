import React, { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import "./Droid.css";
import droidIcon from "../../assets/droidIcon.png";
import axios from "axios";

Modal.setAppElement("#root");

const Droid = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [defaultMessageSent, setDefaultMessageSent] = useState(false);
  const [lastUserMessage, setLastUserMessage] = useState("");
  const chatContainerRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState("");

  const openChat = () => {
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  let isFirstUserMessage = true;

  function handleChoice(choice) {
    if (choice === "1") {
      setSelectedOption(choice);
      const msg = "Digite sua dúvida:";
      sendMessage(msg, "bot");
    }
  }

  const sendMessage = (msg, sender) => {
    const newMessage = {
      text: msg,
      sender: sender,
    };
  
    setChatHistory((prevChatHistory) => [...prevChatHistory, newMessage]);
  
    if (sender === "user") {
      fetch("http://127.0.0.1:5000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: msg }),
      })
        .then((response) => response.json())
        .then((data) => {
          
          const botMessage = {
            text: data.response,
            sender: "bot",
          };
          setChatHistory((prevChatHistory) => [...prevChatHistory, botMessage]);
        })
        .catch((error) => {
          const errorMessage = {
            text: "Ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.",
            sender: "bot",
          };
          setChatHistory((prevChatHistory) => [...prevChatHistory, errorMessage]);
          console.error(error);
        });
    }
  };

  useEffect(() => {
    if (isChatOpen) {
      axios.get('http://127.0.0.1:5000/introducao')
        .then((response) => {
          const { boas_vindas, opcoes } = response.data;
          sendMessage(boas_vindas, 'bot');
          opcoes.forEach(opcao => sendMessage(opcao, 'bot'));
        })
        .catch((error) => {
          console.error(error);
          sendMessage("Ocorreu um erro ao carregar as opções. Por favor, tente novamente.", "bot");
        });
    }
  }, [isChatOpen]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  useEffect(() => {
    if (isChatOpen) {
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
        }
      }, 0);
    }
  }, [isChatOpen]);

  const ChatHeader = ({ onClose }) => (
    <div className="chat-header">
      <img src={droidIcon} alt="Chat Icon" className="header-icon" />
      <button className="close-button" onClick={onClose}>
        <FaTimes />
      </button>
    </div>
  );

  const ChatMessage = ({ chat }) => (
    <div className={`message ${chat.sender}`}>
      {chat.sender === "bot" && (
        <img src={droidIcon} alt="Bot Icon" className="message-icon" />
      )}
      {chat.text}
    </div>
  );

  const ChatInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
      setMessage(e.target.value);
    };

    const handleInputKeyPress = (e) => {
      if (e.key === "Enter" && message.trim() !== "") {
        e.preventDefault();
        onSendMessage(message, "user");
        setMessage("");
      }
    };

    const handleSend = () => {
      if (message.trim() !== "") {
        onSendMessage(message, "user");
        setMessage("");
      }
    };

    return (
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
          placeholder="Digite uma mensagem"
        />
        <button onClick={handleSend}>Enviar</button>
      </div>
    );
  };

  return (
    <div>
      <div className="chat-icon" onClick={openChat}>
        <img src={droidIcon} alt="Chat Icon" />
      </div>
      <Modal
        isOpen={isChatOpen}
        onRequestClose={closeChat}
        className="chat-modal"
        overlayClassName="chat-overlay"
      >
        <ChatHeader onClose={closeChat} />
        <div className="chat-container" ref={chatContainerRef}>
          <div className="chat-messages">
            <div className="chat-scrollable">
              {chatHistory.map((chat, index) => (
                <ChatMessage key={index} chat={chat} />
              ))}
            </div>
          </div>
          <ChatInput onSendMessage={sendMessage} />
        </div>
      </Modal>
    </div>
  );
};

export default Droid;

import React, { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import "./Droid.css";
import droidIcon from "../../assets/droidIcon.png";

Modal.setAppElement("#root");

const Droid = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [defaultMessageSent, setDefaultMessageSent] = useState(false);
  const chatContainerRef = useRef(null);

  const openChat = () => {
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  const sendMessage = (msg, sender) => {
    const newMessage = {
      text: msg,
      sender: sender,
    };

    setChatHistory((prevChatHistory) => [...prevChatHistory, newMessage]);
  };

  useEffect(() => {
    if (isChatOpen && !defaultMessageSent) {
      sendDefaultMessage();
      setDefaultMessageSent(true);
    }
  }, [isChatOpen, defaultMessageSent]);

  const sendDefaultMessage = () => {
    sendMessage("Bem-vindo ao Droid! Eu sou um chatbot sobre IPOs. Como posso ajudá-lo?", "bot");
    sendMessage("Escolha uma das opções abaixo:", "bot");
    sendMessage("1 - Tirar dúvidas sobre IPO", "bot");
    sendMessage("2 - Sumarizar o prospecto", "bot");
    sendMessage("3 - Abrir pagina com prospectos", "bot");
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  useEffect(() => {
    if (isChatOpen && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
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
            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
          </div>
          <ChatInput onSendMessage={sendMessage} />
        </div>
      </Modal>
    </div>
  );
};

export default Droid;

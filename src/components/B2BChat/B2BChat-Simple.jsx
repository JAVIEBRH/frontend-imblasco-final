/**
 * B2B CHAT SIMPLIFICADO CON IA
 * Chat tipo WhatsApp conectado a agente de IA
 * Texto libre - Sin acciones/estados complejos
 */

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";

// API URL (configuración centralizada)
import { API_URL } from '../../config/api.js'

/**
 * Componente principal del Chat B2B con IA
 */
const B2BChat = ({ userId, isAuthenticated = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll al final
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Mensaje de bienvenida al abrir
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(
        "¡Hola! 👋 Soy tu asistente B2B de ImBlasco. ¿En qué puedo ayudarte hoy?"
      );
    }
  }, [isOpen]);

  // Enfocar input al abrir
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  /**
   * Agregar mensaje del bot
   */
  const addBotMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text,
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  };

  /**
   * Agregar mensaje del usuario
   */
  const addUserMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text,
        sender: "user",
        timestamp: new Date(),
      },
    ]);
  };

  /**
   * Enviar mensaje al backend con IA
   */
  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    addUserMessage(userMessage);
    setIsLoading(true);

    try {
      // Obtener historial de conversación (últimos 10 mensajes)
      const conversationHistory = messages.slice(-10).map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      }));

      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          userId: userId || "anonymous",
          conversationHistory,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success) {
        addBotMessage(data.message);
      } else {
        throw new Error(data.error || "Error desconocido");
      }
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      addBotMessage(
        `⚠️ Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.`
      );
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  /**
   * Manejar Enter para enviar
   */
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "rgb(244, 165, 28)",
          color: "white",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
        }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Ventana del chat */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "24px",
            width: "380px",
            height: "600px",
            backgroundColor: "white",
            borderRadius: "16px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
            zIndex: 999,
            overflow: "hidden",
            animation: "fadeInUp 0.3s ease-out",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "20px",
              backgroundColor: "rgb(244, 165, 28)",
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MessageCircle size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: "16px" }}>
                Asistente B2B
              </div>
              <div style={{ fontSize: "12px", opacity: 0.9 }}>
                {isLoading ? "Escribiendo..." : "En línea"}
              </div>
            </div>
          </div>

          {/* Mensajes */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              backgroundColor: "#f5f5f5",
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  maxWidth: "75%",
                  animation: "fadeInUp 0.3s ease-out",
                }}
              >
                <div
                  style={{
                    padding: "12px 16px",
                    borderRadius: "12px",
                    backgroundColor:
                      msg.sender === "user" ? "rgb(244, 165, 28)" : "white",
                    color: msg.sender === "user" ? "white" : "#333",
                    fontSize: "14px",
                    lineHeight: "1.5",
                    boxShadow:
                      msg.sender === "bot"
                        ? "0 1px 2px rgba(0,0,0,0.1)"
                        : "none",
                  }}
                >
                  {msg.text}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#999",
                    marginTop: "4px",
                    paddingLeft: "4px",
                  }}
                >
                  {new Date(msg.timestamp).toLocaleTimeString("es-CL", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))}

            {/* Indicador de escritura */}
            {isLoading && (
              <div
                style={{
                  alignSelf: "flex-start",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  backgroundColor: "white",
                  display: "flex",
                  gap: "6px",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                <span
                  className="typing-dot"
                  style={{ animationDelay: "0s" }}
                ></span>
                <span
                  className="typing-dot"
                  style={{ animationDelay: "0.2s" }}
                ></span>
                <span
                  className="typing-dot"
                  style={{ animationDelay: "0.4s" }}
                ></span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: "16px",
              borderTop: "1px solid #e5e5e5",
              backgroundColor: "white",
              display: "flex",
              gap: "8px",
              borderBottomLeftRadius: "16px",
              borderBottomRightRadius: "16px",
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu mensaje..."
              disabled={isLoading}
              style={{
                flex: 1,
                padding: "12px 16px",
                border: "1px solid #e5e5e5",
                borderRadius: "24px",
                fontSize: "14px",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgb(244, 165, 28)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e5e5e5";
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                backgroundColor:
                  inputMessage.trim() && !isLoading
                    ? "rgb(244, 165, 28)"
                    : "#e5e5e5",
                color: "white",
                border: "none",
                cursor:
                  inputMessage.trim() && !isLoading ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.2s",
              }}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .typing-dot {
          width: 8px;
          height: 8px;
          background: #999;
          border-radius: 50%;
          display: inline-block;
          animation: typing 1s infinite;
        }
        @keyframes typing {
          0%, 100% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
};

export default B2BChat;

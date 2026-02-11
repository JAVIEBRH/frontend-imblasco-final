/**
 * B2B CHAT CON IA - DISEÑO MEJORADO
 * Chat tipo WhatsApp con Asistente Virtual de ImBlasco
 * Texto libre con diseño moderno y profesional
 */

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

// API URL (configuración centralizada)
import { API_URL } from '../../config/api.js'

const USE_CHAT_STREAM = import.meta.env.VITE_USE_CHAT_STREAM === 'true' || import.meta.env.VITE_USE_CHAT_STREAM === true
if (import.meta.env.DEV) console.log('[B2BChat] Streaming activo:', USE_CHAT_STREAM)

/**
 * Componente principal del Chat B2B con IA
 */
const B2BChat = ({ userId, isAuthenticated = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState({});

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Auto-scroll al final
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Mensaje de bienvenida al abrir
  useEffect(() => {
    if (isOpen && messages.length === 0 && userId) {
      initChat();
    }
  }, [isOpen, userId]);

  // Enfocar input al abrir
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  /**
   * Inicializar chat
   */
  const initChat = async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/chat/init`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      if (data.success) {
        addBotMessage(
          data.botMessage ||
            "¡Hola! 👋 Soy tu Asistente Virtual de ImBlasco. ¿En qué puedo ayudarte?"
        );
        setCart(data.cart || {});
      }
    } catch (error) {
      console.error("Error init chat:", error);
      addBotMessage(
        "¡Hola! 👋 Soy tu Asistente Virtual de ImBlasco. ¿En qué puedo ayudarte?"
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Agregar mensaje del bot
   */
  const addBotMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
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
        id: Date.now() + Math.random(),
        text,
        sender: "user",
        timestamp: new Date(),
      },
    ]);
  };

  /**
   * Enviar mensaje al backend con IA (normal o streaming según VITE_USE_CHAT_STREAM)
   */
  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !userId) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    addUserMessage(userMessage);
    setIsLoading(true);

    const messageUrl = USE_CHAT_STREAM ? `${API_URL}/chat/message/stream` : `${API_URL}/chat/message`;
    const body = {
      userId: userId,
      message: userMessage,
      ...(USE_CHAT_STREAM ? {} : { conversationHistory: messages.slice(-10).map((msg) => ({ role: msg.sender === "user" ? "user" : "assistant", content: msg.text })) }),
    };

    try {
      const response = await fetch(messageUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      if (USE_CHAT_STREAM) {
        // No añadir mensaje vacío al inicio: así solo se ven los puntitos, sin burbuja/contenedor vacío
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let fullText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const payload = JSON.parse(line.slice(6));
                if (payload.text != null) {
                  fullText += payload.text;
                  const toShow = fullText;
                  setMessages((prev) => {
                    const next = [...prev];
                    const last = next[next.length - 1];
                    if (last?.sender === "bot") {
                      next[next.length - 1] = { ...last, text: toShow };
                    } else {
                      next.push({ id: Date.now() + Math.random(), text: toShow, sender: "bot", timestamp: new Date() });
                    }
                    return next;
                  });
                  await new Promise((r) => { requestAnimationFrame(r); });
                }
                if (payload.done === true) {
                  const finalText = payload.botMessage ?? fullText;
                  setMessages((prev) => {
                    const next = [...prev];
                    const last = next[next.length - 1];
                    if (last?.sender === "bot") {
                      next[next.length - 1] = { ...last, text: finalText };
                    } else {
                      next.push({ id: Date.now() + Math.random(), text: finalText, sender: "bot", timestamp: new Date() });
                    }
                    return next;
                  });
                  if (payload.cart) setCart(payload.cart);
                }
              } catch (_) {}
            }
          }
        }
      } else {
        const data = await response.json();
        if (data.success) {
          addBotMessage(
            data.botMessage ||
              data.message ||
              "Lo siento, no pude procesar tu mensaje."
          );
          if (data.cart) setCart(data.cart);
        } else {
          throw new Error(data.error || "Error desconocido");
        }
      }
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      let errorMessage = "⚠️ Lo siento, hubo un error al procesar tu mensaje.";
      if (error.message?.includes("Failed to fetch") || error.message?.includes("NetworkError")) {
        errorMessage = "⚠️ Error de conexión con el backend. Por favor, intenta de nuevo.";
      } else if (error.message?.includes("HTTP 500")) {
        errorMessage = "⚠️ Error en el servidor. Por favor, intenta de nuevo en un momento.";
      } else if (error.message?.includes("HTTP 400")) {
        errorMessage = "⚠️ Error en la solicitud. Por favor, verifica tu mensaje.";
      } else if (error.message) {
        errorMessage = `⚠️ ${error.message}`;
      }
      if (USE_CHAT_STREAM) {
        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          if (last?.sender === "bot" && (last.text === "" || last.text == null)) {
            next[next.length - 1] = { ...last, text: errorMessage };
            return next;
          }
          return [...next, { id: Date.now() + Math.random(), text: errorMessage, sender: "bot", timestamp: new Date() }];
        });
      } else {
        addBotMessage(errorMessage);
      }
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
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

  // Calcular items del carrito
  const cartItemCount = Object.keys(cart.items || {}).length;
  const cartTotalUnits = Object.values(cart.items || {}).reduce(
    (sum, item) => sum + (item.cantidad || 0),
    0
  );

  // Si no está autenticado, mostrar solo botón
  if (!isAuthenticated) {
    return (
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chat-toggle-btn"
        title="Inicia sesión para usar el chat B2B"
      >
        <MessageCircle size={24} />
      </button>
    );
  }

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chat-toggle-btn"
        style={{
          backgroundColor: isOpen ? "#64748b" : "rgb(244, 165, 28)",
          transform: isOpen ? "scale(0.98)" : "scale(1)",
        }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        {/* Badge del carrito */}
        {cartItemCount > 0 && !isOpen && (
          <span className="cart-badge">{cartItemCount}</span>
        )}
      </button>

      {/* Ventana del chat */}
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-content">
              <div className="chat-avatar bot-avatar">
                <Bot size={20} />
              </div>
              <div className="chat-header-info">
                <div className="chat-header-name">
                  ImBlasco · Asistente Virtual
                </div>
                <div className="chat-header-status">
                  ● {isLoading ? "Escribiendo..." : "En línea"}
                </div>
              </div>
            </div>
            {cartItemCount > 0 && (
              <div className="chat-cart-indicator">
                🛒 {cartTotalUnits} unidades
              </div>
            )}
          </div>

          {/* Mensajes */}
          <div className="chat-messages" ref={messagesContainerRef}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message-wrapper ${
                  msg.sender === "user" ? "user-message" : "bot-message"
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="message-avatar bot-avatar-small">
                    <Bot size={14} />
                  </div>
                )}
                <div
                  className={`message-bubble ${
                    msg.sender === "user" ? "user-bubble" : "bot-bubble"
                  }`}
                >
                  <div className="message-text">{msg.text}</div>
                  {/* No mostrar hora mientras el bot está escribiendo (ya sale al final del mensaje cuando termina) */}
                  {!(isLoading && messages[messages.length - 1]?.id === msg.id && msg.sender === "bot") && (
                    <div className="message-time">
                      {new Date(msg.timestamp).toLocaleTimeString("es-CL", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  )}
                </div>
                {msg.sender === "user" && null}
              </div>
            ))}

            {/* Indicador de escritura (misma estructura que mensaje del bot: avatar + puntitos) */}
            {isLoading && (
              <div className="message-wrapper bot-message">
                <div className="message-avatar bot-avatar-small">
                  <Bot size={14} />
                </div>
                <div className="typing-indicator">
                  <div
                    className="typing-dot"
                    style={{ animationDelay: "0s" }}
                  ></div>
                  <div
                    className="typing-dot"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="typing-dot"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chat-input-container">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Pregunta por stock, precios u horarios…"
              disabled={isLoading}
              className="chat-input"
            />
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="chat-send-btn"
            >
              <Send size={18} />
            </button>
          </div>

          {/* Resumen carrito (si hay items) */}
          {cartItemCount > 0 && (
            <div className="chat-cart-summary">
              <span>
                🛒 {cartItemCount} producto(s) ·{" "}
                {cartTotalUnits.toLocaleString()} unidades
              </span>
            </div>
          )}
        </div>
      )}

      <style>{`
        :root {
          --chat-font: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
        }

        /* Botón flotante */
        .chat-toggle-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: rgb(244, 165, 28);
          color: white;
          border: none;
          cursor: pointer;
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          transition: all 0.25s ease;
        }

        .chat-toggle-btn:hover {
          transform: scale(1.06) !important;
          box-shadow: 0 14px 30px rgba(15, 23, 42, 0.24);
        }

        .chat-toggle-btn svg {
          display: block;
        }

        .cart-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background-color: #0f172a;
          color: white;
          font-size: 11px;
          font-weight: 700;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
        }

        /* Ventana del chat */
        .chat-window {
          position: fixed;
          bottom: 100px;
          right: 24px;
          width: min(360px, calc(100vw - 48px));
          max-height: calc(100vh - 140px);
          background-color: #f8f9fb;
          border-radius: 18px;
          border: 1px solid #e8edf3;
          box-shadow: 0 24px 60px rgba(9, 33, 67, 0.18);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 9999;
          animation: slideUp 0.28s ease;
          font-family: var(--chat-font);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Header */
        .chat-header {
          background: rgba(255, 255, 255, 0.92);
          color: #0f172a;
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #eef2f7;
          backdrop-filter: blur(10px);
        }

        .chat-header-content {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }

        .chat-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #f4a51c;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1f2937;
          box-shadow: 0 6px 14px rgba(15, 23, 42, 0.12);
        }

        .bot-avatar {
          background: #f4a51c;
        }

        .chat-header-info {
          flex: 1;
        }

        .chat-header-name {
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.2px;
          margin-bottom: 2px;
        }

        .chat-header-status {
          font-size: 12px;
          color: #16a34a;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .chat-header-status::before {
          display: none;
        }

        .chat-cart-indicator {
          background: #f1f5f9;
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          color: #475569;
        }

        /* Mensajes */
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          background: #f6f7fb;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .chat-messages::-webkit-scrollbar {
          width: 6px;
        }

        .chat-messages::-webkit-scrollbar-track {
          background: transparent;
        }

        .chat-messages::-webkit-scrollbar-thumb {
          background: rgba(15, 23, 42, 0.15);
          border-radius: 999px;
        }

        .message-wrapper {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          animation: messageSlide 0.16s ease-out;
        }

        @keyframes messageSlide {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .user-message {
          flex-direction: row-reverse;
        }

        .message-avatar {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .bot-avatar-small {
          background: #e2e8f0;
          color: #334155;
        }

        .message-bubble {
          max-width: 70%;
          padding: 10px 12px;
          border-radius: 16px;
          position: relative;
          word-wrap: break-word;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
        }

        .bot-bubble {
          background: #ffffff;
          color: #0f172a;
          border: 1px solid #edf1f6;
          border-bottom-left-radius: 8px;
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.04);
        }

        .user-bubble {
          background: #334155;
          color: #f8fafc;
          border-bottom-right-radius: 8px;
        }

        .message-text {
          font-size: 14px;
          line-height: 1.5;
          white-space: pre-wrap;
          margin-bottom: 4px;
        }

        .message-text ul,
        .message-text ol {
          padding-left: 18px;
          margin: 6px 0 0;
        }

        .message-text li {
          margin: 2px 0;
        }

        .message-time {
          font-size: 11px;
          color: #94a3b8;
          margin-top: 4px;
          text-align: right;
        }

        /* Indicador de escritura */
        .typing-indicator {
          display: flex;
          gap: 6px;
          padding: 8px 12px;
          background: #ffffff;
          border-radius: 14px;
          border: 1px solid #eef2f7;
          width: fit-content;
          box-shadow: 0 6px 16px rgba(15, 23, 42, 0.06);
        }

        .typing-dot {
          width: 6px;
          height: 6px;
          background: #94a3b8;
          border-radius: 50%;
          animation: typing 1.2s infinite;
        }

        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.6;
          }
          30% {
            transform: translateY(-6px);
            opacity: 1;
          }
        }

        /* Input */
        .chat-input-container {
          padding: 12px 14px;
          background: #ffffff;
          border-top: 1px solid #eef2f7;
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .chat-input {
          flex: 1;
          padding: 10px 12px;
          border: 1px solid #e6edf5;
          border-radius: 12px;
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
          font-family: inherit;
          background: #f8fafc;
        }

        .chat-input:focus {
          border-color: rgba(244, 165, 28, 0.6);
          box-shadow: 0 0 0 4px rgba(244, 165, 28, 0.15);
        }

        .chat-input:disabled {
          background-color: #f1f5f9;
          cursor: not-allowed;
        }

        .chat-send-btn {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: #f4a51c;
          color: #1f2937;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .chat-send-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          background: #e39618;
        }

        .chat-send-btn:disabled {
          background: #e2e8f0;
          color: #94a3b8;
          cursor: not-allowed;
          transform: none;
        }

        /* Resumen carrito */
        .chat-cart-summary {
          padding: 8px 14px 10px;
          background: #f8fafc;
          border-top: 1px solid #eef2f7;
          font-size: 12px;
          color: #64748b;
          text-align: center;
        }

        /* Responsive */
        @media (max-width: 480px) {
          .message-bubble {
            max-width: 85%;
          }

          .chat-window {
            right: 12px;
            bottom: 80px;
            width: calc(100vw - 24px);
            max-height: calc(100vh - 100px);
          }

          .chat-toggle-btn {
            bottom: 16px;
            right: 16px;
            width: 56px;
            height: 56px;
          }
        }
      `}</style>
    </>
  );
};

export default B2BChat;

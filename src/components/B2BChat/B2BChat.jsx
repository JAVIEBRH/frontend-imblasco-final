/**
 * B2B CHAT CON IA - DISEÑO MEJORADO
 * Chat tipo WhatsApp con Asistente Virtual de ImBlasco
 * Texto libre con diseño moderno y profesional
 */

import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'

// API URL (proxy configurado en vite.config.js)
const API_URL = '/api'

/**
 * Componente principal del Chat B2B con IA
 */
const B2BChat = ({ userId, isAuthenticated = false }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [cart, setCart] = useState({})
  
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const messagesContainerRef = useRef(null)

  // Auto-scroll al final
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Mensaje de bienvenida al abrir
  useEffect(() => {
    if (isOpen && messages.length === 0 && userId) {
      initChat()
    }
  }, [isOpen, userId])

  // Enfocar input al abrir
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  /**
   * Inicializar chat
   */
  const initChat = async () => {
    if (!userId) return
    
    setIsLoading(true)
    try {
      const res = await fetch(`${API_URL}/chat/init`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      })
      
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      
      const data = await res.json()
      if (data.success) {
        addBotMessage(data.botMessage || '¡Hola! 👋 Soy tu Asistente Virtual de ImBlasco. ¿En qué puedo ayudarte?')
        setCart(data.cart || {})
      }
    } catch (error) {
      console.error('Error init chat:', error)
      addBotMessage('¡Hola! 👋 Soy tu Asistente Virtual de ImBlasco. ¿En qué puedo ayudarte?')
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Agregar mensaje del bot
   */
  const addBotMessage = (text) => {
    setMessages(prev => [...prev, {
      id: Date.now() + Math.random(),
      text,
      sender: 'bot',
      timestamp: new Date()
    }])
  }

  /**
   * Agregar mensaje del usuario
   */
  const addUserMessage = (text) => {
    setMessages(prev => [...prev, {
      id: Date.now() + Math.random(),
      text,
      sender: 'user',
      timestamp: new Date()
    }])
  }

  /**
   * Enviar mensaje al backend con IA
   */
  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !userId) return

    const userMessage = inputMessage.trim()
    setInputMessage('')
    addUserMessage(userMessage)
    setIsLoading(true)

    try {
      // Obtener historial de conversación (últimos 10 mensajes)
      const conversationHistory = messages
        .slice(-10)
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        }))

      const response = await fetch(`${API_URL}/chat/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userId,
          message: userMessage,
          conversationHistory
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      if (data.success) {
        addBotMessage(data.botMessage || data.message || 'Lo siento, no pude procesar tu mensaje.')
        if (data.cart) setCart(data.cart)
      } else {
        throw new Error(data.error || 'Error desconocido')
      }

    } catch (error) {
      console.error('Error al enviar mensaje:', error)
      
      // Mensajes de error más específicos
      let errorMessage = '⚠️ Lo siento, hubo un error al procesar tu mensaje.'
      
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        errorMessage = '⚠️ Error de conexión. Verifica que el backend esté corriendo en http://localhost:3001'
      } else if (error.message.includes('HTTP 500')) {
        errorMessage = '⚠️ Error en el servidor. Por favor, intenta de nuevo en un momento.'
      } else if (error.message.includes('HTTP 400')) {
        errorMessage = '⚠️ Error en la solicitud. Por favor, verifica tu mensaje.'
      } else if (error.message) {
        errorMessage = `⚠️ ${error.message}`
      }
      
      addBotMessage(errorMessage)
    } finally {
      setIsLoading(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  /**
   * Manejar Enter para enviar
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Calcular items del carrito
  const cartItemCount = Object.keys(cart.items || {}).length
  const cartTotalUnits = Object.values(cart.items || {}).reduce((sum, item) => sum + (item.cantidad || 0), 0)

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
    )
  }

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chat-toggle-btn"
        style={{
          backgroundColor: isOpen ? '#dc2626' : 'rgb(244, 165, 28)',
          transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)'
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
                <div className="chat-header-name">Asistente Virtual de ImBlasco</div>
                <div className="chat-header-status">
                  {isLoading ? 'Escribiendo...' : 'En línea'}
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
                className={`message-wrapper ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="message-avatar bot-avatar-small">
                    <Bot size={14} />
                  </div>
                )}
                <div className={`message-bubble ${msg.sender === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
                  <div className="message-text">{msg.text}</div>
                  <div className="message-time">
                    {new Date(msg.timestamp).toLocaleTimeString('es-CL', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
                {msg.sender === 'user' && (
                  <div className="message-avatar user-avatar-small">
                    <User size={14} />
                  </div>
                )}
              </div>
            ))}

            {/* Indicador de escritura */}
            {isLoading && (
              <div className="typing-indicator">
                <div className="typing-dot" style={{ animationDelay: '0s' }}></div>
                <div className="typing-dot" style={{ animationDelay: '0.2s' }}></div>
                <div className="typing-dot" style={{ animationDelay: '0.4s' }}></div>
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
              placeholder="Escribe tu mensaje..."
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
              <span>🛒 {cartItemCount} producto(s) · {cartTotalUnits.toLocaleString()} unidades</span>
            </div>
          )}
        </div>
      )}

      <style>{`
        /* Botón flotante */
        .chat-toggle-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background-color: rgb(244, 165, 28);
          color: white;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(244, 165, 28, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .chat-toggle-btn:hover {
          transform: scale(1.1) !important;
          box-shadow: 0 6px 24px rgba(244, 165, 28, 0.5);
        }

        .cart-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background-color: rgba(9, 33, 67, 1);
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
          width: 400px;
          max-width: calc(100vw - 48px);
          height: 650px;
          max-height: calc(100vh - 140px);
          background-color: white;
          border-radius: 20px;
          box-shadow: 0 12px 48px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 9999;
          animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Header */
        .chat-header {
          background: linear-gradient(135deg, rgba(9, 33, 67, 1) 0%, rgba(9, 33, 67, 0.95) 100%);
          color: white;
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .chat-header-content {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }

        .chat-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgb(244, 165, 28) 0%, rgba(244, 165, 28, 0.8) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(244, 165, 28, 0.3);
        }

        .bot-avatar {
          background: linear-gradient(135deg, rgb(244, 165, 28) 0%, rgba(244, 165, 28, 0.8) 100%);
        }

        .chat-header-info {
          flex: 1;
        }

        .chat-header-name {
          font-weight: 700;
          font-size: 16px;
          margin-bottom: 2px;
        }

        .chat-header-status {
          font-size: 12px;
          opacity: 0.85;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .chat-header-status::before {
          content: '';
          width: 8px;
          height: 8px;
          background-color: #10b981;
          border-radius: 50%;
          display: inline-block;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .chat-cart-indicator {
          background: rgba(255, 255, 255, 0.15);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          backdrop-filter: blur(10px);
        }

        /* Mensajes */
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          background: linear-gradient(to bottom, #f0f2f5 0%, #e8eaf0 100%);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .chat-messages::-webkit-scrollbar {
          width: 6px;
        }

        .chat-messages::-webkit-scrollbar-track {
          background: transparent;
        }

        .chat-messages::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 3px;
        }

        .message-wrapper {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          animation: messageSlide 0.3s ease-out;
        }

        @keyframes messageSlide {
          from {
            opacity: 0;
            transform: translateY(10px);
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
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .bot-avatar-small {
          background: linear-gradient(135deg, rgb(244, 165, 28) 0%, rgba(244, 165, 28, 0.8) 100%);
          color: white;
        }

        .user-avatar-small {
          background: linear-gradient(135deg, rgba(9, 33, 67, 1) 0%, rgba(9, 33, 67, 0.8) 100%);
          color: white;
        }

        .message-bubble {
          max-width: 75%;
          padding: 12px 16px;
          border-radius: 18px;
          position: relative;
          word-wrap: break-word;
        }

        .bot-bubble {
          background: white;
          color: #1f2937;
          border-bottom-left-radius: 4px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .user-bubble {
          background: linear-gradient(135deg, rgb(244, 165, 28) 0%, rgba(244, 165, 28, 0.9) 100%);
          color: white;
          border-bottom-right-radius: 4px;
          box-shadow: 0 2px 8px rgba(244, 165, 28, 0.3);
        }

        .message-text {
          font-size: 14px;
          line-height: 1.5;
          white-space: pre-wrap;
          margin-bottom: 4px;
        }

        .message-time {
          font-size: 10px;
          opacity: 0.7;
          margin-top: 4px;
          text-align: right;
        }

        /* Indicador de escritura */
        .typing-indicator {
          display: flex;
          gap: 6px;
          padding: 12px 16px;
          background: white;
          border-radius: 18px;
          border-bottom-left-radius: 4px;
          width: fit-content;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .typing-dot {
          width: 8px;
          height: 8px;
          background: #9ca3af;
          border-radius: 50%;
          animation: typing 1.4s infinite;
        }

        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.7;
          }
          30% {
            transform: translateY(-8px);
            opacity: 1;
          }
        }

        /* Input */
        .chat-input-container {
          padding: 16px;
          background: white;
          border-top: 1px solid #e5e7eb;
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .chat-input {
          flex: 1;
          padding: 12px 18px;
          border: 2px solid #e5e7eb;
          border-radius: 24px;
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
          font-family: inherit;
        }

        .chat-input:focus {
          border-color: rgb(244, 165, 28);
          box-shadow: 0 0 0 3px rgba(244, 165, 28, 0.1);
        }

        .chat-input:disabled {
          background-color: #f3f4f6;
          cursor: not-allowed;
        }

        .chat-send-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgb(244, 165, 28) 0%, rgba(244, 165, 28, 0.9) 100%);
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .chat-send-btn:hover:not(:disabled) {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(244, 165, 28, 0.4);
        }

        .chat-send-btn:disabled {
          background: #d1d5db;
          cursor: not-allowed;
          transform: none;
        }

        /* Resumen carrito */
        .chat-cart-summary {
          padding: 10px 16px;
          background: #f9fafb;
          border-top: 1px solid #e5e7eb;
          font-size: 12px;
          color: #6b7280;
          text-align: center;
        }

        /* Responsive */
        @media (max-width: 480px) {
          .chat-window {
            right: 12px;
            bottom: 80px;
            width: calc(100vw - 24px);
            height: calc(100vh - 100px);
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
  )
}

export default B2BChat

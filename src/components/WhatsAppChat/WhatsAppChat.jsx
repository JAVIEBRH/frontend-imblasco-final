import { useState, useRef, useEffect } from 'react'
import { 
  MessageCircle, 
  X, 
  Send, 
  Phone, 
  MoreVertical,
  CheckCheck,
  Smile
} from 'lucide-react'
import useChat from '../../hooks/useChat'

/**
 * Widget de chat - Réplica del chat de imblasco.cl
 * Botón verde con "¿Necesitas ayuda? Chatea con nosotros"
 */
const WhatsAppChat = () => {
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  
  const {
    messages,
    isTyping,
    isOpen,
    quickReplies,
    sendMessage,
    handleQuickReply,
    toggleChat
  } = useChat()
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isTyping])
  
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      sendMessage(inputValue)
      setInputValue('')
    }
  }
  
  return (
    <>
      {/* Botón flotante estilo imblasco */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Tooltip */}
        {!isOpen && (
          <div 
            className="absolute bottom-full right-0 mb-2 whitespace-nowrap bg-white rounded-lg shadow-lg px-4 py-2 text-sm animate-fade-in"
            style={{ fontFamily: '"Cabin", Arial, sans-serif' }}
          >
            <p className="font-semibold text-[#333]">¿Necesitas ayuda?</p>
            <p className="text-[#777] text-xs">Chatea con nosotros</p>
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white transform rotate-45 shadow-lg"></div>
          </div>
        )}
        
        {/* Botón */}
        <button
          onClick={toggleChat}
          className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{ backgroundColor: isOpen ? '#666' : '#25D366' }}
          aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat'}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <>
              <MessageCircle className="w-6 h-6 text-white" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                1
              </span>
            </>
          )}
        </button>
      </div>
      
      {/* Ventana del chat */}
      <div 
        className={`fixed bottom-24 right-6 z-50 transition-all duration-300 transform ${
          isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="whatsapp-chat flex flex-col">
          {/* Header */}
          <div className="whatsapp-header">
            <div className="relative">
              <div 
                className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: '#1e56a0' }}
              >
                IB
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#075e54]"></span>
            </div>
            
            <div className="flex-1">
              <h4 className="font-semibold text-[15px]">ImBlasco Soporte</h4>
              <p className="text-[12px] text-green-200">En línea</p>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Phone size={18} />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>
          
          {/* Mensajes */}
          <div className="whatsapp-messages">
            <div className="flex justify-center mb-4">
              <span className="bg-white/80 text-[#54656f] text-[11px] px-3 py-1 rounded-md shadow-sm">
                Hoy
              </span>
            </div>
            
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div className={`whatsapp-bubble ${message.sender === 'user' ? 'sent' : 'received'}`}>
                  <p className="text-[14px] text-[#303030] whitespace-pre-wrap">
                    {message.text}
                  </p>
                  <div className={`flex items-center gap-1 mt-1 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <span className="text-[11px] text-[#667781]">
                      {message.timestamp}
                    </span>
                    {message.sender === 'user' && (
                      <CheckCheck size={14} className="text-[#53bdeb]" />
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            
            {messages.length <= 2 && !isTyping && (
              <div className="flex flex-wrap gap-2 mt-4">
                {quickReplies.map((reply) => (
                  <button
                    key={reply.id}
                    onClick={() => handleQuickReply(reply)}
                    className="bg-white text-[#008069] text-[13px] px-3 py-2 rounded-full shadow-sm hover:bg-gray-50 transition-colors border border-[#00a884]/30"
                  >
                    {reply.text}
                  </button>
                ))}
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <form onSubmit={handleSubmit} className="whatsapp-input">
            <button type="button" className="p-2 text-[#54656f] hover:text-[#008069] transition-colors">
              <Smile size={22} />
            </button>
            
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="flex-1 bg-white rounded-full px-4 py-2 text-[14px] outline-none border border-[#ced0d1]"
              style={{ fontFamily: '"Cabin", Arial, sans-serif' }}
            />
            
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className={`p-2.5 rounded-full transition-all ${
                inputValue.trim()
                  ? 'bg-[#00a884] text-white hover:bg-[#008069]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send size={18} />
            </button>
          </form>
          
          {/* Footer */}
          <div className="bg-[#f0f2f5] px-4 py-2 text-center">
            <p className="text-[10px] text-[#667781]">
              Chat simulado para pruebas • No es WhatsApp real
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default WhatsAppChat

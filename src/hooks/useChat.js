import { useState, useCallback, useEffect, useRef } from 'react'
import { 
  welcomeMessage, 
  quickReplies, 
  findBestResponse, 
  dataCapture,
  chatConfig 
} from '../config/chatResponses'

/**
 * Hook personalizado para manejar la lógica del chat
 * 
 * FUNCIONALIDADES:
 * - Gestión del historial de mensajes
 * - Respuestas automáticas basadas en reglas
 * - Captura de datos de usuario
 * - Indicador de escritura
 * - Persistencia local opcional
 * 
 * USO:
 * const { messages, sendMessage, isTyping, capturedData } = useChat()
 */
const useChat = () => {
  // Estado principal
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  
  // Estado para captura de datos
  const [captureMode, setCaptureMode] = useState(null) // 'name' | 'email' | 'phone' | null
  const [capturedData, setCapturedData] = useState({
    name: null,
    email: null,
    phone: null
  })
  
  // Referencia para el timeout de inactividad
  const inactivityTimeout = useRef(null)
  
  /**
   * Genera un ID único para cada mensaje
   */
  const generateId = () => `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  /**
   * Formatea la hora actual para los timestamps
   */
  const getTimestamp = () => {
    const now = new Date()
    return now.toLocaleTimeString('es-CL', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }
  
  /**
   * Añade un mensaje al historial
   */
  const addMessage = useCallback((text, sender = 'bot', options = {}) => {
    const message = {
      id: generateId(),
      text,
      sender, // 'user' | 'bot'
      timestamp: getTimestamp(),
      status: sender === 'user' ? 'sent' : 'received',
      ...options
    }
    
    setMessages(prev => {
      const newMessages = [...prev, message]
      // Limitar historial
      if (newMessages.length > chatConfig.maxHistoryLength) {
        return newMessages.slice(-chatConfig.maxHistoryLength)
      }
      return newMessages
    })
    
    return message
  }, [])
  
  /**
   * Simula el indicador de "escribiendo..."
   */
  const simulateTyping = useCallback((delay = chatConfig.typingDelay) => {
    return new Promise(resolve => {
      if (chatConfig.showTypingIndicator) {
        setIsTyping(true)
      }
      setTimeout(() => {
        setIsTyping(false)
        resolve()
      }, delay)
    })
  }, [])
  
  /**
   * Procesa la respuesta del bot
   */
  const processBotResponse = useCallback(async (userMessage) => {
    // Si estamos en modo captura de datos
    if (captureMode) {
      const currentCapture = dataCapture[captureMode]
      const isValid = currentCapture.validation(userMessage)
      
      if (!isValid) {
        await simulateTyping(800)
        addMessage(currentCapture.errorMessage, 'bot')
        return
      }
      
      // Guardar el dato capturado
      setCapturedData(prev => ({
        ...prev,
        [captureMode]: userMessage
      }))
      
      // Pasar al siguiente paso
      const nextStep = currentCapture.nextStep
      
      if (nextStep === 'complete') {
        setCaptureMode(null)
        await simulateTyping(1000)
        addMessage(dataCapture.complete.message, 'bot')
        
        // Aquí se podría enviar los datos al backend
        console.log('📊 Datos capturados:', {
          ...capturedData,
          [captureMode]: userMessage
        })
      } else {
        setCaptureMode(nextStep)
        await simulateTyping(800)
        addMessage(dataCapture[nextStep].prompt, 'bot')
      }
      
      return
    }
    
    // Buscar la mejor respuesta
    const matchedRule = findBestResponse(userMessage)
    
    // Simular escritura
    await simulateTyping(matchedRule.delay || chatConfig.typingDelay)
    
    // Añadir respuesta principal
    addMessage(matchedRule.response, 'bot')
    
    // Si hay mensaje de seguimiento
    if (matchedRule.followUp) {
      await simulateTyping(1000)
      addMessage(matchedRule.followUp, 'bot')
    }
    
    // Si la regla activa captura de datos
    if (matchedRule.captureData) {
      setCaptureMode(matchedRule.dataType)
    }
    
  }, [captureMode, capturedData, addMessage, simulateTyping])
  
  /**
   * Envía un mensaje del usuario
   */
  const sendMessage = useCallback(async (text) => {
    if (!text.trim()) return
    
    // Resetear timeout de inactividad
    if (inactivityTimeout.current) {
      clearTimeout(inactivityTimeout.current)
    }
    
    // Añadir mensaje del usuario
    addMessage(text, 'user')
    
    // Marcar que ha habido interacción
    if (!hasInteracted) {
      setHasInteracted(true)
    }
    
    // Procesar respuesta del bot
    await processBotResponse(text)
    
    // Configurar timeout de inactividad
    if (chatConfig.inactivityTimeout) {
      inactivityTimeout.current = setTimeout(async () => {
        await simulateTyping(800)
        addMessage(chatConfig.inactivityMessage, 'bot')
      }, chatConfig.inactivityTimeout)
    }
    
  }, [addMessage, hasInteracted, processBotResponse, simulateTyping])
  
  /**
   * Maneja clic en respuesta rápida
   */
  const handleQuickReply = useCallback((quickReply) => {
    sendMessage(quickReply.text)
  }, [sendMessage])
  
  /**
   * Abre/cierra el chat
   */
  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])
  
  /**
   * Inicializa el chat con mensaje de bienvenida
   */
  const initializeChat = useCallback(async () => {
    if (messages.length === 0) {
      await simulateTyping(welcomeMessage.delay)
      addMessage(welcomeMessage.text, 'bot', { isWelcome: true })
    }
  }, [messages.length, addMessage, simulateTyping])
  
  /**
   * Limpia el historial del chat
   */
  const clearChat = useCallback(() => {
    setMessages([])
    setCaptureMode(null)
    setCapturedData({ name: null, email: null, phone: null })
    setHasInteracted(false)
  }, [])
  
  // Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      if (inactivityTimeout.current) {
        clearTimeout(inactivityTimeout.current)
      }
    }
  }, [])
  
  // Inicializar chat cuando se abre
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeChat()
    }
  }, [isOpen, messages.length, initializeChat])
  
  return {
    // Estado
    messages,
    isTyping,
    isOpen,
    hasInteracted,
    capturedData,
    quickReplies,
    
    // Acciones
    sendMessage,
    handleQuickReply,
    toggleChat,
    clearChat,
    
    // Setters directos (para casos especiales)
    setIsOpen
  }
}

export default useChat


/**
 * CONFIGURACIÓN DE RESPUESTAS - IMBLASCO
 * =======================================
 * 
 * Respuestas automáticas del chat para Importadora Blas y Cía.
 * Personalizado para artículos publicitarios, trofeos y premios.
 */

// Mensaje de bienvenida
export const welcomeMessage = {
  text: '¡Hola! 👋 Bienvenido a ImBlasco.\n\nSoy tu asistente virtual. ¿En qué puedo ayudarte hoy?',
  delay: 500
}

// Opciones rápidas
export const quickReplies = [
  { id: 1, text: '📦 Ver productos', trigger: 'productos' },
  { id: 2, text: '💰 Consultar precios', trigger: 'precio' },
  { id: 3, text: '🚚 Info de despacho', trigger: 'despacho' },
  { id: 4, text: '📞 Contactar vendedor', trigger: 'contacto' }
]

// Reglas de respuesta
export const chatRules = [
  // Saludos
  {
    id: 'greeting',
    keywords: ['hola', 'buenas', 'buenos días', 'buenas tardes', 'buenas noches', 'hi', 'hello'],
    response: '¡Hola! 👋 Bienvenido a ImBlasco, tu importadora de confianza.\n\n¿En qué puedo ayudarte?',
    followUp: 'Puedo informarte sobre productos, precios, despachos o conectarte con un vendedor.',
    delay: 800
  },

  // Productos generales
  {
    id: 'products',
    keywords: ['producto', 'productos', 'catálogo', 'catalogo', 'qué venden', 'que venden', 'qué tienen'],
    response: '📦 En ImBlasco manejamos:\n\n• Artículos Publicitarios\n• Trofeos y Premios\n• Copas y Medallas\n• Línea Cobre\n• Línea Bamboo\n• Timbres Automáticos\n• Packaging\n• Productos para Sublimación',
    followUp: '¿Te interesa alguna categoría en particular?',
    delay: 1000
  },

  // Artículos publicitarios
  {
    id: 'publicitarios',
    keywords: ['publicitario', 'publicitarios', 'promocional', 'promocionales', 'merchandising', 'merch'],
    response: '🎁 Nuestros Artículos Publicitarios incluyen:\n\n• Bolígrafos y lápices\n• Llaveros\n• Botellas y termos\n• Mochilas y bolsos\n• Tecnológicos (pendrives, power banks)\n• Chapitas\n• Set de vino\n• Y mucho más!',
    followUp: '¿Necesitas cotización para algún producto específico?',
    delay: 1100
  },

  // Trofeos y premios
  {
    id: 'trofeos',
    keywords: ['trofeo', 'trofeos', 'premio', 'premios', 'copa', 'copas', 'medalla', 'medallas', 'galvano'],
    response: '🏆 En Trofeos y Premios tenemos:\n\n• Copas (Línea Clásica y Comercial)\n• Medallas con cintas\n• Trofeos acrílicos, metálicos y resina\n• Galvanos de cristal y madera\n• Placas conmemorativas\n• Bandejas y rocas',
    followUp: '¿Es para un evento deportivo, empresarial o reconocimiento?',
    delay: 1100
  },

  // Línea Cobre
  {
    id: 'cobre',
    keywords: ['cobre', 'linea cobre', 'línea cobre', 'cobrizado'],
    response: '🥉 Nuestra Línea Cobre es muy popular:\n\n• Jarros tipo Moscow Mule\n• Cocteleras\n• Llaveros\n• Sets de bar\n• Artículos decorativos\n\nTodos con acabado encobrizado premium.',
    delay: 1000
  },

  // Línea Bamboo
  {
    id: 'bamboo',
    keywords: ['bamboo', 'bambú', 'bambu', 'ecológico', 'ecologico', 'sustentable'],
    response: '🌿 Línea Bamboo - Productos Ecológicos:\n\n• Cuadernos y libretas\n• Bolígrafos\n• Sets de escritorio\n• Cajas organizadoras\n• Botellas\n\nIdeal para empresas con conciencia ambiental.',
    delay: 1000
  },

  // Precios
  {
    id: 'pricing',
    keywords: ['precio', 'precios', 'costo', 'costos', 'valor', 'cuánto', 'cuanto', 'cotización', 'cotizacion', 'cotizar'],
    response: '💰 Para ver precios necesitas una cuenta en nuestro sitio web.\n\n¿Por qué? Somos importadores mayoristas y nuestros precios son exclusivos para empresas.',
    followUp: '¿Te gustaría que un vendedor te contacte para abrir tu cuenta?',
    delay: 1200,
    captureData: true,
    dataType: 'name'
  },

  // Despacho
  {
    id: 'shipping',
    keywords: ['despacho', 'envío', 'envio', 'enviar', 'región', 'region', 'transporte', 'retiro'],
    response: '🚚 Información de Despachos:\n\n📍 Retiro en: Álvarez de Toledo 981, San Miguel\n📅 Envíos a regiones: Martes y Jueves\n⚠️ No trabajamos con Chilexpress, Correos de Chile ni Blue Express\n\nLa mercancía viaja a costo y riesgo del cliente.',
    delay: 1100
  },

  // Horario
  {
    id: 'schedule',
    keywords: ['horario', 'hora', 'abierto', 'cerrado', 'atención', 'atencion', 'cuando'],
    response: '🕐 Nuestro horario de atención:\n\n📅 Lunes a Viernes: 9:00 - 14:00 y 15:30 - 19:00\n📅 Sábados: 10:00 - 13:00\n\n📍 Álvarez de Toledo 981, San Miguel, Santiago',
    delay: 900
  },

  // Contacto
  {
    id: 'contact',
    keywords: ['contacto', 'contactar', 'vendedor', 'asesor', 'humano', 'persona', 'hablar', 'llamar', 'teléfono', 'telefono', 'email', 'correo'],
    response: '📞 Datos de contacto:\n\n📧 ventas@imblasco.cl\n📱 225443327 - 225443382 - 225440418\n📍 Álvarez de Toledo 981, San Miguel',
    followUp: '¿Te gustaría que un vendedor te contacte directamente?',
    delay: 1000,
    captureData: true,
    dataType: 'name'
  },

  // Crear cuenta
  {
    id: 'account',
    keywords: ['cuenta', 'registrar', 'registro', 'cliente', 'nuevo cliente', 'abrir cuenta'],
    response: '📋 Para abrir una cuenta necesitamos:\n\n• RUT de la empresa\n• Razón social\n• Giro\n• Dirección y comuna\n\nEnvía estos datos a ventas@imblasco.cl o preséntate en nuestra sala de ventas.',
    delay: 1100
  },

  // Personalización
  {
    id: 'custom',
    keywords: ['personalizar', 'personalización', 'personalizacion', 'logo', 'grabar', 'grabado', 'imprimir', 'serigrafia', 'tampografia'],
    response: '🎨 Opciones de personalización:\n\n• Tampografía\n• Serigrafía\n• Grabado láser\n• Sublimación\n• Bordado\n\nCada producto indica sus opciones de personalización disponibles.',
    delay: 1000
  },

  // Timbres
  {
    id: 'stamps',
    keywords: ['timbre', 'timbres', 'sello', 'sellos', 'fechador'],
    response: '📌 Timbres Automáticos:\n\n• Timbres rectangulares y fechadores\n• Timbres cuadrados y redondos\n• Timbres de bolsillo\n• Timbres dactilares\n• Accesorios y repuestos\n\nVariedad de tamaños y modelos.',
    delay: 1000
  },

  // Despedida
  {
    id: 'goodbye',
    keywords: ['gracias', 'adios', 'adiós', 'chao', 'bye', 'hasta luego'],
    response: '¡Gracias por contactar a ImBlasco! 😊\n\nRecuerda:\n📧 ventas@imblasco.cl\n📱 225443327\n\n¡Que tengas un excelente día!',
    delay: 700
  },

  // Ayuda
  {
    id: 'help',
    keywords: ['ayuda', 'help', 'no entiendo', 'opciones'],
    response: '❓ Puedo ayudarte con:\n\n• Información de productos\n• Precios y cotizaciones\n• Despachos y retiros\n• Horarios de atención\n• Contacto con vendedores\n• Crear cuenta de cliente',
    followUp: '¿Sobre qué tema te gustaría saber más?',
    delay: 800
  }
]

// Respuesta por defecto
export const defaultResponse = {
  text: 'Disculpa, no tengo información sobre eso. 🤔\n\n¿Te gustaría que te contacte un vendedor para ayudarte mejor?\n\nTambién puedes llamarnos al 225443327 o escribir a ventas@imblasco.cl',
  delay: 1000
}

// Captura de datos
export const dataCapture = {
  name: {
    prompt: '¿Cuál es tu nombre o el de tu empresa?',
    validation: (value) => value.length >= 2,
    errorMessage: 'Por favor, ingresa un nombre válido.',
    nextStep: 'email'
  },
  email: {
    prompt: '¿Cuál es tu correo electrónico?',
    validation: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    errorMessage: 'Por favor, ingresa un email válido.',
    nextStep: 'phone'
  },
  phone: {
    prompt: '¿Cuál es tu número de teléfono?',
    validation: (value) => /^[\d\s+()-]{8,}$/.test(value),
    errorMessage: 'Por favor, ingresa un número válido.',
    nextStep: 'complete'
  },
  complete: {
    message: '✅ ¡Perfecto! Hemos registrado tus datos.\n\nUn vendedor de ImBlasco te contactará pronto.\n\n¿Hay algo más en lo que pueda ayudarte?'
  }
}

// Función para encontrar respuesta
export const findBestResponse = (message) => {
  const normalizedMessage = message.toLowerCase().trim()
  
  for (const rule of chatRules) {
    for (const keyword of rule.keywords) {
      if (normalizedMessage.includes(keyword.toLowerCase())) {
        return rule
      }
    }
  }
  
  return {
    id: 'default',
    response: defaultResponse.text,
    delay: defaultResponse.delay
  }
}

// Configuración
export const chatConfig = {
  typingDelay: 1500,
  showTypingIndicator: true,
  inactivityTimeout: 60000,
  inactivityMessage: '¿Sigues ahí? 👋 Si necesitas ayuda, escríbeme o llámanos al 225443327.',
  maxHistoryLength: 100,
  enablePersistence: true
}

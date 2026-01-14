import { X } from 'lucide-react'
import { useState } from 'react'

/**
 * MODAL LOGIN/REGISTRO - COPIA EXACTA de imblasco.cl
 * Tabs: Entrar / Crear una cuenta
 */
const LoginModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('login')

  return (
    <div 
      className="wd-modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div 
        className="wd-modal"
        onClick={e => e.stopPropagation()}
        style={{
          backgroundColor: '#fff',
          maxWidth: '420px',
          width: '100%',
          margin: '15px',
          padding: '30px',
          position: 'relative',
          animation: 'slideUp 0.3s ease'
        }}
      >
        {/* Botón cerrar */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#999'
          }}
        >
          <X size={20} />
        </button>

        {/* Tabs */}
        <div 
          style={{ 
            display: 'flex',
            borderBottom: '1px solid #e5e5e5',
            marginBottom: '25px'
          }}
        >
          <button
            onClick={() => setActiveTab('login')}
            style={{
              flex: 1,
              padding: '12px',
              fontFamily: '"Cabin", Arial, sans-serif',
              fontSize: '15px',
              fontWeight: 600,
              color: activeTab === 'login' ? 'rgb(244, 165, 28)' : '#666',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'login' ? '2px solid rgb(244, 165, 28)' : '2px solid transparent',
              marginBottom: '-1px',
              cursor: 'pointer'
            }}
          >
            Entrar
          </button>
          <button
            onClick={() => setActiveTab('register')}
            style={{
              flex: 1,
              padding: '12px',
              fontFamily: '"Cabin", Arial, sans-serif',
              fontSize: '15px',
              fontWeight: 600,
              color: activeTab === 'register' ? 'rgb(244, 165, 28)' : '#666',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === 'register' ? '2px solid rgb(244, 165, 28)' : '2px solid transparent',
              marginBottom: '-1px',
              cursor: 'pointer'
            }}
          >
            Crear una cuenta
          </button>
        </div>

        {activeTab === 'login' ? (
          <form>
            <div style={{ marginBottom: '20px' }}>
              <label 
                htmlFor="username"
                style={{
                  display: 'block',
                  fontFamily: '"Cabin", Arial, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#333',
                  marginBottom: '8px'
                }}
              >
                Nombre de usuario o correo electrónico <span style={{ color: 'red' }}>*</span>
              </label>
              <input 
                type="text"
                id="username"
                style={{
                  width: '100%',
                  height: '42px',
                  padding: '0 15px',
                  border: '2px solid rgba(0,0,0,0.1)',
                  fontFamily: '"Cabin", Arial, sans-serif',
                  fontSize: '14px',
                  color: '#333',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label 
                htmlFor="password"
                style={{
                  display: 'block',
                  fontFamily: '"Cabin", Arial, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#333',
                  marginBottom: '8px'
                }}
              >
                Contraseña <span style={{ color: 'red' }}>*</span>
              </label>
              <input 
                type="password"
                id="password"
                style={{
                  width: '100%',
                  height: '42px',
                  padding: '0 15px',
                  border: '2px solid rgba(0,0,0,0.1)',
                  fontFamily: '"Cabin", Arial, sans-serif',
                  fontSize: '14px',
                  color: '#333',
                  outline: 'none'
                }}
              />
            </div>

            <div 
              style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '25px',
                fontSize: '13px'
              }}
            >
              <label 
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  color: '#666',
                  cursor: 'pointer'
                }}
              >
                <input type="checkbox" style={{ marginRight: '8px' }} />
                Recordarme
              </label>
              <a 
                href="#"
                style={{
                  color: '#777',
                  textDecoration: 'none'
                }}
              >
                ¿Has perdido tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                height: '42px',
                backgroundColor: 'rgb(244, 165, 28)',
                color: '#fff',
                fontFamily: '"Cabin", Arial, sans-serif',
                fontSize: '13px',
                fontWeight: 600,
                textTransform: 'uppercase',
                border: 'none',
                borderRadius: '35px',
                cursor: 'pointer'
              }}
            >
              Iniciar sesión
            </button>

            <p 
              style={{
                textAlign: 'center',
                marginTop: '20px',
                fontFamily: '"Cabin", Arial, sans-serif',
                fontSize: '13px',
                color: '#666'
              }}
            >
              ¿No tienes cuenta aún?
            </p>
          </form>
        ) : (
          <form>
            <div style={{ marginBottom: '20px' }}>
              <label 
                htmlFor="reg_email"
                style={{
                  display: 'block',
                  fontFamily: '"Cabin", Arial, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#333',
                  marginBottom: '8px'
                }}
              >
                Correo electrónico <span style={{ color: 'red' }}>*</span>
              </label>
              <input 
                type="email"
                id="reg_email"
                style={{
                  width: '100%',
                  height: '42px',
                  padding: '0 15px',
                  border: '2px solid rgba(0,0,0,0.1)',
                  fontFamily: '"Cabin", Arial, sans-serif',
                  fontSize: '14px',
                  color: '#333',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label 
                htmlFor="reg_password"
                style={{
                  display: 'block',
                  fontFamily: '"Cabin", Arial, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#333',
                  marginBottom: '8px'
                }}
              >
                Contraseña <span style={{ color: 'red' }}>*</span>
              </label>
              <input 
                type="password"
                id="reg_password"
                style={{
                  width: '100%',
                  height: '42px',
                  padding: '0 15px',
                  border: '2px solid rgba(0,0,0,0.1)',
                  fontFamily: '"Cabin", Arial, sans-serif',
                  fontSize: '14px',
                  color: '#333',
                  outline: 'none'
                }}
              />
              <p 
                style={{
                  fontFamily: '"Cabin", Arial, sans-serif',
                  fontSize: '12px',
                  color: '#777',
                  marginTop: '8px',
                  lineHeight: 1.5
                }}
              >
                Tu contraseña debe tener al menos 8 caracteres. Para hacerla más fuerte, usa letras mayúsculas y minúsculas, números y símbolos.
              </p>
            </div>

            <p 
              style={{
                fontFamily: '"Cabin", Arial, sans-serif',
                fontSize: '12px',
                color: '#777',
                marginBottom: '25px',
                lineHeight: 1.5
              }}
            >
              Tus datos personales se utilizarán para procesar tu pedido, mejorar tu experiencia en esta web y otros propósitos descritos en nuestra{' '}
              <a 
                href="#"
                style={{ color: 'rgb(244, 165, 28)' }}
              >
                política de privacidad
              </a>.
            </p>

            <button
              type="submit"
              style={{
                width: '100%',
                height: '42px',
                backgroundColor: 'rgb(244, 165, 28)',
                color: '#fff',
                fontFamily: '"Cabin", Arial, sans-serif',
                fontSize: '13px',
                fontWeight: 600,
                textTransform: 'uppercase',
                border: 'none',
                borderRadius: '35px',
                cursor: 'pointer'
              }}
            >
              Registrarse
            </button>
          </form>
        )}
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export default LoginModal

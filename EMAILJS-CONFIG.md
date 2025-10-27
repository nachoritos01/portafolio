# 📧 Configuración de EmailJS

Este archivo explica cómo configurar EmailJS para el formulario de contacto.

## 🚀 Pasos de Configuración

### 1. Crear Cuenta en EmailJS
1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crea una cuenta gratuita
3. Confirma tu email

### 2. Conectar Servicio de Email
1. En el dashboard, ve a **"Email Services"**
2. Clic en **"Add New Service"**
3. Selecciona **"Gmail"**
4. Sigue las instrucciones para conectar tu Gmail
5. **Copia el Service ID** (ej: `service_abc123`)

### 3. Crear Template de Email
1. Ve a **"Email Templates"**
2. Clic en **"Create New Template"**
3. Usa este template:

```
Subject: {{subject}} - Contacto desde Portafolio

Hola Ignacio,

Has recibido un nuevo mensaje de contacto:

Nombre: {{from_name}}
Email: {{from_email}}
Asunto: {{subject}}

Mensaje:
{{message}}

---
Responder a: {{reply_to}}
```

4. **Copia el Template ID** (ej: `template_xyz789`)

### 4. Obtener Public Key
1. Ve a **"Account" > "General"**
2. Copia tu **Public Key** (ej: `abc123xyz`)

### 5. Configurar en el Código
Edita el archivo `src/app/services/email.service.ts`:

```typescript
// Reemplaza estos valores con tus credenciales reales
private readonly serviceId = 'service_abc123';     // Tu Service ID
private readonly templateId = 'template_xyz789';   // Tu Template ID  
private readonly publicKey = 'abc123xyz';          // Tu Public Key
```

## 🔧 Variables del Template

El servicio envía estas variables a EmailJS:

- `{{from_name}}` - Nombre completo del usuario
- `{{from_email}}` - Email del usuario
- `{{subject}}` - Asunto seleccionado/traducido
- `{{message}}` - Mensaje del usuario
- `{{reply_to}}` - Email para responder
- `{{to_name}}` - Tu nombre (Ignacio Navarrete)

## 📝 Ejemplo de Configuración Completa

```typescript
// En src/app/services/email.service.ts
private readonly serviceId = 'service_gmail123';
private readonly templateId = 'template_contact456';
private readonly publicKey = 'user_publickey789';
```

## 🎯 Prueba la Configuración

1. Completa la configuración
2. Ejecuta la aplicación: `npm start`
3. Ve a la sección de contacto
4. Llena el formulario de prueba
5. Verifica que llegue el email a tu Gmail

## 📊 Límites Gratuitos

- **200 emails/mes** gratis
- **50KB por email** máximo
- **1MB total por mes**

## 🔒 Seguridad

- ✅ **Public Key**: Segura para frontend
- ✅ **Service ID**: Segura para frontend  
- ✅ **Template ID**: Segura para frontend
- ❌ **Private Key**: NUNCA usar en frontend

## 🐛 Solución de Problemas

### Error: "Service ID not found"
- Verifica que el Service ID sea correcto
- Asegúrate de que el servicio esté activo

### Error: "Template ID not found"
- Verifica que el Template ID sea correcto
- Asegúrate de que el template esté publicado

### Error: "Public Key invalid"
- Verifica que el Public Key sea correcto
- Asegúrate de que esté activo en tu cuenta

### No llegan los emails
- Revisa la carpeta de spam
- Verifica la configuración del template
- Comprueba los logs en la consola del navegador

## 📞 Fallback

Si EmailJS no está configurado, el formulario mostrará:
- Mensaje informativo
- Email directo de contacto
- No se pierde ningún lead

¡Listo para recibir mensajes de tu portafolio! 🚀
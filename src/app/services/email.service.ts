import { Injectable, inject } from '@angular/core';
import emailjs from '@emailjs/browser';
import { PersonalInfoService } from './personal-info.service';

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private personalInfoService = inject(PersonalInfoService);
  
  // Configuración de EmailJS - Variables públicas (seguras para frontend)
  private readonly serviceId = 'service_690asur';
  private readonly templateId = 'template_7se6mlo';
  private readonly publicKey = 'vBo-NyT3ppQJTnmL9';

  constructor() {
    // Inicializar EmailJS con la clave pública
    emailjs.init(this.publicKey);
  }

  async sendContactEmail(formData: ContactFormData): Promise<EmailResponse> {
    try {
      // Preparar los datos del template
      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        subject: this.getSubjectText(formData.subject),
        message: formData.message,
        reply_to: formData.email,
        to_name: this.personalInfoService.info().name,
        // Información adicional para el template
        contact_info: `
Nombre: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Asunto: ${this.getSubjectText(formData.subject)}

Mensaje:
${formData.message}
        `
      };

      console.log('Enviando email con datos:', templateParams);

      const result = await emailjs.send(
        this.serviceId,
        this.templateId,
        templateParams
      );

      console.log('Email enviado exitosamente:', result);

      return {
        success: true,
        message: 'Email enviado correctamente. Te responderé pronto!'
      };

    } catch (error) {
      console.error('Error al enviar email:', error);
      
      return {
        success: false,
        message: 'Error al enviar el email. Por favor intenta nuevamente o contáctame directamente.'
      };
    }
  }

  private getSubjectText(subject: string): string {
    const subjects: Record<string, string> = {
      'web-development': 'Desarrollo Web',
      'mobile-app': 'Desarrollo de App Móvil',
      'data-science': 'Proyecto de Data Science',
      'consulting': 'Consultoría',
      'other': 'Otro'
    };

    return subjects[subject] || subject;
  }


  getConfigurationInstructions(): string {
    return `
Para configurar EmailJS:

1. Ve a https://www.emailjs.com/ y crea una cuenta
2. Conecta tu servicio de email (Gmail recomendado)
3. Crea un template de email
4. Obtén tus keys desde el dashboard
5. Actualiza este archivo con tus credenciales:
   - serviceId: Tu Service ID
   - templateId: Tu Template ID  
   - publicKey: Tu Public Key

Ejemplo de template para EmailJS:
---
Asunto: {{subject}} - Contacto desde Portafolio

Hola {{to_name}},

Has recibido un nuevo mensaje de contacto:

{{contact_info}}

---
Responder a: {{reply_to}}
    `;
  }
}
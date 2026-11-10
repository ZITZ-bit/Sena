import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { config } from 'dotenv';
import { createTransport } from 'nodemailer';
import { join } from 'node:path';

interface StudentActivationEmail {
  email: string;
  fullName: string;
  activationUrl: string;
}

@Injectable()
export class MailService {
  constructor() {
    config({ path: join(__dirname, '..', '..', 'prisma', '.env') });
  }

  async sendStudentActivationEmail({
    email,
    fullName,
    activationUrl,
  }: StudentActivationEmail): Promise<void> {
    const host = process.env.SMTP_HOST?.trim();
    const port = Number(process.env.SMTP_PORT);
    const from = process.env.SMTP_FROM?.trim();
    const user = process.env.SMTP_USER?.trim();
    const password = process.env.SMTP_PASSWORD;

    if (!host || !Number.isInteger(port) || port <= 0 || !from) {
      throw new ServiceUnavailableException(
        'El servicio de correo no está configurado. Define SMTP_HOST, SMTP_PORT y SMTP_FROM.',
      );
    }

    if ((user && !password) || (!user && password)) {
      throw new ServiceUnavailableException(
        'La autenticación SMTP está incompleta. Define SMTP_USER y SMTP_PASSWORD juntos.',
      );
    }

    const transporter = createTransport({
      host,
      port,
      secure: process.env.SMTP_SECURE === 'true' || port === 465,
      ...(user && password ? { auth: { user, pass: password } } : {}),
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    });

    const safeName = this.escapeHtml(fullName);
    const safeUrl = this.escapeHtml(activationUrl);

    try {
      await transporter.sendMail({
        from,
        to: email,
        subject: 'Activa tu cuenta estudiantil SENA',
        text: [
          `Hola, ${fullName}.`,
          '',
          'Tu cuenta estudiantil ya está creada. Actívala y establece tu contraseña desde este enlace:',
          activationUrl,
          '',
          'El enlace vence en 24 horas y solo puede utilizarse una vez.',
        ].join('\n'),
        html: `
          <div style="margin:0;padding:40px 16px;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;color:#173451">
            <div style="max-width:560px;margin:0 auto;padding:36px;background:#fff;border-radius:14px">
              <p style="margin:0 0 12px;color:#a56f18;font-size:12px;font-weight:bold;letter-spacing:2px">SENA · PORTAL ACADÉMICO</p>
              <h1 style="margin:0 0 16px;font-size:26px">Activa tu cuenta</h1>
              <p style="line-height:1.6">Hola, ${safeName}. Tu cuenta estudiantil ya está creada. Actívala y establece tu contraseña para ingresar al sistema.</p>
              <p style="margin:28px 0">
                <a href="${safeUrl}" style="display:inline-block;padding:14px 22px;border-radius:999px;background:#173451;color:#fff;text-decoration:none;font-weight:bold">Activar mi cuenta</a>
              </p>
              <p style="color:#667789;font-size:13px;line-height:1.6">Este enlace vence en 24 horas y solo puede utilizarse una vez. Si no esperabas este correo, puedes ignorarlo.</p>
            </div>
          </div>
        `,
      });
    } catch (error) {
      throw new ServiceUnavailableException(
        'No se pudo enviar el correo de activación. Verifica la configuración SMTP e inténtalo nuevamente.',
        { cause: error },
      );
    } finally {
      transporter.close();
    }
  }

  private escapeHtml(value: string): string {
    return value.replace(/[&<>"']/g, (character) => {
      const entities: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      };

      return entities[character] ?? character;
    });
  }
}

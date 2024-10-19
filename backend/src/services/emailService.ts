import nodemailer from 'nodemailer';
import { env } from 'hono/adapter';

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: parseInt(env.SMTP_PORT, 10),
  secure: false,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

export const sendEmail = async (email: string, username: string, password: string) => {
  try {
    const message = `
      Hallo ${username},

      willkommen bei unserer Vereinsinfrastruktur! Hier sind deine Zugangsdaten:

      Benutzername: ${username}
      Passwort: ${password}

      Bei Fragen melde dich gerne im Slack-Kanal beim Infrastructure Manager.

      Beste Grüße,  
      Dein Infrastructure-Team
    `;

    await transporter.sendMail({
      from: `"${env.SMTP_FROM_NAME}" <${env.SMTP_FROM_EMAIL}>`,
      to: email,
      subject: 'Deine Zugangsdaten für die Vereinsinfrastruktur',
      text: message,
    });

    console.log('E-Mail erfolgreich gesendet!');
  } catch (error) {
    console.error('Fehler beim E-Mail-Versand:', error);
    throw new Error('E-Mail-Versand fehlgeschlagen');
  }
};

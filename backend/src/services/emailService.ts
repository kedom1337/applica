import nodemailer from 'nodemailer';
import { getEnv } from '../common/util';

const transporter = nodemailer.createTransport({
  host: getEnv('SMTP_HOST'),
  port: parseInt(getEnv('SMTP_PORT'), 10),
  secure: true, // Falls Port 465 verwendet wird
  auth: {
    user: getEnv('SMTP_USER'),
    pass: getEnv('SMTP_PASS'),
  },
});

export const sendEmail = async (email: string, username: string, password: string) => {
  const message = `
    Hallo ${username},

    willkommen bei unserer Vereinsinfrastruktur! Hier sind deine Zugangsdaten:

    Benutzername: ${username}
    Passwort: ${password}

    Bei Fragen melde dich gerne im Slack-Kanal beim Infrastructure Manager.

    Beste Grüße,  
    Dein Infrastructure-Team
  `;

  try {
    await transporter.sendMail({
      from: `"${getEnv('SMTP_FROM_NAME')}" <${getEnv('SMTP_FROM_EMAIL')}>`,
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

import mail from '@sendgrid/mail';
import { default as EmailTemplate } from 'email-templates';
import path from 'path';

import logger from './logger';

const sender = process.env.SUPPORT_EMAIL;

if (!process.env.SENDGRID_API_KEY || !sender) {
  throw new Error(
    'Must define process.env.SUPPORT_EMAIL && process.env.SENDGRID_API_KEY.'
  );
}

const env = process.env.NODE_ENV || '';

const subjectPrefix = env === 'production' ? '' : `[${env.toUpperCase()}] `;

mail.setApiKey(process.env.SENDGRID_API_KEY);

const mailer = new EmailTemplate({
  subjectPrefix,
  preview: false,
  message: {
    from: sender
  },
  send: false
});

export const sendVerifyMail = async ({
  origin,
  verifyPath,
  to,
  name
}: {
  origin: string;
  verifyPath: string;
  to: string;
  name: string;
}) => {
  try {
    const logoSrc = `${origin}/email/top-logo.png`;
    const href = `${origin}${verifyPath}`;

    const locals = {
      origin,
      name,
      href,
      logoSrc
    };

    const [html, subject] = await Promise.all([
      mailer.render(path.join(__dirname, 'emails', 'verify/html'), locals),
      mailer.render(path.join(__dirname, 'emails', 'verify/subject'), locals)
    ]);

    await mail.send({
      to,
      subject,
      html,
      from: sender
    });
  } catch (e) {
    logger.error(`Error with mailer: ${e.message}`);
  }
};

export const sendSupportMail = async ({
  type,
  origin,
  issue,
  email
}: {
  type: string;
  origin: string;
  issue: string;
  email: string;
}) => {
  const logoSrc = `${origin}/email/top-logo.png`;

  try {
    const locals = {
      type,
      issue,
      logoSrc,
      origin,
      email,
      href: `mailto:${email}`
    };

    const [html, subject] = await Promise.all([
      mailer.render(path.join(__dirname, 'emails', 'support/html'), locals),
      mailer.render(path.join(__dirname, 'emails', 'support/subject'), locals)
    ]);

    await mail.send({
      subject,
      html,
      to: sender,
      from: sender
    });
  } catch (e) {
    logger.error(`Error with mailer: ${e.message}`);
  }
};

export const sendPasswordResetMail = async ({
  origin,
  resetPath,
  to,
  name
}: {
  origin: string;
  resetPath: string;
  to: string;
  name: string;
}) => {
  try {
    const logoSrc = `${origin}/email/top-logo.png`;
    const href = `${origin}${resetPath}`;

    const locals = {
      origin,
      name,
      href,
      logoSrc
    };

    const [html, subject] = await Promise.all([
      mailer.render(
        path.join(__dirname, 'emails', 'password-reset/html'),
        locals
      ),
      mailer.render(
        path.join(__dirname, 'emails', 'password-reset/subject'),
        locals
      )
    ]);

    await mail.send({
      to,
      subject,
      html,
      from: sender
    });
  } catch (e) {
    logger.error(`Error with mailer: ${e.message}`);
  }
};

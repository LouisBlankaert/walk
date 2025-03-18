import sgMail from '@sendgrid/mail';

const initSendGrid = () => {
  if (process.env.SENDGRID_API_KEY) {
    if (!process.env.SENDGRID_API_KEY.startsWith('SG.')) {
      console.warn('Warning: SendGrid API key format appears incorrect');
    }
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  } else {
    console.warn('SendGrid API key not found in environment variables');
  }
};

initSendGrid();

export { sgMail };

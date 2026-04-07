const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = Number(process.env.PORT || 4000);

const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : true,
  })
);
app.use(express.json({ limit: '20kb' }));

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function createTransport() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error('Missing SMTP configuration. Set SMTP_HOST, SMTP_USER, and SMTP_PASS.');
  }

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || 'false').toLowerCase() === 'true',
    auth: {
      user,
      pass,
    },
  });
}

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/contact', async (req, res) => {
  try {
    const name = String(req.body?.name || '').trim();
    const email = String(req.body?.email || '').trim();
    const phone = String(req.body?.phone || '').trim();
    const note = String(req.body?.note || '').trim();

    if (!name || !email || !phone || !note) {
      return res.status(400).json({
        error: 'Please provide name, email, phone number, and note.',
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: 'Please provide a valid email address.',
      });
    }

    const transporter = createTransport();
    const toAddress = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER;
    const fromAddress = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER;

    if (!toAddress || !fromAddress) {
      return res.status(500).json({
        error: 'Contact email routing is not configured.',
      });
    }

    const subject = `New contact form submission from ${name}`;
    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      '',
      'Message:',
      note,
    ].join('\n');

    const html = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(note).replace(/\n/g, '<br />')}</p>
    `;

    await transporter.sendMail({
      from: fromAddress,
      to: toAddress,
      replyTo: email,
      subject,
      text,
      html,
    });

    return res.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      error: 'Unable to submit contact form right now.',
    });
  }
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Contact API listening on http://localhost:${port}`);
  });
}

module.exports = app;

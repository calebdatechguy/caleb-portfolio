import { Hono } from 'hono'
import { cors } from 'hono/cors'
import nodemailer from 'nodemailer'

const app = new Hono()

app.use('/*', cors({
  origin: '*',
  allowHeaders: ['Content-Type'],
  allowMethods: ['GET', 'POST', 'OPTIONS'],
}))

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_PASSWORD,
  },
})

app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.post('/api/contact', async (c) => {
  try {
    const body = await c.req.json()
    const { name, email, service, date, budget, message } = body

    if (!name || !email || !message) {
      return c.json({ error: 'Missing required fields' }, 400)
    }

    const serviceLabel = service || 'Not specified'
    const dateLabel = date || 'Not specified'
    const budgetLabel = budget || 'Not specified'

    const submittedAt = new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    })

    // --- Notification email to Caleb ---
    await transporter.sendMail({
      from: `"Caleb Creative" <${process.env.ZOHO_EMAIL}>`,
      to: ['calebelliott933@gmail.com', 'caleb@lykodigital.com'],
      replyTo: email,
      subject: `New inquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
          <div style="background: #0a0f2e; padding: 32px; margin-bottom: 0;">
            <h1 style="color: #fff; font-size: 22px; margin: 0; letter-spacing: -0.02em;">CALEB CREATIVE</h1>
            <p style="color: #4a6cf7; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; margin: 4px 0 0;">New Contact Form Submission</p>
          </div>
          <div style="background: #f9f9f9; padding: 32px; border: 1px solid #e5e7eb;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; width: 140px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 15px; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 15px;"><a href="mailto:${email}" style="color: #4a6cf7;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Service</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 15px;">${serviceLabel}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Date</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 15px;">${dateLabel}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Budget</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 15px;">${budgetLabel}</td>
              </tr>
              <tr>
                <td style="padding: 16px 0 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; vertical-align: top;">Message</td>
                <td style="padding: 16px 0 0; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</td>
              </tr>
            </table>
            <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <a href="mailto:${email}?subject=Re: Your inquiry" style="display: inline-block; background: #4a6cf7; color: #fff; text-decoration: none; padding: 12px 24px; font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;">Reply to ${name}</a>
            </div>
          </div>
          <p style="color: #9ca3af; font-size: 11px; padding: 16px; text-align: center;">Caleb Creative · Georgia, USA · caleb@lykodigital.com</p>
        </div>
      `,
    })

    // --- Submission details email to Caleb (clean data sheet) ---
    await transporter.sendMail({
      from: `"Caleb Creative" <${process.env.ZOHO_EMAIL}>`,
      to: ['calebelliott933@gmail.com', 'caleb@lykodigital.com'],
      replyTo: email,
      subject: `📋 Submission Details — ${name}`,
      html: `
        <div style="font-family: 'Courier New', Courier, monospace; max-width: 580px; margin: 0 auto; background: #fff; border: 2px solid #111; padding: 40px;">
          <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.25em; color: #888; margin: 0 0 4px;">Caleb Creative · Contact Form</p>
          <h1 style="font-size: 22px; font-weight: 900; margin: 0 0 4px; letter-spacing: -0.01em; font-family: sans-serif;">Submission Details</h1>
          <p style="font-size: 12px; color: #888; margin: 0 0 32px;">${submittedAt}</p>

          <hr style="border: none; border-top: 2px solid #111; margin: 0 0 28px;" />

          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr style="vertical-align: top;">
              <td style="padding: 10px 16px 10px 0; color: #888; white-space: nowrap; width: 120px;">NAME</td>
              <td style="padding: 10px 0; font-weight: 700; color: #111;">${name}</td>
            </tr>
            <tr style="vertical-align: top; background: #f9f9f9;">
              <td style="padding: 10px 16px 10px 0; color: #888; white-space: nowrap;">EMAIL</td>
              <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #111; font-weight: 700;">${email}</a></td>
            </tr>
            <tr style="vertical-align: top;">
              <td style="padding: 10px 16px 10px 0; color: #888; white-space: nowrap;">SERVICE</td>
              <td style="padding: 10px 0; color: #111;">${serviceLabel}</td>
            </tr>
            <tr style="vertical-align: top; background: #f9f9f9;">
              <td style="padding: 10px 16px 10px 0; color: #888; white-space: nowrap;">DATE</td>
              <td style="padding: 10px 0; color: #111;">${dateLabel}</td>
            </tr>
            <tr style="vertical-align: top;">
              <td style="padding: 10px 16px 10px 0; color: #888; white-space: nowrap;">BUDGET</td>
              <td style="padding: 10px 0; color: #111;">${budgetLabel}</td>
            </tr>
          </table>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />

          <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #888; margin: 0 0 10px;">Message</p>
          <p style="font-size: 14px; line-height: 1.8; color: #111; margin: 0 0 32px; white-space: pre-wrap; background: #f9f9f9; padding: 16px; border-left: 3px solid #111;">${message}</p>

          <hr style="border: none; border-top: 2px solid #111; margin: 0 0 20px;" />

          <a href="mailto:${email}?subject=Re: Your inquiry" style="display: inline-block; background: #111; color: #fff; text-decoration: none; padding: 12px 28px; font-size: 12px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; font-family: sans-serif;">Reply to ${name}</a>
        </div>
      `,
    })

    // --- Auto-reply to the person who submitted ---
    await transporter.sendMail({
      from: `"Caleb Elliott" <${process.env.ZOHO_EMAIL}>`,
      to: [email],
      subject: `Got your message, ${name.split(' ')[0]}!`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
          <div style="background: #0a0f2e; padding: 32px;">
            <h1 style="color: #fff; font-size: 22px; margin: 0; letter-spacing: -0.02em;">CALEB CREATIVE</h1>
            <p style="color: #4a6cf7; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; margin: 4px 0 0;">Film · Photo · Digital</p>
          </div>
          <div style="padding: 40px 32px; background: #fff; border: 1px solid #e5e7eb; border-top: none;">
            <h2 style="font-size: 26px; font-weight: 900; letter-spacing: -0.02em; margin: 0 0 16px;">Message received.</h2>
            <p style="color: #374151; font-size: 15px; line-height: 1.7; margin: 0 0 16px;">
              Hey ${name.split(' ')[0]}, thanks for reaching out — I'll get back to you within 24–48 hours.
            </p>
            <p style="color: #374151; font-size: 15px; line-height: 1.7; margin: 0 0 32px;">
              In the meantime, feel free to check out my latest work or follow along on Instagram.
            </p>
            <a href="https://calebcreative.com/portfolio" style="display: inline-block; background: #0a0f2e; color: #fff; text-decoration: none; padding: 12px 24px; font-size: 12px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; margin-right: 12px;">View Portfolio</a>
            <a href="https://instagram.com/calebcrtv" style="display: inline-block; border: 1px solid #0a0f2e; color: #0a0f2e; text-decoration: none; padding: 12px 24px; font-size: 12px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;">@calebcrtv</a>
          </div>
          <p style="color: #9ca3af; font-size: 11px; padding: 16px; text-align: center;">Caleb Creative · Georgia, USA · caleb@lykodigital.com</p>
        </div>
      `,
    })

    return c.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return c.json({ error: 'Failed to send message' }, 500)
  }
})

const port = Number(process.env.PORT) || 4001

export default {
  port,
  fetch: app.fetch,
}

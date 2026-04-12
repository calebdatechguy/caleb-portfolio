import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { Resend } from 'resend'

const app = new Hono()
const resend = new Resend(process.env.RESEND_API_KEY)

const NOTIFY_EMAILS = ['calebelliott933@gmail.com', 'caleb@lykodigital.com']

app.use('/*', cors())

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

    const serviceLabels: Record<string, string> = {
      'wedding-film': 'Wedding Film',
      'wedding-photo': 'Wedding Photography',
      'commercial-video': 'Commercial / Brand Video',
      'brand-photo': 'Brand Photography',
      'web-design': 'Web Design & Development',
      'brand-identity': 'Brand & Logo Design',
      'other': 'Other / Not Sure',
    }

    const budgetLabels: Record<string, string> = {
      'under-500': 'Under $500',
      '500-1500': '$500 – $1,500',
      '1500-5000': '$1,500 – $5,000',
      '5000+': '$5,000+',
    }

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Submission</title>
</head>
<body style="margin:0;padding:0;background:#0a0d1a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0d1a;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#0f1e64;padding:36px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0 0 4px 0;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#6c8fff;">Caleb Creative</p>
                    <h1 style="margin:0;font-size:26px;font-weight:900;color:#ffffff;letter-spacing:-0.03em;">New Inquiry</h1>
                  </td>
                  <td align="right">
                    <div style="width:44px;height:44px;background:#3d5afe;display:inline-block;"></div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#12152b;padding:36px 40px;">

              <!-- From -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="border-left:3px solid #3d5afe;padding-left:16px;">
                    <p style="margin:0 0 2px 0;font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#6c8fff;">From</p>
                    <p style="margin:0;font-size:20px;font-weight:800;color:#ffffff;">${name}</p>
                    <p style="margin:4px 0 0 0;font-size:13px;color:#8892b0;"><a href="mailto:${email}" style="color:#6c8fff;text-decoration:none;">${email}</a></p>
                  </td>
                </tr>
              </table>

              <!-- Details grid -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td width="50%" style="padding-right:10px;padding-bottom:16px;vertical-align:top;">
                    <div style="background:#1a1f3a;padding:16px 18px;">
                      <p style="margin:0 0 6px 0;font-size:9px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#6c8fff;">Service</p>
                      <p style="margin:0;font-size:14px;font-weight:600;color:#e8eaf6;">${service ? serviceLabels[service] ?? service : '—'}</p>
                    </div>
                  </td>
                  <td width="50%" style="padding-left:10px;padding-bottom:16px;vertical-align:top;">
                    <div style="background:#1a1f3a;padding:16px 18px;">
                      <p style="margin:0 0 6px 0;font-size:9px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#6c8fff;">Budget</p>
                      <p style="margin:0;font-size:14px;font-weight:600;color:#e8eaf6;">${budget ? budgetLabels[budget] ?? budget : '—'}</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <div style="background:#1a1f3a;padding:16px 18px;">
                      <p style="margin:0 0 6px 0;font-size:9px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#6c8fff;">Event / Project Date</p>
                      <p style="margin:0;font-size:14px;font-weight:600;color:#e8eaf6;">${date || '—'}</p>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0 0 10px 0;font-size:9px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#6c8fff;">Message</p>
                    <div style="background:#1a1f3a;padding:20px;border-left:3px solid #3d5afe;">
                      <p style="margin:0;font-size:14px;line-height:1.7;color:#c8d0e8;white-space:pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
                    </div>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0a0d1a;padding:20px 40px;border-top:1px solid #1a1f3a;">
              <p style="margin:0;font-size:11px;color:#3d4a6b;text-align:center;">Submitted via calebcrtv.com · Caleb Creative</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

    await resend.emails.send({
      from: 'Caleb Creative <onboarding@resend.dev>',
      to: NOTIFY_EMAILS,
      replyTo: email,
      subject: `New Inquiry from ${name}${service ? ` — ${serviceLabels[service] ?? service}` : ''}`,
      html,
    })

    return c.json({ success: true })
  } catch (err) {
    console.error('Contact email error:', err)
    return c.json({ error: 'Failed to send email' }, 500)
  }
})

const port = Number(process.env.PORT) || 4001

export default {
  port,
  fetch: app.fetch,
}

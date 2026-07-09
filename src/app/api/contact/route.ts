import { NextResponse } from 'next/server'

type ContactPayload = {
  name?: string
  phone?: string
  service?: string
  comment?: string
}

function getEnv(name: string) {
  const value = process.env[name]?.trim()
  if (!value) return undefined
  return value.replace(/^['"]|['"]$/g, '')
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload
    const name = body.name?.trim()
    const phone = body.phone?.trim()
    const service = body.service?.trim() || 'Не вказано'
    const comment = body.comment?.trim() || '—'

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Імʼя та телефон обовʼязкові.' },
        { status: 400 },
      )
    }

    const token = getEnv('BOT_TOKEN')
    const chatId = getEnv('CHAT_ID')

    if (!token || !chatId) {
      console.error('[contact] Missing BOT_TOKEN or CHAT_ID in environment')
      return NextResponse.json(
        { error: 'Сервіс тимчасово недоступний.' },
        { status: 503 },
      )
    }

    const sentAt = new Date().toLocaleString('uk-UA', {
      timeZone: 'Europe/Kyiv',
      dateStyle: 'short',
      timeStyle: 'short',
    })

    const text = [
      '<b>Нова заявка — West Auto Shipping</b>',
      `<i>${sentAt}</i>`,
      '',
      `<b>Імʼя:</b> ${escapeHtml(name)}`,
      `<b>Телефон:</b> ${escapeHtml(phone)}`,
      `<b>Послуга:</b> ${escapeHtml(service)}`,
      `<b>Коментар:</b> ${escapeHtml(comment)}`,
    ].join('\n')

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      },
    )

    const telegramData = await telegramResponse.json().catch(() => null)

    if (!telegramResponse.ok || !telegramData?.ok) {
      console.error('[contact] Telegram API error:', telegramData)
      return NextResponse.json(
        { error: 'Не вдалося надіслати заявку. Спробуйте пізніше.' },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[contact] Unexpected error:', error)
    return NextResponse.json(
      { error: 'Сталася помилка. Спробуйте ще раз.' },
      { status: 500 },
    )
  }
}

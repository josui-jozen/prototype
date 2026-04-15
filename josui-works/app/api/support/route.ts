import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'

const redis = new Redis({
  url: process.env.ATO_KV_REST_API_URL!,
  token: process.env.ATO_KV_REST_API_TOKEN!,
})

const KEY = 'ato-support-count'
const FEEDBACK_KEY = 'ato-support-feedback'
const MENTION = '<@659728388637851698>'

async function notify(content: string) {
  const webhook = process.env.DISCORD_FEEDBACK_WEBHOOK
  if (!webhook) return
  await fetch(webhook, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ content }),
  }).catch(() => {})
}

export async function GET() {
  const count = (await redis.get<number>(KEY)) ?? 0
  return NextResponse.json({ count })
}

export async function POST(req: Request) {
  let message = ''
  try {
    const body = await req.json()
    if (typeof body?.message === 'string') message = body.message.trim()
  } catch {}

  if (message) {
    await redis.lpush(FEEDBACK_KEY, JSON.stringify({ message, at: Date.now() }))
    await notify(`${MENTION}\n💬 ${message.slice(0, 1900)}`)
    return NextResponse.json({ ok: true })
  }

  const count = await redis.incr(KEY)
  await notify(`${MENTION}\n🎉 応援が増えました(累計 ${count}人)`)
  return NextResponse.json({ count })
}

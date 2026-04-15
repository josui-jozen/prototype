'use client'

import { useEffect, useState } from 'react'

const LS_KEY = 'ato-supported'
const LS_FB_KEY = 'ato-feedback-sent'
const GOAL = 100

export default function SupportButton() {
  const [count, setCount] = useState<number | null>(null)
  const [supported, setSupported] = useState(false)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [feedbackSent, setFeedbackSent] = useState(false)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    setSupported(localStorage.getItem(LS_KEY) === '1')
    setFeedbackSent(localStorage.getItem(LS_FB_KEY) === '1')
    fetch('/api/support')
      .then((r) => r.json())
      .then((d) => setCount(d.count))
      .catch(() => setCount(0))
  }, [])

  const onClick = async () => {
    if (supported || busy) return
    setBusy(true)
    try {
      const r = await fetch('/api/support', { method: 'POST' })
      const d = await r.json()
      setCount(d.count)
      localStorage.setItem(LS_KEY, '1')
      setSupported(true)
    } finally {
      setBusy(false)
    }
  }

  const onSendFeedback = async () => {
    const text = message.trim()
    if (!text || sending) return
    setSending(true)
    try {
      await fetch('/api/support', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })
      localStorage.setItem(LS_FB_KEY, '1')
      setFeedbackSent(true)
      setMessage('')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="ato-support">
      <p className="ato-support-desc">
        「ほしい」が{GOAL}個集まればアプリ化します。
        <br />
        応援よろしくお願いします！
      </p>
      {supported ? (
        <p className="ato-support-thanks">ありがとうございます🎉</p>
      ) : (
        <button
          type="button"
          className="ato-cta-button"
          onClick={onClick}
          disabled={busy}
        >
          欲しい！
        </button>
      )}
      {count !== null && (
        <p className="ato-support-count">
          応援してくれた人数 {count}人
        </p>
      )}
      {supported && !feedbackSent && (
        <div className="ato-feedback">
          <p className="ato-feedback-prompt">
            「こんな機能がほしい」があればぜひお聞かせください。
          </p>
          <textarea
            className="ato-feedback-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="ご意見・ご要望"
          />
          <button
            type="button"
            className="ato-cta-button"
            onClick={onSendFeedback}
            disabled={sending || !message.trim()}
          >
            送信
          </button>
        </div>
      )}
      {feedbackSent && (
        <p className="ato-support-thanks">ご意見ありがとうございました</p>
      )}
    </div>
  )
}

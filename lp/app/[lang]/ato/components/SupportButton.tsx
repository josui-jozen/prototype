'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import './SupportButton.css'

const LS_KEY = 'ato-supported'
const GOAL = 10

export default function SupportButton() {
  const [count, setCount] = useState<number | null>(null)
  const [supported, setSupported] = useState(false)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [feedbackSent, setFeedbackSent] = useState(false)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    setSupported(localStorage.getItem(LS_KEY) === '1')
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
      setFeedbackSent(true)
      setMessage('')
      setTimeout(() => setFeedbackSent(false), 2500)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="ato-support">
      <p className="ato-support-desc">
        「欲しい」が{GOAL}個集まればアプリ化します。
        <br />
        応援よろしくお願いします！
      </p>
      <div className="ato-support-slot">
        <AnimatePresence mode="wait">
          {!supported ? (
            <motion.button
              key="want"
              type="button"
              className="ato-cta-button"
              onClick={onClick}
              disabled={busy}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              欲しい！
            </motion.button>
          ) : (
            <motion.div
              key="thanks"
              className="ato-support-thanks"
              initial={{ opacity: 0, scale: 0.7, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            >
              <span>
                ありがとうございます
                <motion.span
                  style={{ display: 'inline-block', transformOrigin: '70% 70%' }}
                  initial={{ rotate: 0, scale: 0.6 }}
                  animate={{ rotate: [0, -20, 16, -14, 10, -6, 0], scale: [0.6, 1.3, 1, 1, 1, 1, 1] }}
                  transition={{ duration: 1, ease: 'easeInOut', delay: 0.1 }}
                >
                  🎉
                </motion.span>
              </span>
              <motion.span
                className="ato-sparkle ato-sparkle-r"
                initial={{ opacity: 0, y: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], y: -28, scale: [0, 1.2, 1] }}
                transition={{ duration: 0.9, delay: 0.15 }}
              >
                ✨
              </motion.span>
              <motion.span
                className="ato-sparkle ato-sparkle-l"
                initial={{ opacity: 0, y: 0, scale: 0, x: 0 }}
                animate={{ opacity: [0, 1, 0], y: -22, scale: [0, 1.2, 1], x: -16 }}
                transition={{ duration: 0.9, delay: 0.05 }}
              >
                ✨
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {count !== null && (
        <p className="ato-support-count">
          {count}人が応援しています
        </p>
      )}
      <div
        className="ato-feedback"
        aria-hidden={!supported}
        data-visible={supported}
      >
        <p className="ato-feedback-prompt">
          「こんな機能がほしい」があれば
          <br />
          ぜひお聞かせください。
        </p>
        <div className="ato-feedback-stage">
          <AnimatePresence mode="wait">
            {!feedbackSent && !sending && (
              <motion.div
                key="form"
                className="ato-feedback-form"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97, y: -8 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                <textarea
                  className="ato-feedback-input"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="ご意見・ご要望"
                  tabIndex={supported ? 0 : -1}
                />
                <motion.button
                  type="button"
                  className="ato-cta-button"
                  onClick={onSendFeedback}
                  disabled={!supported || !message.trim()}
                  tabIndex={supported ? 0 : -1}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                >
                  送信
                </motion.button>
              </motion.div>
            )}
            {sending && (
              <motion.div
                key="sending"
                className="ato-feedback-sending"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.span
                  className="ato-spinner"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="ato-feedback-status"
                >
                  送信中...
                </motion.span>
              </motion.div>
            )}
            {feedbackSent && (
              <motion.div
                key="done"
                className="ato-feedback-done"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22, bounce: 0.4 }}
              >
                <motion.span
                  className="ato-check"
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
                  aria-hidden
                >
                  ✓
                </motion.span>
                <span>ご意見ありがとうございました</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

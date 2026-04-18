'use client'

import { useEffect, useRef, useState } from 'react'
import './SoundPlayer.css'

const AMBIENT = '/ato/sounds/' + encodeURIComponent('草原と牧場.mp3')
const WRITING = '/ato/sounds/' + encodeURIComponent('書く音.mp3')

const AMBIENT_VOL = 0.15
const WRITING_VOL = 0.03

export default function SoundPlayer() {
  const [asked, setAsked] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)
  const writingBufRef = useRef<AudioBuffer | null>(null)
  const ambientSrcRef = useRef<AudioBufferSourceNode | null>(null)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    document.documentElement.dataset.atoAwaiting = '1'
    const video = document.querySelector<HTMLVideoElement>('.ato-bg-video')
    video?.pause()
    return () => {
      delete document.documentElement.dataset.atoAwaiting
    }
  }, [])

  const release = () => {
    delete document.documentElement.dataset.atoAwaiting
    const video = document.querySelector<HTMLVideoElement>('.ato-bg-video')
    video?.play().catch(() => {})
  }

  const start = async () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioCtx()
      ctxRef.current = ctx

      const [ambientBuf, writingBuf] = await Promise.all([
        fetch(AMBIENT).then((r) => r.arrayBuffer()).then((b) => ctx.decodeAudioData(b)),
        fetch(WRITING).then((r) => r.arrayBuffer()).then((b) => ctx.decodeAudioData(b)),
      ])
      writingBufRef.current = writingBuf

      // 各ループでフェードイン/アウトを入れるため、built-in loop は使わず手動スケジュール
      const FADE = 3 // seconds
      const dur = ambientBuf.duration
      const overlap = FADE // 次のサイクルとクロスフェード
      const scheduleCycle = (startAt: number) => {
        const src = ctx.createBufferSource()
        src.buffer = ambientBuf
        const gain = ctx.createGain()
        gain.gain.setValueAtTime(0, startAt)
        gain.gain.linearRampToValueAtTime(AMBIENT_VOL, startAt + FADE)
        gain.gain.setValueAtTime(AMBIENT_VOL, startAt + dur - FADE)
        gain.gain.linearRampToValueAtTime(0, startAt + dur)
        src.connect(gain).connect(ctx.destination)
        src.start(startAt)
        src.stop(startAt + dur + 0.1)
        ambientSrcRef.current = src
        // 次サイクルをオーバーラップさせて自己スケジュール
        src.onended = () => {}
        window.setTimeout(() => scheduleCycle(startAt + dur - overlap), Math.max(0, (dur - overlap - 1) * 1000))
      }
      scheduleCycle(ctx.currentTime + 0.05)

      const playWriting = () => {
        if (!ctxRef.current || !writingBufRef.current) return
        const src = ctxRef.current.createBufferSource()
        src.buffer = writingBufRef.current
        const gain = ctxRef.current.createGain()
        gain.gain.value = WRITING_VOL
        src.connect(gain).connect(ctxRef.current.destination)
        src.start()
      }
      const scheduleNext = (delay: number) => {
        timerRef.current = window.setTimeout(() => {
          playWriting()
          scheduleNext(8000 + Math.random() * 20000)
        }, delay)
      }
      scheduleNext(3000)
    } catch {
      // fallback: silent fail
    }
  }

  const accept = () => {
    setAsked(true)
    release()
    start()
  }

  const decline = () => {
    setAsked(true)
    release()
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      ambientSrcRef.current?.stop()
      ctxRef.current?.close()
    }
  }, [])

  if (asked) return null

  return (
    <div className="ato-sound-prompt">
      <div className="ato-sound-prompt-inner">
        <p>
          環境音が流れます
          <br />
          音声ありで体験しますか?
        </p>
        <div className="ato-sound-prompt-actions">
          <button type="button" onClick={accept} className="ato-cta-button">あり</button>
          <button type="button" onClick={decline} className="ato-cta-button">なし</button>
        </div>
      </div>
    </div>
  )
}

import FadeIn from './FadeIn'
import Cursor from './Cursor'
import Editor from './Editor'
import ScrollOverlay from './ScrollOverlay'
import SupportButton from './SupportButton'
import NoZoom from './NoZoom'
import SoundPlayer from './SoundPlayer'
import TypedSectionTitle from './TypedSectionTitle'
import './lp.css'

const segmentText: Record<number, string> = {
  1: 'インターネットの発展によって、',
  2: '多くの人が文字を打ち、',
  3: '発信するようになった時代。',
  4: '文字は書くものから打つものに変わり、',
  5: '言葉はデータになった。',
  6: 'データをナレッジとして着積し、',
  7: 'データをAIに学習させ、',
  8: 'データをビジネスに活用する。',
  9: 'そうして劇的に変わっていく社会を、',
  10: '僕はエンジニアとして最前線で見てきた。',
  11: 'だから思う。「なんだか味気ない」と。',
  12: '言葉の価値は情報だけじゃない。',
  13: '未来の誰かにこの気持ちを伝える、',
  14: '感情としての価値だってあるはずだ。',
  15: '僕はただ、自分の言葉をデータにされたくなかった。',
  16: '苦しかった、辛かったここまでの道のりを、',
  17: '情報にして欲しくなかった。',
  18: 'うれしかったことを',
  19: 'つらかったことを',
  20: 'かなしかったことを',
  21: 'たのしかったことを',
  22: '思ったままに、',
  23: '感じたままに、',
  24: '書く。',
  25: 'データとかナレッジとか',
  26: 'そんな複雑な横文字じゃなくていい。',
  27: '感情としての言葉を大切にしたい。',
  28: 'だから、',
  29: '他でもない自分を、',
  30: 'ただ待ってくれるような、',
  31: 'そんなノートが欲しいと思った。',
}

const philosophyParagraphs: number[][][] = [
  [[1, 2, 3]],
  [[4, 5]],
  [[6, 7, 8]],
  [[9, 10], [11]],
  [[12], [13, 14]],
  [[15], [16, 17]],
  [[18, 19, 20, 21], [22, 23, 24]],
  [[25, 26], [27]],
  [[28, 29, 30], [31]],
]

const segSrc = (n: number) =>
  `/essay/seg/${String(n).padStart(2, '0')}_${segmentText[n]}.png`

const values = [
  {
    headline: 'もっと書きたくなるような、自分だけの見た目。',
    desc: 'フォント・行間・サイズ・背景を細かく調整できます。自分好みの見た目にすると、書くのが楽しくなります。',
  },
  {
    headline: 'それは、まるで1つの作品のように。',
    desc: '日本語に最適化されたUIで、小説や論文のような、整った表示ができます。',
  },
  {
    headline: 'あなたの「書きたい」を守る。',
    desc: 'ミーティングやチームスペースのような、書くことを萎えさせるような横文字は一切ありません。',
  },
  {
    headline: 'いつでもどこでも、お待ちしています。',
    desc: 'スマホでもパソコンでも、オンラインでもオフラインでも。感情が動いた時、書きたいと思った時、いつでもあなただけの場所になります。',
  },
]

export default function AtoPage() {
  return (
    <main className="ato">
      <NoZoom />
      <SoundPlayer />
      <section className="ato-fv">
        <video
          className="ato-bg-video"
          src="/bg/iStock-2267331151-HD.mov"
          loop
          muted
          playsInline
        />
        <ScrollOverlay />
        <div className="ato-title-group">
          <h1 className="ato-catchcopy">僕を書くためのノート<span className="ato-period">。</span><Cursor /></h1>
          <p className="ato-subtitle">自分好みに見た目をカスタムできるノートアプリ</p>
        </div>
        <div className="ato-scroll-guide">
          <span className="ato-scroll-text">スクロールしてください</span>
          <span className="ato-scroll-line" />
          <svg className="ato-scroll-chevron" width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
      </section>

      <section className="ato-philosophy">
        <FadeIn>
          <TypedSectionTitle reading="せかいかん" final="世界観" />
        </FadeIn>
        {philosophyParagraphs.map((sentences, i) => (
          <div key={i} className="ato-philosophy-paragraph">
            {sentences.map((segs, j) => (
              <FadeIn key={j}>
                <p className="ato-philosophy-handwriting">
                  {segs.map((n) => (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img key={n} src={segSrc(n)} alt={segmentText[n]} />
                  ))}
                </p>
              </FadeIn>
            ))}
          </div>
        ))}
      </section>

      <section className="ato-trial">
        <FadeIn>
          <TypedSectionTitle reading="たいけんばん" final="体験版" />
        </FadeIn>
        <FadeIn>
          <Editor />
        </FadeIn>
      </section>

      <section className="ato-values">
        <FadeIn>
          <TypedSectionTitle reading="きのう" final="機能" />
        </FadeIn>
        {values.map((v, i) => (
          <FadeIn key={i} className="ato-value-item">
            <p className="ato-value-headline">{v.headline}</p>
            <p className="ato-value-desc">{v.desc}</p>
          </FadeIn>
        ))}
      </section>

      <section className="ato-cta">
        <FadeIn>
          <TypedSectionTitle reading="おうえん" final="応援" />
        </FadeIn>
        <FadeIn>
          <SupportButton />
        </FadeIn>
      </section>
    </main>
  )
}

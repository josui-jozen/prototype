import FadeIn from './FadeIn'
import Cursor from './Cursor'
import Editor from './Editor'
import './lp.css'

const philosophyParagraphs = [
  'インターネットの発展によって、多くの人々が文字を打ち、発信するようになった現代。いつしか文字は、書くものから、打つものに変わった。',
  '言葉は、データになった。それを分析してビジネスに活用するため。それをナレッジとして蓄積するため。それをAIに学習させさらなる技術革新を生むため。',
  'そうして劇的に変化していく社会を、僕はエンジニアとして最前線で見てきた。だから思う。なんだか味気ない、と。',
  '言葉の価値は情報だけじゃない。未来の誰かに、この気持ちを伝える、感情としての価値だってあるはずだ。',
  '僕の言葉を、ただのデータにされたくなかった。ありふれている。きっと似たような人生は他にいくらでもある。それでも。苦しかった、辛かったここまできた道のりを、ただの情報にして欲しくなかった。',
  'うれしかったことを、つらかったことを、かなしかったことを、たのしかったことを。ただ思ったままに、ただ感じたままに、書く。',
  'データとかナレッジとか、そんな複雑な言葉じゃなくていい。あと、は、感情としての言葉を大切にしたい。他ならぬ自分を、ただ待っていてくれるような、このノートを作った。',
]

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
      <section className="ato-fv">
        <video
          className="ato-bg-video"
          src="/ato/bg/iStock-1151625702.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <h1 className="ato-catchcopy">僕を書くためのノート<span className="ato-period">。</span><Cursor /></h1>
        <div className="ato-scroll-guide">
          <span className="ato-scroll-text">スクロールしてください</span>
          <span className="ato-scroll-line" />
          <svg className="ato-scroll-chevron" width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
      </section>

      <section className="ato-philosophy">
        {philosophyParagraphs.map((text, i) => (
          <FadeIn key={i}>
            <p>{text}</p>
          </FadeIn>
        ))}
        <FadeIn>
          <p className="ato-signature">きっちゃん@如水工作所</p>
        </FadeIn>
      </section>

      <section className="ato-trial">
        <FadeIn>
          <Editor />
        </FadeIn>
      </section>

      <section className="ato-values">
        {values.map((v, i) => (
          <FadeIn key={i} className="ato-value-item">
            <p className="ato-value-headline">{v.headline}</p>
            <p className="ato-value-desc">{v.desc}</p>
          </FadeIn>
        ))}
      </section>

      <section className="ato-cta">
        <FadeIn>
          <p className="ato-cta-status">現在開発中</p>
          <button type="button" className="ato-cta-button">応援する</button>
        </FadeIn>
      </section>
    </main>
  )
}

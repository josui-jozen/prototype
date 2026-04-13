import Editor from '../Editor'
import '../lp.css'
import './trial.css'

export const metadata = {
  title: 'あと、 体験版',
}

export default function TrialPage() {
  return (
    <main className="ato ato-trial-page">
      <section className="ato-trial">
        <Editor />
      </section>
    </main>
  )
}

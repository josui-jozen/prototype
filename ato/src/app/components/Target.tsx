import { motion } from 'motion/react';

export function Target() {
  return (
    <section className="py-24 px-6 w-full flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full space-y-20"
      >
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start pt-10">
          <h3 className="text-2xl font-medium tracking-[0.2em] text-ato-text shrink-0 min-w-[140px]">
            ターゲット
          </h3>
          <p className="text-lg md:text-xl text-ato-text leading-[2.2] tracking-[0.05em]">
            AI・Git・Markdownなどの技術に親しみがあって、ブログやエッセイなど日本語で長文を書く人。
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start pt-0">
          <h3 className="text-2xl font-medium tracking-[0.2em] text-ato-text shrink-0 min-w-[140px]">
            オープンソース
          </h3>
          <p className="text-lg md:text-xl text-ato-text leading-[2.2] tracking-[0.05em]">
            「stone」という素晴らしいエディターへのリスペクトを込めて、フロントエンドのリポジトリをOSSとして公開します。美しい日本語とテクノロジーの融合を、皆で育てる。
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start pt-0">
          <h3 className="text-2xl font-medium tracking-[0.2em] text-ato-text shrink-0 min-w-[140px]">
            コミュニティ
          </h3>
          <div className="space-y-6">
            <p className="text-lg md:text-xl text-ato-text leading-[2.2] tracking-[0.05em]">
              私たちは、以下のようなコミュニティと共にこの「書斎」を育てていきたいと考えています。
            </p>
            <ul className="list-disc pl-6 space-y-4 text-ato-text text-lg md:text-xl tracking-[0.05em]">
              <li>技術書やエッセイを執筆するエンジニア・クリエイター</li>
              <li>Markdownを愛好し、美しいアウトプットを求める層</li>
              <li>オープンソース文化に貢献したいデベロッパー</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

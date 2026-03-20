"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/app/_components/layout/Footer";
import { LoginModal } from "@/app/_components/auth/LoginModal";

const features = [
  { title: "公開範囲の設定", desc: "現在「自分だけ」と「みんな」を選択できます" },
  { title: "YouTube、X、Bluesky、リンクカードの埋め込み", desc: "URLを貼り付けると埋め込みボタンが表示されます" },
  { title: "画像の挿入", desc: "ボタンかドラッグ&ドロップで挿入できます" },
  { title: "タグ付け", desc: "記事をグループにまとめたいときに使います" },
  { title: "本文のバージョン管理", desc: "過去に保存した本文を復元できます" },
  { title: "ムードの変更（PCのみ）", desc: "楽しく書くためにエディターの雰囲気を変更できます" },
];

const sponsorFeatures = [
  "スポンサーページへの掲載",
  "ユーザーホームにタブメニューを設置できるように",
  "公開範囲として「URLを知る人だけ」を選べるように",
  "感想レターでスポンサー限定スタンプを選べるように",
  "はてなブックマークのコメントを非表示にできるように",
  "Googleの検索結果から非表示にできるように",
  "エディターで本文のバージョンを100件までさかのぼれるように",
  "参照系APIへのアクセス（BETA）",
];

export default function AboutPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="bg-white flex flex-col items-center min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between w-full max-w-[1042px] px-[24.15px] py-[20.125px]">
        <Link href="/" className="flex items-center gap-[10.06px] no-underline">
          <Image src="/images/logo.svg" alt="" width={40} height={51} />
          <span className="text-[16.1px] text-[var(--color-text-primary)] tracking-[0.483px] leading-[22.54px]">
            しずかなインターネット
          </span>
        </Link>
        <button
          onClick={() => setIsLoginOpen(true)}
          className="bg-white border border-[var(--color-border-button)] rounded-full px-[21.125px] py-[13.075px] cursor-pointer"
        >
          <span className="text-[16.1px] text-[var(--color-text-primary)] tracking-[0.483px] leading-[17.71px]">
            はじめる
          </span>
        </button>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-[684px] px-[40.25px] pt-[64.4px] pb-[128.79px]">
        {/* Title + Hero */}
        <div className="flex flex-col items-center gap-[0.005px]">
          <h1 className="text-[20.3px] text-[var(--color-text-primary)] tracking-[0.483px] leading-[34.49px] font-normal m-0">
            このサービスについて
          </h1>
          <div className="pt-[20.125px]">
            <Image src="/images/sl-hero.svg" alt="" width={164} height={164} />
          </div>
        </div>

        {/* Description */}
        <div className="mt-[24.1px]">
          <p className="text-[17.1px] text-[var(--color-text-primary)] tracking-[0.483px] leading-[35.84px] m-0">
            しずかなインターネットは、日記やエッセイを書くのにちょうどいい文章投稿サービスです。
          </p>
          <p className="text-[17.1px] text-[var(--color-text-primary)] tracking-[0.483px] leading-[35.84px] m-0 mt-[15px]">
            ここは、Twitterやnoteのような賑やかな広場ではありません。ここは、あなたのパーソナルな部屋のようなものです。部屋に文章を置き、通りかかった人が部屋に入って自由に読むことができる… そんなコンセプトで作られました。
          </p>

          <div className="flex justify-center my-[24px]">
            <Image src="/images/sl-shop-open.svg" alt="" width={220} height={220} />
          </div>

          <p className="text-[17.1px] text-[var(--color-text-primary)] tracking-[0.483px] leading-[35.84px] m-0">
            ここでは、頑張って有益なことを書くことは求められていません。個人的なメモや日記を気楽に書き散らしましょう。
          </p>
        </div>

        {/* Editor Section */}
        <h2 className="text-[20.3px] text-[var(--color-text-primary)] tracking-[0.483px] leading-[42.6px] font-normal m-0 mt-[64px] pb-[9.05px] border-b border-[var(--color-border)]">
          エディターについて
        </h2>

        <div className="mt-[24px] rounded-[8.05px] overflow-hidden">
          <Image
            src="/images/editor-screenshot.png"
            alt="エディターのスクリーンショット"
            width={604}
            height={359}
            className="w-full h-auto"
          />
        </div>

        <p className="text-[17.1px] text-[var(--color-text-primary)] tracking-[0.483px] leading-[35.84px] m-0 mt-[24px]">
          エディターでは以下のような機能が利用できます。
        </p>

        <ul className="list-disc pl-[20.125px] mt-[16px] space-y-[12.1px]">
          {features.map((f) => (
            <li key={f.title}>
              <span className="text-[17.1px] text-[var(--color-text-primary)] tracking-[0.483px] leading-[29px]">
                {f.title}
              </span>
              <p className="text-[14.5px] text-[var(--color-text-secondary)] tracking-[0.483px] leading-[21.74px] m-0">
                {f.desc}
              </p>
            </li>
          ))}
        </ul>

        <figure className="mt-[32px] flex flex-col items-center gap-[8.04px]">
          <div className="rounded-[8.05px] overflow-hidden w-full">
            <Image
              src="/images/mood-screenshot.png"
              alt="ムードを「川」にしたとき"
              width={604}
              height={357}
              className="w-full h-auto"
            />
          </div>
          <figcaption className="text-[13.5px] text-[var(--color-text-link)] tracking-[0.483px] leading-[28.4px]">
            ムードを「川」にしたとき
          </figcaption>
        </figure>

        {/* Newsletter Section */}
        <h2 className="text-[20.3px] text-[var(--color-text-primary)] tracking-[0.483px] leading-[42.6px] font-normal m-0 mt-[64px] pb-[9.05px] border-b border-[var(--color-border)]">
          ひかえめなニュースレター
        </h2>

        <p className="text-[17.1px] text-[var(--color-text-primary)] tracking-[0.483px] leading-[35.84px] m-0 mt-[24px]">
          しずかなインターネットで気になる人を見つけた場合、RSS もしくは「ひかえめなニュースレター」で購読することができます。
        </p>
        <p className="text-[17.1px] text-[var(--color-text-primary)] tracking-[0.483px] leading-[35.84px] m-0 mt-[15px]">
          ひかえめなニュースレターは、購読している誰かが記事を公開したときに、それらの記事の情報をまとめてメールでお伝えする機能です。このメールは1週間で1度だけしか送られません。その週に誰も更新していなければ、メールは送られません。
        </p>
        <p className="text-[17.1px] text-[var(--color-text-primary)] tracking-[0.483px] leading-[35.84px] m-0 mt-[15px]">
          また、<span className="text-[var(--color-text-secondary)] underline decoration-dotted decoration-[var(--color-link-underline)]">タイムライン</span>ページから購読中の筆者の更新情報をチェックすることもできます。
        </p>

        <figure className="mt-[32px] flex flex-col items-center gap-[8.05px]">
          <div className="rounded-[12.08px] overflow-hidden w-[400px] max-w-full">
            <Image
              src="/images/timeline-screenshot.png"
              alt="タイムライン"
              width={400}
              height={380}
              className="w-full h-auto"
            />
          </div>
          <figcaption className="text-[13.5px] text-[var(--color-text-link)] tracking-[0.483px] leading-[28.4px]">
            タイムライン
          </figcaption>
        </figure>

        {/* Letter Section */}
        <h2 className="text-[20.3px] text-[var(--color-text-primary)] tracking-[0.483px] leading-[42.6px] font-normal m-0 mt-[64px] pb-[9.05px] border-b border-[var(--color-border)]">
          感想レター
        </h2>

        <div className="mt-[24px] flex justify-center">
          <div className="rounded-[8.05px] overflow-hidden w-[400px] max-w-full">
            <Image
              src="/images/letter-screenshot.png"
              alt="感想レターの作成イメージ"
              width={400}
              height={397}
              className="w-full h-auto"
            />
          </div>
        </div>

        <p className="text-[17.1px] text-[var(--color-text-primary)] tracking-[0.483px] leading-[35.84px] m-0 mt-[24px]">
          しずかなインターネットには「いいね」ボタンはありません。筆者にリアクションする唯一の方法は、記事ページから「感想レター」を送ることです。
        </p>
        <p className="text-[17.1px] text-[var(--color-text-primary)] tracking-[0.483px] leading-[35.84px] m-0 mt-[15px]">
          感想レターは、決められたメッセージの中から選ぶ形であればログインせずに送信できます。ログインすると、自由にメッセージを入力することもできます。
        </p>

        <div className="bg-[var(--color-bg-secondary)] border border-[#f1f6f9] rounded-[19.32px] flex flex-col items-center gap-[10.06px] px-[21.125px] py-[25.15px] mt-[24px]">
          <p className="text-[14.5px] text-[var(--color-text-link)] tracking-[0.483px] leading-[30.43px] m-0">
            感想レターのお試し用ページを作りました
          </p>
          <button className="bg-white border border-[var(--color-border-button)] rounded-full px-[17.1px] py-[13.075px] cursor-pointer">
            <span className="text-[15.3px] text-[var(--color-text-primary)] tracking-[0.483px] leading-[16.82px]">
              感想レターを試しに送ってみる
            </span>
          </button>
        </div>

        <p className="text-[17.1px] text-[var(--color-text-primary)] tracking-[0.483px] leading-[35.84px] m-0 mt-[24px]">
          なお、読む人を不快にさせるような感想レターは自動的に非表示にされる仕組みになっています。<span className="underline decoration-dotted decoration-[var(--color-link-underline)]">感想レター設定</span>からこの機能はオフにできます。
        </p>

        {/* Sponsor Section */}
        <h2 className="text-[20.3px] text-[var(--color-text-primary)] tracking-[0.483px] leading-[42.6px] font-normal m-0 mt-[64px] pb-[9.05px] border-b border-[var(--color-border)]">
          スポンサー特典機能
        </h2>

        <div className="flex justify-center mt-[24px]">
          <Image src="/images/sl-dessert.svg" alt="" width={132} height={132} />
        </div>

        <p className="text-[17.1px] text-[var(--color-text-primary)] tracking-[0.483px] leading-[35.84px] m-0 mt-[24px]">
          しずかなインターネットでは「スポンサー」になることで、以下のような特典を利用できるようになります。
        </p>

        <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-[19.32px] p-[21.125px] mt-[24px]">
          <ul className="list-disc pl-[20.125px] space-y-[12.1px] m-0">
            {sponsorFeatures.map((f) => (
              <li key={f} className="text-[16.1px] text-[var(--color-text-link)] tracking-[0.483px] leading-[27.37px]">
                {f}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-[17.1px] text-[var(--color-text-primary)] tracking-[0.483px] leading-[35.84px] m-0 mt-[24px]">
          詳しくは、<span className="text-[var(--color-text-secondary)] underline decoration-dotted decoration-[var(--color-link-underline)]">しずかなインターネットのスポンサー</span>をご確認ください。
        </p>

        {/* CTA */}
        <div className="border border-[var(--color-border)] rounded-[var(--radius-modal)] flex items-end px-[33.2px] pt-[32.47px] pb-[33.2px] w-full mt-[64px]">
          <div className="flex-1">
            <p className="text-[17.1px] text-[var(--color-text-primary)] tracking-[0.483px] leading-[31.57px] m-0">
              騒がしいインターネットの片隅に
            </p>
            <p className="text-[17.1px] text-[var(--color-text-primary)] tracking-[0.483px] leading-[31.57px] m-0">
              あなたの静かな場所を作りましょう
            </p>
            <button
              onClick={() => setIsLoginOpen(true)}
              className="mt-[20.12px] bg-white border border-[var(--color-border-button)] rounded-full px-[25.15px] py-[15.087px] cursor-pointer"
            >
              <span className="text-[17.1px] text-[var(--color-text-primary)] tracking-[0.853px] leading-[18.77px]">
                はじめる
              </span>
            </button>
          </div>
          <div className="w-[144.9px] h-[188.99px] shrink-0 ml-4">
            <Image
              src="/images/sl-find-a-way.svg"
              alt=""
              width={145}
              height={189}
              className="w-full h-full"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Login Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
}

import { Link } from "react-router-dom";
import { FooterComponent } from "./components/Footer";

const About = () => {
  return (
    <div className="App">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 px-3 py-3 backdrop-blur-md md:px-5">
        <div className="mx-auto flex w-full max-w-[1520px] items-center justify-between gap-3">
          <Link to="/" className="flex items-start gap-3 pr-3 lg:pr-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0f4c81,#1f7abf)] text-sm font-bold text-white shadow-[0_10px_25px_rgba(15,76,129,0.28)]">
              浜
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700">
                Public Event Calendar
              </p>
              <span className="block text-base font-bold tracking-[0.02em] text-slate-900 sm:text-lg md:text-[1.1rem] lg:text-xl">
                浜松市イベントカレンダー
              </span>
            </div>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-sky-300 hover:text-sky-700"
          >
            カレンダーを見る
          </Link>
        </div>
      </header>

      <main className="mx-auto flex min-h-screen w-full max-w-[1520px] flex-col px-3 pb-8 pt-4 md:px-5">
        <section className="overflow-hidden rounded-[24px] border border-slate-200/80 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:rounded-[28px]">
          <div className="border-b border-slate-200 bg-white px-4 py-6 sm:px-5 lg:px-7">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">
              About This Site
            </p>
            <h1 className="text-2xl font-bold tracking-[0.02em] text-slate-900 sm:text-3xl">
              このサイトについて
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              浜松市内で開催されるイベント情報を、日付ごとに見やすく確認できるよう整理した地域向けのイベントカレンダー。
              市民や来訪者のみなさんが、週末のお出かけ先や地域の催しを探しやすくすることを目的として運営しています。
            </p>
          </div>

          <div className="grid gap-6 px-4 py-5 sm:px-5 lg:px-7">
            <section className="px-1 py-2">
              <h2 className="text-lg font-bold text-slate-900">掲載している情報</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                イベント名、開催日、会場、概要など、参加判断に必要な基本情報を中心に掲載しています。
                情報は確認のうえ反映していますが、主催者の都合により変更される場合があります。
              </p>
            </section>

            <section className="px-1 py-2">
              <h2 className="text-lg font-bold text-slate-900">このサイトの目的</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                情報が散らばりがちな地域イベントを、ひとつの画面でまとめて把握できる状態にすることを目指しています。
                行きたいイベントを探す負担を減らし、地域の回遊や参加のきっかけをつくることを大切にしています。
              </p>
            </section>

            <section className="px-1 py-2">
              <h2 className="text-lg font-bold text-slate-900">利用時の注意</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                掲載内容はできるだけ最新の状態に保つよう努めていますが、日時変更、中止、会場変更、受付終了などが発生する場合があります。
                参加前には、主催者の公式案内もあわせてご確認ください。
              </p>
            </section>

            <section className="px-1 py-2">
              <h2 className="text-lg font-bold text-slate-900">掲載内容の修正について</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                情報の誤りや修正希望がある場合は、今後公開予定の問い合わせ窓口からご連絡いただく想定です。
                連絡導線が整うまでは、公開範囲と運用フローの整備を優先して進めています。
              </p>
            </section>
          </div>
        </section>
      </main>

      <FooterComponent />
    </div>
  );
};

export default About;

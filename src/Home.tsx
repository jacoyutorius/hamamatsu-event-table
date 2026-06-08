import React, { useState } from 'react';
import './App.css';
import dayjs from 'dayjs';
// import { withAuthenticator } from '@aws-amplify/ui-react';

// components
import { NavbarComponent } from './components/Navbar';
import { ModalComponent } from './components/Modal';
import { CreateFormComponent } from "./components/CreateForm"
// import { CardListComponent } from './components/CardList';
import { CalendarComponent } from './components/Calendar';
import { FooterComponent } from './components/Footer';

// contexts
import { SelectedMonthContext } from "./hooks/SelectedMonthContext"
import { EventListContext } from './hooks/EventListContext';

// hooks
import { useReactGa4 } from './hooks/useReactGa4';
import { useCloudWatchRum } from './hooks/useCloudWatchRum';

// const NoCard = () => {
//   return (
//     <div className="space-x-4 divide-x divide-gray-200 dark:divide-gray-700">
//       <Toast>
//         {/* <FaTelegramPlane className="h-5 w-5 text-blue-600 dark:text-blue-500" /> */}
//         <div className="pl-4 text-sm font-normal">
//           イベント情報が登録されていません。
//         </div>
//       </Toast>
//     </div>
//   );
// }

function getMonth(year:number, month:number) {
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day()
  let currentMonthCount = 0 - firstDayOfTheMonth
  const daysMatrix = new Array(6).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++
      return dayjs(new Date(year, month, currentMonthCount))
    })
  })

  return daysMatrix
}

function Home({ signOut }:any) {
  useReactGa4()
  useCloudWatchRum()

  const [createModalOpen, setCreateModalOpen] = useState(false)
  const toggleCreateModal = () => { setCreateModalOpen(!createModalOpen) }
  const [month, setMonth] = useState(dayjs(new Date()).format("YYYYMM"))
  const [eventList, setEventList] = useState<any>([])

  const calendar = getMonth(Number(month.substring(0, 4)), Number(month.substring(4, 6)) - 1)
  const selectedMonthLabel = dayjs(`${month}01`).format("YYYY年M月")

  return (
    <EventListContext.Provider value={ {eventList, setEventList} }>
    <SelectedMonthContext.Provider value={ {month, setMonth} }>
        <div className="App">
          {/* 登録フォームモーダル */}
          <ModalComponent
            modalOpen={ createModalOpen }
            onClose={ toggleCreateModal }>
            <CreateFormComponent />
          </ModalComponent>
          
          {/* ナビバー */}
          <NavbarComponent onClick={toggleCreateModal} signOut={signOut} />

          <main className="mx-auto flex min-h-screen w-full max-w-[1520px] flex-col px-3 pb-8 pt-4 md:px-5">
            <section className="mb-4 overflow-hidden rounded-[24px] border border-slate-200/80 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:rounded-[28px]">
              <div className="flex flex-col gap-4 border-b border-slate-200 bg-[linear-gradient(135deg,rgba(238,246,255,0.95),rgba(255,255,255,0.88))] px-4 py-5 sm:px-5 md:flex-row md:items-end md:justify-between md:px-7">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">
                    Hamamatsu City Event Guide
                  </p>
                  <h1 className="text-xl font-bold tracking-[0.02em] text-slate-900 sm:text-2xl md:text-3xl">
                    {selectedMonthLabel}のイベントカレンダー
                  </h1>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    浜松市内のイベントを、日付ごとに見やすく整理したカレンダー。
                    気になるイベントを選ぶと詳細情報を確認できる。
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:min-w-[260px]">
                  <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm">
                    <p className="text-xs font-medium tracking-[0.18em] text-slate-500">
                      EVENT COUNT
                    </p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">
                      {eventList.length}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm">
                    <p className="text-xs font-medium tracking-[0.18em] text-slate-500">
                      STATUS
                    </p>
                    <p className="mt-2 text-sm font-semibold text-emerald-700">
                      公開中
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      月ごとのイベントを一覧表示
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col px-2 py-3 sm:px-3 md:px-4 md:py-4">
                <CalendarComponent calendar={calendar}></CalendarComponent>
              </div>
            </section>
          </main>

          {/* { eventList.length === 0 &&
            <div className="flex justify-center my-32">
              <NoCard /> 
            </div>}
          
          {eventList.length > 0 &&
            // NOTE: 一番最後のカードがフッタに隠れてしまうため、mbを指定している
             <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mb-20 lg:mx-28">
              <CardListComponent />
            </div>} */}
          
          <FooterComponent />
        </div>
    </SelectedMonthContext.Provider>
    </EventListContext.Provider>
  );
}

// Note: 認証機能は一旦off
//  export default withAuthenticator(App);
export default Home;

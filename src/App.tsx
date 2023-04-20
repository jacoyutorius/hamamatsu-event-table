import React, { useState } from 'react';
import './App.css';
import "@aws-amplify/ui-react/styles.css";
// import { withAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from 'aws-amplify';
import dayjs from 'dayjs';

// components
import { Toast } from "flowbite-react"
import { NavbarComponent } from './components/Navbar';
import { ModalComponent } from './components/Modal';
import { CreateFormComponent } from "./components/CreateForm"
// import { CardListComponent } from './components/CardList';
import { CalendarComponent } from './components/Calendar';
import { FooterComponent } from './components/Footer';

// contexts
import { SelectedMonthContext } from "./hooks/SelectedMonthContext"
import { EventListContext } from './hooks/EventListContext';

// amplify config
import config from './aws-exports';

// clouswatch RUM
import { AwsRum, AwsRumConfig } from 'aws-rum-web';

try {
  const config: AwsRumConfig = {
    sessionSampleRate: 1,
    guestRoleArn: "arn:aws:iam::865422985541:role/RUM-Monitor-ap-northeast-1-865422985541-7532315671861-Unauth",
    identityPoolId: "ap-northeast-1:e2014572-68e5-48d5-be28-db1d5dc571e3",
    endpoint: "https://dataplane.rum.ap-northeast-1.amazonaws.com",
    telemetries: ["performance","errors","http"],
    allowCookies: true,
    enableXRay: false
  };

  const APPLICATION_ID: string = '8d9cac35-e51a-4bef-9f10-47f40a637565';
  const APPLICATION_VERSION: string = '1.0.0';
  const APPLICATION_REGION: string = 'ap-northeast-1';

  const awsRum: AwsRum = new AwsRum(
    APPLICATION_ID,
    APPLICATION_VERSION,
    APPLICATION_REGION,
    config
  );
} catch (error) {
  // Ignore errors thrown during CloudWatch RUM web client initialization
}

// NOTE: AmplifyにデプロイするとAppSync関連の設定情報が生成されない様子なので
//  環境変数から読み込んでAmplify.configureに渡すようにしている。
const GraphQlConfig: Object = {
  aws_appsync_graphqlEndpoint: process.env.REACT_APP_APPSYNC_GRAPHQLENDPOINT,
  aws_appsync_region: process.env.REACT_APP_APPSYNC_REGION,
  aws_appsync_authenticationType: process.env.REACT_APP_APPSYNC_AUTHENTICATIONTYPE,
  aws_appsync_apiKey: process.env.REACT_APP_APPSYNC_APIKEY
}

Amplify.configure(
  {
    ...config,
    ...GraphQlConfig
  }
)

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

function App({ signOut }: any) {
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const toggleCreateModal = () => { setCreateModalOpen(!createModalOpen) }
  const [month, setMonth] = useState(dayjs(new Date()).format("YYYYMM"))
  const [eventList, setEventList] = useState<any>([])

  const calendar = getMonth(Number(month.substring(0, 4)), Number(month.substring(4, 6)) - 1)

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

          <div className="h-screen flex flex-col mb-20 md:mx-2">
            <CalendarComponent calendar={calendar}></CalendarComponent>
          </div>

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

// export default withAuthenticator(App);
export default App;
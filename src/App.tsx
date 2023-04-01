import React, { useState, useEffect } from 'react';
import './App.css';
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  // Button,
  // Heading,
  // Image,
  // View,
  // Card,
} from "@aws-amplify/ui-react";
import { Amplify, API } from 'aws-amplify';
import * as queries from './graphql/queries';
import { GraphQLQuery } from '@aws-amplify/api';
import { AllQuery, HamamatsuEvents } from './API';
import { Pagination, Toast } from "flowbite-react"

// components
import { NavbarComponent } from './components/Navbar';
import { ModalComponent } from './components/Modal';
import { CreateFormComponent } from "./components/CreateForm"
import { CardListComponent } from './components/CardList';
import { FooterComponent } from './components/Footer';

// contexts
import { SelectedMonthContext } from "./hooks/SelectedMonthContext"
import { EventListContext } from './hooks/EventListContext';

import config from './aws-exports';
Amplify.configure(config);

const NoCard = () => {
  return (
    <div className="space-x-4 divide-x divide-gray-200 dark:divide-gray-700">
      <Toast>
        {/* <FaTelegramPlane className="h-5 w-5 text-blue-600 dark:text-blue-500" /> */}
        <div className="pl-4 text-sm font-normal">
          イベント情報が登録されていません。
        </div>
      </Toast>
    </div>
  );
}

function App({ signOut }: any) {
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const toggleCreateModal = () => { setCreateModalOpen(!createModalOpen) }
  const [month, setMonth] = useState("202304")
  const [eventList, setEventList] = useState([])

  // TODO:一旦APIコールを停止 ---- start ----
  // const [records, setRecords] = useState<HamamatsuEvents[]>([])
  // useEffect(() => {
  //   fetchRecords()
  // }, [])

  // async function fetchRecords() {
  //   const allRecords = await API.graphql<GraphQLQuery<AllQuery>>(
  //     { query: queries.all }
  //   );
  //   console.log(allRecords.data?.all.items);
  //   if (allRecords.data) {
  //     setRecords(allRecords.data.all.items);
  //   }
  // }
  // TODO:一旦APIコールを停止 ---- end ----

  return (
    <EventListContext.Provider value={ {eventList, setEventList} }>
    <SelectedMonthContext.Provider value={ {month, setMonth} }>
        <div className="App">
          {/* <Button onClick={signOut}>Sign Out</Button> */}

          {/* 登録フォームモーダル */}
          <ModalComponent
            modalOpen={ createModalOpen }
            onClose={ toggleCreateModal }>
            <CreateFormComponent />
          </ModalComponent>
          
          {/* ナビバー */}
          <NavbarComponent onClick={toggleCreateModal} />

          { eventList.length === 0 &&
            <div className="flex justify-center my-32">
              <NoCard /> 
            </div>}
          
          { eventList.length > 0 &&
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                <CardListComponent />
              </div>
              <div className="grid grid-cols-1 mb-20 ml-2 md:grid-cols-3 lg:grid-cols-4">
                <Pagination
                  currentPage={1}
                  layout="navigation"
                  totalPages={100}
                  showIcons={true}
                  onPageChange={ () => { "do nothing" }} />
            </div>
          </>}
          
          <FooterComponent />
        </div>
    </SelectedMonthContext.Provider>
    </EventListContext.Provider>

    // <View className="App">
    //   <Card>
    //     <Heading level={1}>We now have Auth!</Heading>
    //   </Card>

    //   {
    //     records.map(record => {
    //       return (
    //         <div>
    //           { record.Description }
    //         </div>
    //       )
    //     })
    //   }

    //   <Button onClick={signOut}>Sign Out</Button>
    // </View>
  );
}

export default withAuthenticator(App);
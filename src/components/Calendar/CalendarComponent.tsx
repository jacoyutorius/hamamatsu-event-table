import React, { useContext, useState, useEffect } from "react"
import dayjs from "dayjs"
import { CalendarDayComponent } from "./CalendarDayComponent"
import { EventListContext } from "../../hooks/EventListContext"
import { SelectedMonthContext } from "../../hooks/SelectedMonthContext"
import { ModalComponent } from "../Modal"
import { ContentFormComponent, ContentFormComponentProps } from "../ContentForm/ContentFormComponent"

// hooks
import { SelectedEventContext } from "../../hooks/SelectedEventContext"

// GraphQL
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import { GraphQLQuery } from '@aws-amplify/api';
import { GetOneQuery } from '../../API';

export type CalendarComponentProps = {
  calendar: any[]
}

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month - 1)
  const lastDay = new Date(year, month, 0)

  let list = []
  let next = firstDay;
  while (next.getTime() !== lastDay.getTime()) {
    list.push(next)
    next = new Date(next.getFullYear(), next.getMonth(), next.getDate() + 1)
  }

  return list
}

function getEventListByDay(eventList:any[], month:string) {
  const curYear = Number(month.substring(0, 4))
  const curMonth = Number(month.substring(4, 6))

  const monthDays = getMonthDays(curYear, curMonth)
  const list: any = {}

  monthDays.forEach((day:any) => {
    const yyyymmdd = dayjs(day).format("YYYY-MM-DD")
    let filtered = eventList.filter((event:any) => event?.StartedOn === yyyymmdd)
    list[yyyymmdd] = filtered
  })

  return list
}

const initialCardContent: ContentFormComponentProps = {
  index: 0,
  updatedAt: '',
  longitude: '',
  latitude: '',
  capacity: '',
  place: '',
  eventNameKana: '',
  startedAtNote: '',
  startedAt: '',
  childInformation: '',
  closingOn: '',
  openedAt: '',
  contact: '',
  priceDetail: '',
  importedAt: '',
  facilityNo: '',
  endedAt: '',
  price: '',
  tel: '',
  formula: '',
  eventName: '',
  key: '',
  code: 0,
  note: '',
  no: 0,
  city: '',
  parking: '',
  startedOn: '',
  eventNameEn: '',
  description: '',
  endedOn: '',
  url: '',
  prefecture: '',
  howToJoin: '',
  access: '',
  telExtention: '',
  district: '',
  closingAt: '',
  organizer: '',
  placeAddress: '',
  category: ''
}

export const CalendarComponent = ({ calendar }: CalendarComponentProps): JSX.Element => { 
  const { eventList } = useContext(EventListContext)
  const { month } = useContext(SelectedMonthContext)
  const [selectedCardContent, setSelectedCardContent] = useState(initialCardContent)
  
  const ret = getEventListByDay(eventList, month)

  // modal制御
  const [modalOpen, setModalOpen] = useState(false)
  const [eventKey, setEventKey] = useState("")

  const closeModal = () => {
    setModalOpen(false)
    setSelectedCardContent(initialCardContent)
  }

  // NOTE: カードがクリックされたときに、選択されたカードのindexより表示対象のデータを抽出して
  //  モーダル内のContentFormComponentに値をセットしてからモーダルを開く。
  const openModal = () => {
    setModalOpen(true)
  }

  useEffect(() => {
    const fetch = async () => {
      if (eventKey === null) return

      // console.log(eventKey)
      const record = await API.graphql<GraphQLQuery<GetOneQuery>>(
        graphqlOperation(queries.getOne, { Key: eventKey })
      );
      // console.log(record.data?.getOne)
      const event = record.data?.getOne

      setSelectedCardContent({
        ...initialCardContent,
        no: Number(event?.No),
        category: event?.Category || '',
        organizer: event?.Organizer || '',
        eventName: event?.EventName || '',
        place: event?.Place || '',
        placeAddress: event?.PlaceAddress || '',
        description: event?.Description || '',
        url: event?.Url || '',
        tel: event?.Tel || ''
      })
    }

    fetch()
  }, [eventKey])
  
  return (<SelectedEventContext.Provider value={ { eventKey, setEventKey } }>
    <div className="flex flex-1">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-7 grid-rows-6">
        {calendar.map((row:any, i:number) => { 
          return (<React.Fragment key={i}>
            {row.map((day: any, j: number) => {
              const dayYYYYMMDD = day.format("YYYY-MM-DD")
              let events = []
              if (ret[dayYYYYMMDD]) {
                events = ret[dayYYYYMMDD].map((row: any) => {
                  return {
                    key: row.Key,
                    eventName: row.EventName,
                    url: row.Url,
                    category: row.Category
                  }
                })
              }

              return (<CalendarDayComponent
                key={ j }
                day={ day }
                isFirstWeek={i === 0}
                events={ events }
                onClick={ openModal }/>)
            })}
          </React.Fragment>)
        }) } 
      </div>
    </div>

    {/* modal */}
    <ModalComponent
      modalOpen={ modalOpen }
      onClose={closeModal}
      title={ selectedCardContent.eventName }
    >
      <ContentFormComponent {...selectedCardContent} />
    </ModalComponent>
  </SelectedEventContext.Provider>)
}
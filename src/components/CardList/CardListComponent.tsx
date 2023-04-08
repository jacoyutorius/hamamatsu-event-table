import { useState, useContext } from "react"
import { CardComponent } from "../Card/CardComponent"
import { ModalComponent } from "../Modal/ModalComponent"
import { ContentFormComponent, ContentFormComponentProps } from "../ContentForm/ContentFormComponent"
import { EventListContext } from "../../hooks/EventListContext"

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

export const CardListComponent = (): JSX.Element => {
  const [contentModalOpen, setContentModalOpen] = useState(false)
  const [selectedCardContent, setSelectedCardContent] = useState(initialCardContent)
  const {eventList, setEventList} = useContext(EventListContext)

  // NOTE: カードがクリックされたときに、選択されたカードのindexより表示対象のデータを抽出して
  //  モーダル内のContentFormComponentに値をセットしてからモーダルを開く。
  const openContentModal = (index: number) => {
    const row = eventList[index]

    setSelectedCardContent({
      ...initialCardContent,
      index: index,
      no: Number(row.No),
      category: row.Category || '',
      organizer: row.Organizer || '',
      eventName: row.EventName || '',
      place: row.Place || '',
      placeAddress: row.PlaceAddress || '',
      description: row.Description || '',
      url: row.Url || '',
      tel: row.Tel || ''
    })
    setContentModalOpen(true)
  }
  const closeContentModal = () => { setContentModalOpen(false) }

  const cards = eventList.map((v, i) => {
    return <CardComponent key={i}
      category={v.Category || ''}
      eventName={v.EventName || v.OpenedAt || ''}
      description={v.Description || ''}
      startedOn={v.StartedOn || ''}
      place={v.Place || ''}
      placeAddress={v.PlaceAddress || ''}
      url={v.Url || ''}
      latitude={v.Latitude}
      longitude={v.Longitude}
      onClick={ () => { openContentModal(i) } }></CardComponent>
  })

  return (<>
    {/* コンテンツモーダル */}
    <ModalComponent
      modalOpen={ contentModalOpen }
      onClose={ closeContentModal }>
      <ContentFormComponent {...selectedCardContent} />
    </ModalComponent>
    
    {/* カード */}
    { cards }
  </>)
}
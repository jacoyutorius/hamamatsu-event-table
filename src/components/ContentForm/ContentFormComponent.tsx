import { Badge, Label } from "flowbite-react"

export type ContentFormComponentProps = {
  index: number,
  updatedAt: string,
  longitude: string,
  latitude: string,
  capacity: string,
  place: string,
  eventNameKana: string,
  startedAtNote: string,
  startedAt: string,
  childInformation: string,
  closingOn: string,
  openedAt: string,
  contact: string,
  priceDetail: string,
  importedAt: string,
  facilityNo: string,
  endedAt: string,
  price: string,
  tel: string,
  formula: string,
  eventName: string,
  key: string,
  code: number,
  note: string,
  no: number,
  city: string,
  parking: string,
  startedOn: string,
  eventNameEn: string,
  description: string,
  endedOn: string,
  url: string,
  prefecture: string,
  howToJoin: string,
  access: string,
  telExtention: string,
  district: string,
  closingAt: string,
  organizer: string,
  placeAddress: string,
  category: string
}

export const ContentFormComponent = ({ index, no, category, organizer, eventName, place, placeAddress, description, url, tel }: ContentFormComponentProps):JSX.Element => {
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Badge color="info">
          { category }
        </Badge>
      </div>
      <div>
        <div className="mb-2 block">
          <Label value="イベント名" />
        </div>
        { eventName }
      </div>
      <div>
        <div className="mb-2 block">
          <Label value="開催場所" />
        </div>
        { place }
      </div>
      <div>
        <div className="mb-2 block">
          <Label value="開催住所" />
        </div>
        { placeAddress }
      </div>
      <div>
        <div className="mb-2 block">
          <Label value="詳細" />
        </div>
        { description }
      </div>
      <div>
        <div className="mb-2 block">
          <Label value="URL" />
        </div>
        <a href={ url } target="_blank" rel="noopener noreferrer">{ url }</a>
      </div>
      <div>
        <div className="mb-2 block">
          <Label value="電話番号" />
        </div>
        <a href={`tel:${tel}`}>{ tel }</a>
      </div>
    </form>)
}
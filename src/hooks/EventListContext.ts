import { createContext } from "react"
import { HamamatsuEvents } from "../API"

// export type EventListType = {
//   UpdatedAt: string,
//   Longitude: number,
//   Latitude: number,
//   Capacity: string,
//   Place: string,
//   EventNameKana: string,
//   StartedAtNote: string,
//   StartedAt: string,
//   ChildInformation: string,
//   ClosingOn: string,
//   OpenedAt: string,
//   Contact: string,
//   PriceDetail: string,
//   ImportedAt: string,
//   FacilityNo: string,
//   EndedAt: string,
//   Price: string,
//   Tel: string,
//   Formula: string,
//   EventName: string,
//   Key: string,
//   Code: number,
//   Note: string,
//   No: number,
//   City: string,
//   Parking: string,
//   StartedOn: string,
//   EventNameEn: string,
//   Description: string,
//   EndedOn: string,
//   Url: string,
//   Prefecture: string,
//   HowToJoin: string,
//   Access: string,
//   TelExtension: string,
//   District: string,
//   ClosingAt: string,
//   Organizer: string,
//   PlaceAddress: string,
//   Category: string,
//   StartMonth: string
// }

export interface EventListContextType {
  // eventList: EventListType[],
  eventList: HamamatsuEvents[],
  setEventList: (list: HamamatsuEvents[]) => void
}

const defaultValue: EventListContextType = {
  eventList: [],
  setEventList: () => { }
}

export const EventListContext = createContext<EventListContextType>(defaultValue);
import { createContext } from "react"
import { HamamatsuEvents } from "../API"

export interface EventListContextType {
  eventList: HamamatsuEvents[],
  setEventList: (list: HamamatsuEvents[]) => void
}

const defaultValue: EventListContextType = {
  eventList: [],
  setEventList: () => { }
}

export const EventListContext = createContext<EventListContextType>(defaultValue);
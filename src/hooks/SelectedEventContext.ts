import { createContext } from "react"

export interface EventKeyContextType {
  eventKey: string,
  setEventKey: (eventKey: string) => void
}

const defaultValue: EventKeyContextType = {
  eventKey: "",
  setEventKey: () => {}
}

export const SelectedEventContext = createContext<EventKeyContextType>(defaultValue)
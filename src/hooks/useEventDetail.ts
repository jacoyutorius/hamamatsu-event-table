import { useContext, useEffect, useState } from 'react'
import { HamamatsuEvents } from '../API';
import { findEventByKey } from '../data/mockEvents';
import { EventListContext } from './EventListContext';

export const useEventDetail = () => {
  const [eventKey, setEventKey] = useState("")
  const [event, setEvent] = useState<HamamatsuEvents | undefined | null>(null)
  const { eventList } = useContext(EventListContext)

  useEffect(() => {
    if (!eventKey) {
      setEvent(null)
      return
    }

    setEvent(eventList.find((event) => event.Key === eventKey) ?? findEventByKey(eventKey))
  }, [eventKey, eventList])

  return {
    eventKey,
    setEventKey,
    event,
  }
}

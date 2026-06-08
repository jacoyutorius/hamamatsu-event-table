import { useEffect, useState } from 'react'
import { HamamatsuEvents } from '../API';
import { findEventByKey } from '../data/mockEvents';

export const useEventDetail = () => {
  const [eventKey, setEventKey] = useState("")
  const [event, setEvent] = useState<HamamatsuEvents | undefined | null>(null)

  useEffect(() => {
    if (!eventKey) {
      setEvent(null)
      return
    }

    setEvent(findEventByKey(eventKey))
  }, [eventKey])

  return {
    eventKey,
    setEventKey,
    event,
  }
}

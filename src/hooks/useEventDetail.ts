import { useEffect, useState } from 'react'
import { HamamatsuEvents } from '../API';
import { fetchEventByKey } from '../data/eventApi'

export const useEventDetail = () => {
  const [eventKey, setEventKey] = useState("")
  const [event, setEvent] = useState<HamamatsuEvents | undefined | null>(null)

  useEffect(() => {
    const loadEvent = async () => {
      if (!eventKey) {
        setEvent(null)
        return
      }

      try {
        const result = await fetchEventByKey(eventKey)
        setEvent(result ?? null)
      } catch (error) {
        console.error('Failed to load event detail from AppSync:', error)
        setEvent(null)
      }
    }

    loadEvent()
  }, [eventKey])

  return {
    eventKey,
    setEventKey,
    event,
  }
}

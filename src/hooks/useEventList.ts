import { useContext, useEffect } from 'react'

import { SelectedMonthContext } from './SelectedMonthContext'
import { EventListContext } from './EventListContext'
import { fetchEventsByMonth } from '../data/eventApi'

export const useEventList = () => {
  const { month, setMonth } = useContext(SelectedMonthContext)
  const { setEventList } = useContext(EventListContext)

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const events = await fetchEventsByMonth(month)
        setEventList(events)
      } catch (error) {
        console.error('Failed to load events from AppSync:', error)
        setEventList([])
      }
    }

    loadEvents()
  }, [month, setEventList])

  return {
    month,
    setMonth
  }
}

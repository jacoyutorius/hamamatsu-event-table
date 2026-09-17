import { useContext, useEffect } from 'react'

import { SelectedMonthContext } from './SelectedMonthContext'
import { EventListContext } from './EventListContext'
import { findEventsByMonth } from '../data/mockEvents';
import { fetchEventsByMonth, isAppSyncConfigured } from '../lib/appsyncClient';

export const useEventList = () => {
  const { month, setMonth } = useContext(SelectedMonthContext)
  const { setEventList } = useContext(EventListContext)

  useEffect(() => {
    let ignore = false

    const loadEvents = async () => {
      if (!isAppSyncConfigured) {
        setEventList(findEventsByMonth(month))
        return
      }

      try {
        const events = await fetchEventsByMonth(month)
        if (!ignore) setEventList(events)
      } catch (error) {
        console.error(error)
        if (!ignore) setEventList(findEventsByMonth(month))
      }
    }

    loadEvents()

    return () => {
      ignore = true
    }
  }, [month, setEventList])

  return {
    month,
    setMonth
  }
}

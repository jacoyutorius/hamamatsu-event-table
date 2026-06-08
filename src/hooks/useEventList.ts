import { useContext, useEffect } from 'react'

import { SelectedMonthContext } from './SelectedMonthContext'
import { EventListContext } from './EventListContext'
import { findEventsByMonth } from '../data/mockEvents';

export const useEventList = () => {
  const { month, setMonth } = useContext(SelectedMonthContext)
  const { setEventList } = useContext(EventListContext)

  useEffect(() => {
    setEventList(findEventsByMonth(month))
  }, [month, setEventList])

  return {
    month,
    setMonth
  }
}

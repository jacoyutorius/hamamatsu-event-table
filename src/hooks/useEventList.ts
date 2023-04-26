import { useContext, useEffect } from 'react'

import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../graphql/queries';
import { GraphQLQuery } from '@aws-amplify/api';
import { QueryByMonthQuery } from '../API';

import { SelectedMonthContext } from './SelectedMonthContext'
import { EventListContext } from './EventListContext'

// NOTE: とりあえず最大200レコード取得するようにしている。
// TODO: ほんとうはページネーションとかしたほうがいいのだが。
const LIMIT = 200

export const useEventList = () => {
  const { month, setMonth } = useContext(SelectedMonthContext)
  const { setEventList } = useContext(EventListContext)

  useEffect(() => {
    const fetch = async () => {
      const records = await API.graphql<GraphQLQuery<QueryByMonthQuery>>(
        graphqlOperation(queries.queryByMonth, { month, LIMIT })
      );
      const list = records.data?.queryByMonth.items;
      console.log(month, `${list?.length} events`)

      if (list) {
        setEventList(list)
      }
    }
    fetch()
  }, [month])

  return {
    month,
    setMonth
  }
}
import { useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../graphql/queries';
import { GraphQLQuery } from '@aws-amplify/api';
import { GetOneQuery, HamamatsuEvents } from '../API';

export const useEventDetail = () => {
  const [eventKey, setEventKey] = useState("")
  const [event, setEvent] = useState<HamamatsuEvents | undefined | null>(null)

  useEffect(() => {
    const fetch = async () => {
      if (eventKey === null) return

      const record = await API.graphql<GraphQLQuery<GetOneQuery>>(
        graphqlOperation(queries.getOne, { Key: eventKey })
      );
      setEvent(record.data?.getOne)
    }

    fetch()
  }, [eventKey])

  return {
    eventKey,
    setEventKey,
    event,
  }
}
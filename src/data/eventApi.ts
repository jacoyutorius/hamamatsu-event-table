import { generateClient } from 'aws-amplify/data';
import type { HamamatsuEvents } from '../API';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

export const fetchEventsByMonth = async (month: string): Promise<HamamatsuEvents[]> => {
  const { data, errors } = await client.models.HamamatsuEvents.list();

  if (errors?.length) {
    throw new Error(errors.map((error) => error.message).join(', '));
  }

  return (data ?? []).filter((event) => event.StartMonth === month) as HamamatsuEvents[];
};

export const fetchEventByKey = async (eventKey: string): Promise<HamamatsuEvents | null> => {
  const { data, errors } = await client.models.HamamatsuEvents.get({ Key: eventKey });

  if (errors?.length) {
    throw new Error(errors.map((error) => error.message).join(', '));
  }

  return (data ?? null) as HamamatsuEvents | null;
};

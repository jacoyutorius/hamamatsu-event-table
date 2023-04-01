import React, { useState, useEffect } from 'react';
import './App.css';
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";
import { Amplify, API } from 'aws-amplify';
import * as queries from './graphql/queries';
import { GraphQLQuery } from '@aws-amplify/api';
import { AllQuery, HamamatsuEvents } from './API';

import config from './aws-exports';
Amplify.configure(config);

function App({ signOut }: any) {
  const [records, setRecords] = useState<HamamatsuEvents[]>([])

  useEffect(() => {
    fetchRecords()
  }, [])

  async function fetchRecords() {
    const allRecords = await API.graphql<GraphQLQuery<AllQuery>>(
      { query: queries.all }
    );
    console.log(allRecords.data?.all.items);

    if (allRecords.data) {
      setRecords(allRecords.data.all.items);
    }
  }

  return (
    <View className="App">
      <Card>
        <Heading level={1}>We now have Auth!</Heading>
      </Card>

      {
        records.map(record => {
          return (
            <div>
              { record.Description }
            </div>
          )
        })
      }

      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
}

export default withAuthenticator(App);
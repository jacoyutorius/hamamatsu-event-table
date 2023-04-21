import React, { useContext, useEffect } from "react"
import { Navbar, Button, Dropdown } from "flowbite-react"
import { SelectedMonthContext } from "../../hooks/SelectedMonthContext"
import { EventListContext } from "../../hooks/EventListContext"

import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import { GraphQLQuery } from '@aws-amplify/api';
import { QueryByMonthQuery } from '../../API';

export type NavbarComponentProps = {
  onClick: () => void,
  signOut: any
}

const months = [
  "202301",
  "202302",
  "202303",
  "202304",
  "202305",
  "202306",
  "202307",
  "202308",
  "202309",
  "202310",
  "202311",
  "202312",
]

const dropdownItems = (setMonth: any): any => {
  return months.map(month => {
    return (
      <Dropdown.Item onClick={() => setMonth(month) }>
        {month}
      </Dropdown.Item>  
    )
  })
}

export const NavbarComponent = (props: NavbarComponentProps): JSX.Element => {
  const { month, setMonth } = useContext(SelectedMonthContext)
  const { setEventList } = useContext(EventListContext)

  // NOTE: とりあえず最大200レコード取得するようにしている。
  // TODO: ほんとうはページネーションとかしたほうがいいのだが。
  const limit = 200

  useEffect(() => {
    const fetch = async () => {
      const records = await API.graphql<GraphQLQuery<QueryByMonthQuery>>(
        graphqlOperation(queries.queryByMonth, { month, limit })
      );
      const list = records.data?.queryByMonth.items;
      console.log(month, `${list?.length} events`)

      if (list) {
        setEventList(list)
      }
    }
    fetch()
  }, [month])

  return (
    <Navbar
      className="sticky top-0"
      fluid={true}
      rounded={true}
    >
      <Navbar.Brand href="/">
        <img
          src="logo.png"
          className="mr-3 h-6 sm:h-9"
          alt="Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          浜松市イベントカレンダー
        </span>
      </Navbar.Brand>
      <div className="flex gap-x-1 md:order-2">
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Dropdown
          label={month}
          inline={true}
          theme={{ inlineWrapper: "flex items-center text-base text-gray-800" }}
          dismissOnClick={true}>
          { dropdownItems(setMonth) }
        </Dropdown>
      </Navbar.Collapse>
    </Navbar>
  )
}
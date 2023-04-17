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
  "202210",
  "202211",
  "202212",
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
  // TODO: ほんとうはページネーションしたほうがいいのだが。
  const limit = 200

  useEffect(() => {
    const fetch = async () => {
      const records = await API.graphql<GraphQLQuery<QueryByMonthQuery>>(
        graphqlOperation(queries.queryByMonth, { month, limit })
      );
      const list = records.data?.queryByMonth.items;
      console.log(month,`${list?.length} events`)
      // console.log(list?.[0])

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
        {/* <a className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
           onClick={ props.signOut }>SignOut</a> */}
        {/* <Button onClick={ props.onClick }>
          Show Modal
        </Button>
        <Button>
          Get started
        </Button> */}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {/* <Navbar.Link href="/">
          About
        </Navbar.Link>
        <Navbar.Link href="/">
          Services
        </Navbar.Link> */}
        <Dropdown
          label={month}
          inline={true}
          theme={{ inlineWrapper: "flex items-center text-gray-700" }}
          dismissOnClick={true}>
          { dropdownItems(setMonth) }
        </Dropdown>
      </Navbar.Collapse>
    </Navbar>
  )
}
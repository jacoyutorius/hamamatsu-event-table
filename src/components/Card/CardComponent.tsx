import { Card, Badge } from "flowbite-react"

export type CardComponentProps = {
  eventName: string,
  description: string,
  startedOn: string,
  place: string,
  placeAddress: string,
  url: string,
  category: string,
  latitude: string | null | undefined,
  longitude: string | null | undefined,
  onClick: any
}

export const CardComponent = (props: CardComponentProps): JSX.Element => {
  const isMapExist = props.latitude && props.longitude

  let mapUrl = ""
  if (isMapExist) {
    mapUrl = `https://www.google.com/maps?q=${props.latitude},${props.longitude}`
  }

  const mapLink = (<a href={mapUrl} target="_blank" rel="noreferrer noopener">
            <svg className="w-6 h-6 dark:text-white inline" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"></path>
            </svg>
            <span className="text-base text-gray-900 dark:text-white">{props.place}</span>
          </a>)

  return (
    <div className="max-w-none p-2">
      <Card className="h-full">
        <div className="flex flex-wrap gap-2">
          <h1>{ props.startedOn }</h1>
        </div>
        
        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          <a href="#" onClick={ props.onClick }>{props.eventName}</a>
        </h5>
        <p>
          { isMapExist && mapLink }
          { props.placeAddress && ` (${props.placeAddress})` }
        </p>
         <div className="flex flex-wrap gap-2">
          <Badge color="info">
            { props.category }
          </Badge>
        </div>

        <p className="font-normal text-sm text-gray-700 text-clip dark:text-gray-400">
          {props.description}
        </p>
      </Card>
    </div>
  )
}
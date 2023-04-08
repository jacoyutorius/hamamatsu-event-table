import { Card, Badge } from "flowbite-react"

export type CardComponentProps = {
  eventName: string,
  description: string,
  startedOn: string,
  place: string,
  placeAddress: string,
  url: string,
  category: string,
  onClick: any
}

export const CardComponent = (props: CardComponentProps):JSX.Element => {
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
          {props.place}
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
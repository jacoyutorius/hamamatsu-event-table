import { HamamatsuEvents } from "../../API"

export type EventContentsComponentProps = {
  event: HamamatsuEvents | undefined | null
}

export const EventContentsComponent = ({ event }: EventContentsComponentProps): JSX.Element => {
  const isMapExist = event?.Latitude && event?.Longitude

  let mapUrl = ""
  if (isMapExist) {
    mapUrl = `https://www.google.com/maps?q=${event?.Latitude},${event?.Longitude}`
  }

  const mapLink = (<a href={mapUrl} target="_blank" rel="noreferrer noopener">
            <svg className="w-6 h-6 dark:text-white inline" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"></path>
            </svg>
            <span className="text-base text-gray-900 dark:text-white">{event?.Place}</span>
          </a>)
  
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-base text-left text-gray-800 dark:text-gray-400">
        <tbody>
          <tr className="bg-white border-b">
            <th scope="row" className="text-right md:px-6 py-4 font-medium whitespace-nowrap">
              イベント名
            </th>
            <td className="px-6 py-4">
              <ruby>
              { event?.EventName}
              <rt>{ event?.EventNameKana }</rt>
              </ruby>
            </td>
          </tr>
          <tr className="bg-white border-b">
            <th scope="row" className="text-right md:px-6 py-4 font-medium whitespace-nowrap">
              カテゴリー
            </th>
            <td className="px-6 py-4">
              { event?.Category }
            </td>
          </tr>
          <tr className="bg-white border-b">
            <th scope="row" className="text-right md:px-6 py-4 font-medium whitespace-nowrap">
              詳細
            </th>
            <td className="px-6 py-4">
              { event?.Description }
            </td>
          </tr>
          <tr className="bg-white border-b">
            <th scope="row" className="text-right md:px-6 py-4 font-medium whitespace-nowrap">
              場所
            </th>
            <td className="px-6 py-4">
              { isMapExist && mapLink }
              { event?.PlaceAddress && ` (${event?.PlaceAddress})` }
            </td>
          </tr>
          <tr className="bg-white border-b">
            <th scope="row" className="text-right md:px-6 py-4 font-medium whitespace-nowrap">
              料金
            </th>
            <td className="px-6 py-4">
              { event?.PriceDetail }
            </td>
          </tr>
          <tr className="bg-white border-b">
            <th scope="row" className="text-right md:px-6 py-4 font-medium whitespace-nowrap">
              申し込み
            </th>
            <td className="px-6 py-4">
              { event?.HowToJoin }
            </td>
          </tr>
          <tr className="bg-white border-b">
            <th scope="row" className="text-right md:px-6 py-4 font-medium whitespace-nowrap">
              URL
            </th>
            <td className="px-6 py-4">
              {
                event?.Url && (<a href={event?.Url || ''} target="_blank" rel="noopener noreferrer">
                  <svg
                    className="inline w-6 h-6 mr-2 dark:text-white"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path>
                  </svg>
                  {event?.Url}
                </a>)
              }
            </td>
          </tr>
          <tr className="bg-white border-b">
            <th scope="row" className="text-right md:px-6 py-4 font-medium whitespace-nowrap">
              電話番号
            </th>
            <td className="px-6 py-4">
              { event?.Tel && (<a href={`tel:${event?.Tel}`}>
                <svg
                  className="inline w-6 h-6 mr-2 dark:text-white"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"></path></svg>
                {event?.Tel}
              </a>) }
            </td>
          </tr>
        </tbody>
      </table>
    </div>)
}
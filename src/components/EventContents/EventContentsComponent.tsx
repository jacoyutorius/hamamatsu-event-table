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

  const mapLink = (<a className="inline-flex items-start gap-2 text-sky-700 transition hover:text-sky-900" href={mapUrl} target="_blank" rel="noreferrer noopener">
            <svg className="inline h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"></path>
            </svg>
            <span className="text-base leading-6 text-slate-800">
              {event?.Place}
              { event?.PlaceAddress && ` (${event?.PlaceAddress})` }
            </span>
          </a>)

  const rows = [
    { label: "カテゴリー", value: event?.Category || "-" },
    { label: "詳細", value: event?.Description || "-" },
    { label: "場所", value: isMapExist ? mapLink : (event?.Place || "-") },
    { label: "料金", value: event?.PriceDetail || "-" },
    { label: "申し込み", value: event?.HowToJoin || "-" },
    {
      label: "URL",
      value: event?.Url ? (
        <a className="break-all text-sky-700 transition hover:text-sky-900" href={event.Url} target="_blank" rel="noopener noreferrer">
          {event.Url}
        </a>
      ) : "-"
    },
    {
      label: "電話番号",
      value: event?.Tel ? (
        <a className="text-sky-700 transition hover:text-sky-900" href={`tel:${event.Tel}`}>
          {event.Tel}
        </a>
      ) : "-"
    },
  ]
  
  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
          Event Overview
        </p>
        <h3 className="text-2xl font-bold text-slate-900">
          {event?.EventName}
        </h3>
        {event?.EventNameKana && (
          <p className="mt-1 text-sm text-slate-500">
            {event.EventNameKana}
          </p>
        )}
      </section>

      <dl className="space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="grid gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-4 md:grid-cols-[140px_minmax(0,1fr)] md:gap-4">
            <dt className="text-sm font-semibold tracking-[0.08em] text-slate-500">
              {row.label}
            </dt>
            <dd className="text-sm leading-7 text-slate-800">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>)
}

import { Link } from "react-router-dom"
import { Footer } from "flowbite-react"

export const FooterComponent = (): JSX.Element => {
  return (
    <Footer container={true} className="mx-auto mt-4 w-full max-w-[1520px] border-t border-slate-200/80 bg-transparent px-4 pb-6 pt-2 text-slate-500 md:px-5">
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Footer.Copyright
          href="https://twitter.com/jacoyutorius"
          by="@jacoyutorius"
          year={2023}
        />
        <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
          <Link to="/" className="transition hover:text-sky-700">
            カレンダー
          </Link>
          <Link to="/about/" className="transition hover:text-sky-700">
            このサイトについて
          </Link>
        </div>
      </div>
    </Footer>
  )
}

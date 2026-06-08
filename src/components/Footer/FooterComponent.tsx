import { Footer } from "flowbite-react"

export const FooterComponent = (): JSX.Element => {
  return (
    <Footer container={true} className="mx-auto mt-4 w-full max-w-[1520px] border-t border-slate-200/80 bg-transparent px-4 pb-6 pt-2 text-slate-500 md:px-5">
      <Footer.Copyright
        href="https://twitter.com/jacoyutorius"
        by="@jacoyutorius"
        year={2023}
      />
      {/* <Footer.LinkGroup>
        <Footer.Link href="#">
          About
        </Footer.Link>
        <Footer.Link href="#">
          Privacy Policy
        </Footer.Link>
        <Footer.Link href="#">
          Licensing
        </Footer.Link>
        <Footer.Link href="#">
          Contact
        </Footer.Link>
      </Footer.LinkGroup> */}
    </Footer>
  )
}

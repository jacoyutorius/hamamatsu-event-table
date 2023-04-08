import { Footer } from "flowbite-react"

export const FooterComponent = (): JSX.Element => {
  return (
    <Footer container={true} className="fixed bottom-0 left-0 z-20">
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
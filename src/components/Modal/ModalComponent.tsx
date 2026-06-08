import { Modal } from "flowbite-react"

export type ModalComponentProps = {
  modalOpen: boolean,
  onClose: () => void,
  title?: string,
  children: React.ReactNode
}

export const ModalComponent = (props: ModalComponentProps): JSX.Element => {  
  return (
    <Modal
      className="backdrop-blur-sm px-2 sm:px-4"
      dismissible
      show={ props.modalOpen }
      onClose={ props.onClose }
      size="4xl"
    >
      <Modal.Header className="border-b border-slate-200 bg-slate-50/80 px-4 py-3 sm:px-6">
        { props.title }
      </Modal.Header>
      <Modal.Body className="bg-white px-4 py-4 sm:px-6 sm:py-5">
        { props.children }
      </Modal.Body>
    </Modal>
  )
}

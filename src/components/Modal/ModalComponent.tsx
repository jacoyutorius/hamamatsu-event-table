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
      className="backdrop-blur-sm"
      dismissible
      show={ props.modalOpen }
      onClose={ props.onClose }
      size="4xl"
    >
      <Modal.Header className="border-b border-slate-200 bg-slate-50/80">
        { props.title }
      </Modal.Header>
      <Modal.Body className="bg-white">
        { props.children }
      </Modal.Body>
    </Modal>
  )
}

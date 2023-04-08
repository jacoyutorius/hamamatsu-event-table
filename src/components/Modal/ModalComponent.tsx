import { Modal } from "flowbite-react"

export type ModalComponentProps = {
  modalOpen: boolean,
  onClose: () => void,
  children: React.ReactNode
}

export const ModalComponent = (props: ModalComponentProps): JSX.Element => {  
  return (
    <Modal
      show={ props.modalOpen }
      onClose={ props.onClose }
      size="4xl"
    >
      <Modal.Header>
        <h2 className="text-x2">イベント詳細</h2>
      </Modal.Header>
      <Modal.Body>
        { props.children }
      </Modal.Body>
    </Modal>
  )
}
interface ModalProps {
  modalOpen: boolean
  setModalOpen: (open: boolean) => boolean | void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
  return (
    <div data-testid="modal-container" className={`modal ${modalOpen ? "modal-open" : ""}`}>
      <div className='modal-box relative'>
        <label
          onClick={() => setModalOpen(false)}
          className='btn btn-neutral btn-sm btn-circle absolute right-2 top-2'
        >
          ✕
        </label>
        {children}
      </div>
    </div>
  )
}

export default Modal

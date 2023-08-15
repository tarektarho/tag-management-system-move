// This is an interface that defines the props expected by the Modal component.
interface ModalProps {
  modalOpen: boolean // Whether the modal should be open or not.
  setModalOpen: (open: boolean) => boolean | void // A function to toggle the modal's open state.
  children: React.ReactNode // The content that will be rendered inside the modal.
}

// This is a functional component named Modal that takes in the defined props.
const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
  // The component returns JSX to render the modal.
  return (
    <div data-testid="modal-container" className={`modal ${modalOpen ? "modal-open" : ""}`}>
      {/* The modal box containing the content */}
      <div className='modal-box relative'>
        {/* A button-like label that when clicked, closes the modal */}
        <label
          onClick={() => setModalOpen(false)}
          className='btn btn-neutral btn-sm btn-circle absolute right-2 top-2'
        >
          ✕ {/* Close icon */}
        </label>
        {children} {/* Render the content passed as children */}
      </div>
    </div>
  )
}

// Export the Modal component to make it available for other parts of the application.
export default Modal

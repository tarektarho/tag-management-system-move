import { fireEvent, render, screen } from "@testing-library/react"
import Modal from "../Modal"


describe("Modal", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders the modal when modalOpen is true", () => {
    // Create a mock function for setModalOpen
    const mockSetModalOpen = jest.fn()
    const modalOpen = true
    const children = <div>Modal Content</div>
    render(
      <Modal modalOpen={modalOpen} setModalOpen={mockSetModalOpen}>
        {children}
      </Modal>
    )

    // Check if the modal is rendered
    const modalElement = screen.getByTestId("modal-container")
    expect(modalElement).toBeInTheDocument()

    // Check if the modal content is rendered
    const modalContent = screen.getByText("Modal Content")
    expect(modalContent).toBeInTheDocument()

    // Simulate clicking the close button
    const closeButton = screen.getByText('✕')
    fireEvent.click(closeButton)

    // Check if the setModalOpen function was called with false
    expect(mockSetModalOpen).toHaveBeenCalledWith(false)
  })

  it("does not render the modal when modalOpen is false", () => {
    // Create a mock function for setModalOpen
    const mockSetModalOpen = jest.fn()
    const modalOpen = false
    const children = <div>Modal Content</div>

    render(<Modal modalOpen={modalOpen} setModalOpen={mockSetModalOpen}>
      {children}
    </Modal>)
  })

  // Check if the modal is not rendered
  const modalElement = screen.queryByRole("dialog") // using queryByRole since it return null
  expect(modalElement).toBeNull()

  // Check if the modal content is not rendered
  const modalContentElement = screen.queryByText('Modal Content')
  expect(modalContentElement).toBeNull()

})

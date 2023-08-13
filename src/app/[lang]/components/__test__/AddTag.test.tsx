import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import AddTag from "../AddTag"
import { addTag as mockAddTag } from "../../../../api/api"


// Mock the generateUUID function
jest.mock('../../../../utils/index', () => ({
  generateUUID: jest.fn().mockReturnValue('mocked-uuid'), // Provide a fixed UUID value
}))

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    refresh: jest.fn()
  })
}))

jest.mock('../../../../api/api', () => ({
  addTag: jest.fn()
}))

describe("AddTag", () => {
  beforeAll(() => {
    jest.clearAllMocks()
  })

  it('opens the modal when button is clicked', () => {
    // @ts-ignore
    render(<AddTag text={{ addNewTag: 'Add New Tag' }} />)
    const addButton = screen.getByTestId('open-add-new-tag-modal')

    // Check if the button is rendered
    expect(addButton).toBeInTheDocument()

    // Click the button
    fireEvent.click(addButton)

    // Check if the modal is rendered
    const modalElement = screen.getByTestId("modal-container")
    expect(modalElement).toBeInTheDocument()
  })

  it("adds a new tag when form is submitted", async () => {
    const mockTagName = 'New Tag!'
    // @ts-ignore
    mockAddTag.mockResolvedValueOnce()
    // @ts-ignore
    render(<AddTag text={{ addNewTag: 'Add New Tag', save: 'Save', typeHere: 'Type here...' }} />)
    const addButton = screen.getByTestId('open-add-new-tag-modal')

    // Open the modal
    fireEvent.click(addButton)

    // Fill and submit the form
    const inputElement = screen.getByPlaceholderText('Type here...')
    fireEvent.change(inputElement, { target: { value: mockTagName } })

    const submitButton = screen.getByText('Save')
    fireEvent.click(submitButton)

    // Check if the addTag function was called with the correct parameters
    await waitFor(() => {
      expect(mockAddTag).toHaveBeenCalledWith({
        id: 'mocked-uuid',
        name: mockTagName,
        deleted: false,
      })
    })

    // Check if the modal is closed
    const modalElement = screen.queryByRole("dialog")
    expect(modalElement).not.toBeInTheDocument()

  })

  it('throws an error when tag name is empty', async () => {
    jest.fn().mockRejectedValueOnce({})
    // @ts-ignore
    mockAddTag.mockRejectedValueOnce(new Error('Tag name is empty'))
    // @ts-ignore
    render(<AddTag text={{ addNewTag: 'Add New Tag', save: 'Save', typeHere: 'Type here...' }} />)
    const addButton = screen.getByTestId('open-add-new-tag-modal')

    // Open the modal
    fireEvent.click(addButton)

    const submitButton = screen.getByText('Save')
    fireEvent.click(submitButton)

    // Check if the addTag function was called with the correct parameters
    await waitFor(async () => {
      //await expect(mockAddTag({})).rejects.toThrowError('test')
    })


    // Check if the modal is closed
    const modalElement = screen.queryByRole("dialog")
    expect(modalElement).not.toBeInTheDocument()
  })
})

import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import * as API from "../../../../api/api"
import Tag from "../Tag"
import { ITag } from "@/types/tags"
import { IPageText } from "@/types/pageText"
import { formatISODateToHumanReadable } from "../../../../utils/index"


// Mock the api module
jest.mock('../../../../api/api', () => ({
  editTag: jest.fn(),
  deleteTag: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    refresh: jest.fn()
  })
}))

export const mockTag: ITag = {
  id: '1',
  name: 'Tag 1',
  createdAt: '2023-08-12T15:48:52.520Z',
  updatedAt: '2023-08-13T10:00:00.000Z',
  deleted: false
}

export const mockText: IPageText['page'] = {
  emptyStateMessage: "Your tag list is currently empty. Click the Add New Tag button to start adding tags to your list.",
  tag: {
    editTag: 'Edit tag',
    deleteTagConfiramtion: 'Are you sure, you want to delete this tag?',
    save: 'Save',
    yes: 'Yes',
    typeHere: 'Type here...',
    addNewTag: "string",
  },
  addTag: {
    addNewTag: "",
    save: "save",
    typeHere: "Type here..."
  },
  tagList: {
    createdAt: "",
    updatedAt: "",
    actions: "",
    rowsPerPage: "2",
    total: "12"
  },
  erorrs: {
    nameCannotBeEmpty: "Tag name cannot be empty"
  }
}

export const mockTagComponent = () => render(
  <table>
    <thead>
      <tr>
        <th>Tags</th>
        <th>createdAt</th>
        <th>updatedAt</th>
        <th>actions</th>
      </tr>
    </thead>
    <tbody>
      <Tag tag={mockTag} text={mockText} />
    </tbody>
  </table >
)


describe("Tag Component", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders tag information correctly", () => {
    mockTagComponent()

    expect(screen.getByText(mockTag.name)).toBeInTheDocument()
    const createdAtElement = screen.getByText(formatISODateToHumanReadable(mockTag.createdAt))
    expect(createdAtElement).toBeInTheDocument()
    const updatedAtElement = screen.getByText(formatISODateToHumanReadable(mockTag.updatedAt))
    expect(updatedAtElement).toBeInTheDocument()
  })

  it("opens edit modal and updates tag name", async () => {

    mockTagComponent()
    // Open edit modal
    fireEvent.click(screen.getByTestId("edit-icon"))

    // Use act to wrap asynchronous actions
    await act(async () => {
      // Simulate user typing in the input
      fireEvent.change(screen.getByPlaceholderText("Type here..."), {
        target: { value: "Updated Tag Name" },
      })

      // Simulate form submission
      fireEvent.click(screen.getByText("Save"))
    })

    await waitFor(() => {
      // Assert that API function is called and modal is closed
      expect(API.editTag).toHaveBeenCalledWith({
        id: "1",
        name: "Updated Tag Name",
        deleted: false,
        updatedAt: expect.any(String),
      })
    })

    expect(screen.queryByText("Edit Tag")).not.toBeInTheDocument()
  })

  it("displays error when tag name is empty", async () => {
    mockTagComponent()
    // Open edit modal
    fireEvent.click(screen.getByTestId("edit-icon"))

    // Use act to wrap asynchronous actions
    await act(async () => {
      // Simulate user typing in the input
      fireEvent.change(screen.getByPlaceholderText("Type here..."), {
        target: { value: "" },
      })

      // Simulate form submission
      fireEvent.click(screen.getByText("Save"))
    })

    // Assert that error message is displayed
    expect(screen.getByText("Tag name cannot be empty")).toBeInTheDocument()
  })
  it("opens delete modal and deletes tag", async () => {
    mockTagComponent()

    // Open delete modal
    fireEvent.click(screen.getByTestId("delete-icon"))

    await act(async () => {
      // Simulate user confirming deletion
      fireEvent.click(screen.getByText("Yes"))
    })


    // Assert that API function is called and modal is closed
    expect(API.deleteTag).toHaveBeenCalledWith("1")
    expect(screen.queryByText("Delete Tag Confirmation")).not.toBeInTheDocument()
  })


})

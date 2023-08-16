import { fireEvent, render, screen } from "@testing-library/react"
import TagList, { ITEMS_PER_PAGE } from "../TagList"
import { mockTag, mockText } from "./Tag.test"
import { ITag } from "@/types/tags"
import Tag from "../Tag"

// Mock the useRouter function
jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    refresh: jest.fn(),
  }),
}))

// Mock the api module
jest.mock("../../../../api/api", () => ({
  getAllTags: jest.fn(),
  editTag: jest.fn(),
  deleteTag: jest.fn(),
}))

// Create mock tags data
const mockTags: ITag[] = [...Array(ITEMS_PER_PAGE)].map((_, i) => ({
  id: `${i + 1}`,
  name: `Tag ${i + 1}`,
  createdAt: "2023-08-12T15:48:52.520Z",
  updatedAt: "2023-08-13T10:00:00.000Z",
  deleted: false,
}))

// Function to render the mocked TagList component
const mockedTagListComponent = () =>
  render(
    // @ts-ignore
    <TagList tags={mockTags} text={mockText}>
      <Tag tag={mockTag} text={mockText}></Tag>
    </TagList>
  )

describe("TagList component", () => {

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it("renders tags and pagination controls correctly", () => {
    // Render the mocked TagList component
    mockedTagListComponent()

    // Check if tags are rendered correctly
    for (const tag of mockTags) {
      expect(screen.getByText(tag.name)).toBeInTheDocument()
    }

    // Click on pagination controls and check if active class is applied correctly
    const paginationButtons = screen.getAllByTestId("pagination-button")
    for (let i = 1; i <= Math.ceil(mockTags.length / ITEMS_PER_PAGE); i++) {
      fireEvent.click(paginationButtons[i - 1])
      expect(paginationButtons[0]).toHaveClass("active")
    }
  })

  it("displays correct row count per page", () => {
    // Render the mocked TagList component
    mockedTagListComponent()
    const tableRows = screen.queryAllByRole("row")
    expect(tableRows).toHaveLength(ITEMS_PER_PAGE + 1) // Including the table header
  })

  it('displays correct total count', () => {
    // Render the mocked TagList component
    mockedTagListComponent()
    const totalText = screen.getByTestId('pagination-footer')
    expect(totalText).toBeInTheDocument()
  })

  it('hides pagination buttons if there are no tags', () => {
    // Render TagList with empty tags
    render(<TagList tags={[]} text={mockText} />)
    const paginationButtons = screen.queryAllByTestId('pagination-button')
    expect(paginationButtons).toHaveLength(0)
  })

})

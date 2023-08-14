import { fireEvent, render, screen } from "@testing-library/react"
import TagList, { ITEMS_PER_PAGE } from "../TagList"
import { mockTag, mockText } from "./Tag.test"
import { ITag } from "@/types/tags"
import Tag from "../Tag"

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

const mockTags: ITag[] = [...Array(ITEMS_PER_PAGE)].map((_, i) => ({
  id: `${i + 1}`,
  name: `Tag ${i + 1}`,
  createdAt: "2023-08-12T15:48:52.520Z",
  updatedAt: "2023-08-13T10:00:00.000Z",
  deleted: false,
}))

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
    mockedTagListComponent()
    const tableRows = screen.queryAllByRole("row")
    expect(tableRows).toHaveLength(ITEMS_PER_PAGE + 1) // Including the table header
  })


  it.skip('displays correct total count', () => {
    mockedTagListComponent()
    const totalText = screen.getByText(`Total: ${mockTags.length}`)
    expect(totalText).toBeInTheDocument()
  })

  it('hides pagination buttons if there are no tags', () => {
    render(<TagList tags={[]} text={mockText} />)
    const paginationButtons = screen.queryAllByTestId('pagination-button')
    expect(paginationButtons).toHaveLength(0)
  })

})

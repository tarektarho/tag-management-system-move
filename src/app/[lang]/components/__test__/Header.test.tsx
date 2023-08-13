import { render, screen } from "@testing-library/react"
import Header from "../Header"

// Mock the 'LocaleSwitcher' component for the test
jest.mock('../LocaleSwitcher', () => ({
  // Ensure that the mocked module acts like an ES module
  __esModule: true,
  // Mock the default export of 'LocaleSwitcher' to return a function
  default: jest.fn().mockReturnValue(<div data-testid="mocked-locale-switcher" />),
}))

// Start describing the test suite for the 'Header' component
describe('Header Component', () => {
  // Define a test case within the suite
  it('renders the header with title and LocaleSwitcher', () => {
    // Render the 'Header' component
    render(<Header />)

    // Get the header element by its role attribute
    const headerEl = screen.getByRole('banner')
    // Check if the header element is in the document
    expect(headerEl).toBeInTheDocument()
    // Check if the header element contains the text "Tag Management System"
    expect(headerEl).toHaveTextContent("Tag Managment System")

    // Get the LocaleSwitcher element by its test ID
    const localeSwitcherElement = screen.getByTestId('mocked-locale-switcher')
    // Check if the LocaleSwitcher element is in the document
    expect(localeSwitcherElement).toBeInTheDocument()
  })
})

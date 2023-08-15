import { usePathname } from "next/navigation"
import LocaleSwitcher from "../LocaleSwitcher"
import { render, screen } from "@testing-library/react"


// Mock the usePathname hook
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

describe('LocaleSwitcher Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('renders the locale switcher with correct link is EN', () => {
    // @ts-ignore
    usePathname.mockReturnValue('/en')
    render(<LocaleSwitcher />)

    const localeSwitcher = screen.getByRole('list')
    expect(localeSwitcher).toBeInTheDocument()
    const localeLinks = screen.getAllByRole('link')
    expect(localeLinks).toHaveLength(2)

    // Test the content of the first link is EN
    expect(localeLinks[0]).toHaveTextContent('EN')
    expect(localeLinks[0]).toHaveAttribute('href', '/en')
  })

  it('renders the locale switcher with correct link is NL', () => {
    // @ts-ignore
    usePathname.mockReturnValue('/nl')
    render(<LocaleSwitcher />)

    const localeLinks = screen.getAllByRole('link')
    // Test the content of the second link is NL
    expect(localeLinks[1]).toHaveTextContent('NL')
    expect(localeLinks[1]).toHaveAttribute('href', '/nl')
  })

})

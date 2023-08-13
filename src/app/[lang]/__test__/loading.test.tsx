import React from 'react'
import { render, screen } from '@testing-library/react'
import Loading from '../loading'

describe("Loading", () => {
  it("renders the loading component", () => {
    render(<Loading />)
    const loadingEl = screen.getByTestId('loader')
    expect(loadingEl).toBeInTheDocument()
    expect(loadingEl).toHaveClass('loading')
  })
})

import React from 'react'
import { render, screen } from '@testing-library/react'
import Error from '../error'


describe('Error Component', () => {
  it('renders the error message', () => {
    // Render the component
    render(<Error />)

    // Check if the error message rendered
    const errorMessage = screen.getByText('Error! something went wrong.')
    expect(errorMessage).toBeInTheDocument()
  })
})

import React from 'react'
import { render, screen, fireEvent } from "@testing-library/react"
import Error from '../error'


describe('Error Component', () => {
  it('renders the error message', async () => {
    const mockReset = jest.fn()
    // Render the component
    // @ts-ignore
    render(<Error error={(): void => { }} reset={mockReset} />)

    // Check if the error message rendered
    const errorMessage = screen.getByText('Error! something went wrong.')
    expect(errorMessage).toBeInTheDocument()

    // Check if the close button is displayed
    const closeButton = screen.getByRole('button')
    expect(closeButton).toBeInTheDocument()

    // Check if the close button contains the AiFillCloseCircle icon
    const closeIcon = screen.getByTestId('close-icon')
    expect(closeIcon).toBeInTheDocument()

    // Simulate clicking the close button
    fireEvent.click(closeButton)

    // Check if the reset function was called
    expect(mockReset).toHaveBeenCalledTimes(1)
  })
})

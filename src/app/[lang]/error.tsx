"use client"
import React from 'react'
//import { useEffect } from "react"
import { AiFillCloseCircle } from "react-icons/ai"

const Error = ({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) => {
  // useEffect(() => {
  //   // Log the error to an error reporting service
  //   //console.error(error)
  // }, [error])
  return (
    <div className="alert alert-error">
      <button className="btn btn-ghost btn-sm" onClick={() => reset()} ><AiFillCloseCircle data-testid="close-icon" size={24} /> </button>
      <span>Error! something went wrong.</span>
    </div>
  )
}

export default Error

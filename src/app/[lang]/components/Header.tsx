"use client"
import LocaleSwitcher from "./LocaleSwitcher"
import { signOut } from "next-auth/react"

const Header: React.FC = () => {
  return (
    <header className="flex flex-wrap justify-between items-center mx-auto p-10 header">
      <nav className="container flex items-center justify-between">
        <div className="container flex items-center">
          <h1>Tag Managment System</h1>
          {/* Include the LocaleSwitcher component to allow language switching */}
          <LocaleSwitcher />
        </div>
        <div className="btn-container">
          <button onClick={() => signOut()} className="rounded-md border bg-black px-3 py-2 text-white glass text-sm">
            Logout
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header

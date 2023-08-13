"use client"
import LocaleSwitcher from './LocaleSwitcher'

const Header: React.FC = () => {

  return (
    <header className="header">
      <nav className="container flex items-center justify-between">
        <div className="container flex">
          <h1>Tag Managment System</h1>
        </div>
        <LocaleSwitcher />
      </nav>
    </header>
  )
}

export default Header

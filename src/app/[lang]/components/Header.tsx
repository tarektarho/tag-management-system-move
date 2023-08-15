"use client"
import LocaleSwitcher from './LocaleSwitcher'

const Header: React.FC = () => {

  return (
    <header className="flex flex-wrap justify-between items-center mx-auto p-10 header">
      <nav className="container flex items-center justify-between">
        <div className="container flex">
          <h1>Tag Managment System</h1>
        </div>
        {/* Include the LocaleSwitcher component to allow language switching */}
        <LocaleSwitcher />
      </nav>
    </header>
  )
}

export default Header

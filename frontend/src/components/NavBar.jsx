import { useState } from "react"
import { Link } from "react-router-dom"

const NavBar = () => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    

  return (
    <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
      <div className="flex items-center gap-10 z-50">
        <Link to='/'>
            <img src="../../public/netflix-logo.png" alt="logo" className="w-32 sm:40" />
        </Link>
        {/*Desktop navbar items*/}
        <div className="hidden sm:flex gap-2 items-center">
            <Link to='/' className="hover:underline">
                Movies
            </Link>

            <Link to='/' className="hover:underline">
                Tv Shows 
            </Link>

            <Link to='/history' className="hover:underline">
                Search History
            </Link>
        </div>
      </div>

      {/*Mobile navbar items*/}
      {isMobileMenuOpen && (
        <div className="w-full sm:hidden mt-4 z-50 bg-black rounded border-gray-800">

            <Link to='/' className="block hover:underline p-2" onClick={toggleMobileMenu}>
                Movies
            </Link>

            <Link to='/' className="block hover:underline p-2" onClick={toggleMobileMenu}>
                Tv Shows
            </Link>

            <Link to='/history' className="block hover:underline p-2" onClick={toggleMobileMenu}>
                Search History
            </Link>
        </div>
      )}
    </header>
  )
}

export default NavBar

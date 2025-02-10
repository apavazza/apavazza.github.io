"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Github, Menu, X } from "lucide-react"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <>
      <nav className="bg-blue-950 text-white p-4 sticky top-0 z-20">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Amadeo Pavazza
          </Link>
          <div className="hidden md:flex space-x-4 items-center">
            <NavLinks currentPath={pathname} />
            <GitHubLink />
          </div>
          <button className="md:hidden p-2 rounded-md hover:bg-blue-800 transition-colors" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <MobileMenu closeMenu={closeMenu} currentPath={pathname} />
          </div>
        )}
      </nav>
      {isMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={closeMenu}></div>}
    </>
  )
}

function NavLinks({ closeMenu, currentPath }: { closeMenu?: () => void; currentPath: string }) {
  return (
    <>
      <NavLink href="/" currentPath={currentPath} onClick={closeMenu}>
        Home
      </NavLink>
      <NavLink href="/about" currentPath={currentPath} onClick={closeMenu}>
        About
      </NavLink>
      <NavLink href="/contact" currentPath={currentPath} onClick={closeMenu}>
        Contact
      </NavLink>
    </>
  )
}

function NavLink({
  href,
  children,
  currentPath,
  onClick,
}: { href: string; children: React.ReactNode; currentPath: string; onClick?: () => void }) {
  const isActive = currentPath === href
  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-md transition-colors ${
        isActive ? "bg-blue-700 text-white" : "text-white hover:bg-blue-800"
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}

function GitHubLink() {
  return (
    <Link
      href="https://github.com/apavazza"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors flex justify-center items-center"
    >
      <Github className="mr-2" size={20} />
      My GitHub
    </Link>
  )
}

function MobileMenu({ closeMenu, currentPath }: { closeMenu: () => void; currentPath: string }) {
  return (
    <div className="bg-blue-900 mt-2 p-4 rounded-md absolute top-full left-0 right-0 text-center">
      <div className="flex flex-col space-y-4">
        <NavLinks closeMenu={closeMenu} currentPath={currentPath} />
        <GitHubLink />
      </div>
    </div>
  )
}
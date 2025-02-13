"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Github, Menu, X } from "lucide-react"

// Main Navigation component
// Manages the state for mobile menu and renders appropriate navigation elements
export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const closeMenu = () => setIsMenuOpen(false)

  // Render navigation bar and mobile menu
  return (
    <>
      {/* Overlay for mobile menu (displayed when menu is open) */}
      {isMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={closeMenu}></div>}

      {/* Main navigation bar */}
      <nav className="bg-blue-950 text-white p-4 sticky top-0 z-20">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold" onClick={closeMenu}>
            Amadeo Pavazza
          </Link>
          <div className="hidden md:flex space-x-4 items-center">
            <NavLinks currentPath={pathname} />
            <GitHubLink />
          </div>

          {/* Mobile menu toggle button */}
          <div className="md:hidden flex items-center space-x-2">
            <button className="p-2 rounded-md hover:bg-blue-800 transition-colors" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu (conditionally rendered) */}
        {isMenuOpen && (
          <div className="md:hidden transition-all duration-200 ease-in-out max-h-screen opacity-100">
            <MobileMenu closeMenu={closeMenu} currentPath={pathname} />
          </div>
        )}
      </nav>
    </>
  )
}

// Navigation links component
// Renders different links based on current path
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

// Individual navigation link component
// Applies active styles based on current path
function NavLink({
  href,
  children,
  currentPath,
  onClick,
}: {
  href: string
  children: React.ReactNode
  currentPath: string
  onClick?: () => void
}) {
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

// GitHub link component
// Renders a button linking to the GitHub profile
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

// Mobile menu component
// Renders full-width menu for mobile view
function MobileMenu({ closeMenu, currentPath }: { closeMenu: () => void; currentPath: string }) {
  return (
    <div className="bg-blue-950 p-4 rounded-b-md absolute top-full left-0 right-0 text-center z-20">
      <div className="flex flex-col space-y-4">
        <NavLinks closeMenu={closeMenu} currentPath={currentPath} />
        <GitHubLink />
      </div>
    </div>
  )
}
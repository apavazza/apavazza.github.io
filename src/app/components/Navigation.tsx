"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

interface NavigationData {
  mainLinks: Array<{ label: string; href: string }>
  githubLink: { label: string; href: string }
}

// Main Navigation component
// Manages the state for mobile menu and renders appropriate navigation elements
export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [navigationData, setNavigationData] = useState<NavigationData | null>(null)
  const pathname = usePathname()

  // Fetch navigation data
  useEffect(() => {
    fetch("/data/navigation.json")
      .then((response) => response.json())
      .then((data) => setNavigationData(data))
      .catch((error) => console.error("Error fetching navigation data:", error))
  }, [])

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
            <h1>Amadeo Pavazza</h1>
          </Link>
          <div className="hidden md:flex space-x-4 items-center">
            {navigationData && (
              <>
                <NavLinks currentPath={pathname} navigationData={navigationData} />
                <GitHubLink navigationData={navigationData} />
              </>
            )}
          </div>

          {/* Mobile menu toggle button */}
          <div className="md:hidden flex items-center space-x-2">
            <button className="p-2 rounded-md hover:bg-blue-800 transition-colors" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu (conditionally rendered) */}
        {isMenuOpen && navigationData && (
          <div className="md:hidden transition-all duration-200 ease-in-out max-h-screen opacity-100">
            <MobileMenu closeMenu={closeMenu} currentPath={pathname} navigationData={navigationData} />
          </div>
        )}
      </nav>
    </>
  )
}

// Navigation links component
// Renders different links based on current path
function NavLinks({
  closeMenu,
  currentPath,
  navigationData,
}: { closeMenu?: () => void; currentPath: string; navigationData: NavigationData }) {
  return (
    <>
      {navigationData.mainLinks.map((link) => (
        <NavLink key={link.href} href={link.href} currentPath={currentPath} onClick={closeMenu}>
          {link.label}
        </NavLink>
      ))}
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
function GitHubLink({ navigationData }: { navigationData: NavigationData }) {
  const { label, href } = navigationData.githubLink
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 w-min rounded transition-colors"
    >
      {label}
    </Link>
  )
}

// Mobile menu component
// Renders full-width menu for mobile view
function MobileMenu({
  closeMenu,
  currentPath,
  navigationData,
}: { closeMenu: () => void; currentPath: string; navigationData: NavigationData }) {
  return (
    <div className="bg-blue-950 p-4 rounded-b-md absolute top-full left-0 right-0 z-20">
      <div className="flex flex-col space-y-4">
        <NavLinks closeMenu={closeMenu} currentPath={currentPath} navigationData={navigationData} />
        <div className="border-t border-blue-400/30 my-2"></div>
        <GitHubLink navigationData={navigationData} />
      </div>
    </div>
  )
}
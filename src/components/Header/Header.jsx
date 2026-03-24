import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ]

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <Container>
        <nav className="flex items-center justify-between py-4">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo width="60px" />
          </Link>

          {/* Nav Items */}
          <ul className="flex items-center gap-6">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-700 hover:text-white"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {/* Logout */}
            {authStatus && (
              <li>
                <LogoutBtn className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-sm font-medium transition" />
              </li>
            )}
          </ul>

        </nav>
      </Container>
    </header>
  )
}

export default Header
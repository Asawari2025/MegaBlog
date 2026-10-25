import { Container, Logo, LogoutBtn } from '../index'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header({ onSuccess }) {
  const authStatus = useSelector((state) => state.auth.status)

  const navItems = [
    {
      name: 'Articles',
      slug: '/all-posts',
      active: authStatus,
    },
    {
      name: 'Write',
      slug: '/add-post',
      active: authStatus,
    },
    {
      name: 'Sign in',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Get started',
      slug: '/signup',
      active: !authStatus,
      primary: true,
    },
  ]

  return (
    <header className="site-header">
      <Container>
        <nav className="site-nav" aria-label="Main navigation">
          <Link to="/" className="brand-link" aria-label="MegaBlog home">
            <Logo />
            <span className="brand-name">megablog<span>.</span></span>
          </Link>
          <ul className="nav-links">
            <li><NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}>Home</NavLink></li>
            {navItems.map((item) => item.active ? (
              <li key={item.name}>
                <NavLink
                  to={item.slug}
                  className={({ isActive }) => `nav-link${item.primary ? ' nav-link-primary' : ''}${isActive ? ' is-active' : ''}`}
                >
                  {item.name}
                </NavLink>
              </li>
            ) : null)}
            {authStatus && (
              <li>
                <LogoutBtn onSuccess={onSuccess} />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
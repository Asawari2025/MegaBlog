import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Link to="/" className="brand-link" aria-label="MegaBlog home">
          <Logo />
          <span className="brand-name">megablog<span>.</span></span>
        </Link>
        <p>Good ideas deserve to be shared.</p>
        <span className="footer-copyright">&copy; {new Date().getFullYear()} MegaBlog</span>
      </div>
    </footer>
  )
}

export default Footer

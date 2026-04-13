import { Link } from '@tanstack/react-router'
import { Instagram, Youtube, Mail, Linkedin } from 'lucide-react'

const footerLinks = [
  { label: 'Work', to: '/portfolio' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
] as const

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">

        {/* Top — brand + nav + contact */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-14">

          {/* Brand */}
          <div className="md:col-span-5">
            <Link to="/" className="inline-block mb-5">
              <span
                className="font-sans text-xl text-foreground block"
                style={{ fontWeight: 900, letterSpacing: '-0.01em' }}
              >
                CALEB CREATIVE
              </span>
              <span className="label-tag text-muted-foreground mt-1 block">
                Film · Photo · Digital
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Based in Georgia, USA. Creating cinematic work for couples, brands, and businesses that deserve to be remembered.
            </p>
            <p className="text-xs text-muted-foreground/50 mt-3">
              Agency work under{' '}
              <a
                href="https://lykodigital.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue hover:text-blue-bright transition-colors"
              >
                Lyko Digital
              </a>
            </p>
          </div>

          {/* Nav */}
          <div className="md:col-span-3">
            <p className="label-tag text-muted-foreground/50 mb-5">Navigate</p>
            <nav className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to as string}
                  className="text-sm font-500 text-muted-foreground hover:text-foreground transition-colors tracking-wide"
                  style={{ fontWeight: 500 }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div className="md:col-span-4">
            <p className="label-tag text-muted-foreground/50 mb-5">Connect</p>
            <div className="flex flex-col gap-3">
              <a
                href="https://instagram.com/calebcrtv"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-blue transition-colors"
              >
                <Instagram className="w-4 h-4" />
                @calebcrtv
              </a>
              <a
                href="https://youtube.com/@calebcrtv"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-blue transition-colors"
              >
                <Youtube className="w-4 h-4" />
                YouTube
              </a>
              <a
                href="https://tiktok.com/@calebcrtv"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-blue transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
                </svg>
                TikTok
              </a>
              <a
                href="https://linkedin.com/in/calebelliott"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-blue transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <button
                type="button"
                onClick={() => { window.location.href = 'mailto:caleb@lykodigital.com' }}
                className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-blue transition-colors text-left cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                caleb@lykodigital.com
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="label-tag text-muted-foreground/40">
            © {new Date().getFullYear()} Caleb Creative. All rights reserved.
          </p>
          <p className="label-tag text-muted-foreground/30">
            Georgia, USA
          </p>
        </div>
      </div>
    </footer>
  )
}

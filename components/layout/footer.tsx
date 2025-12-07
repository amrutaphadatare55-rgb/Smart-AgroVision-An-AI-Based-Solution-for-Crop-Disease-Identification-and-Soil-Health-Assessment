import Link from "next/link"
import { AgroVisionLogo } from "@/components/logo"

export function Footer() {
  return (
    <footer className="border-t border-color-border bg-color-muted-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <AgroVisionLogo size={36} showText={true} />
            </div>
            <p className="text-sm text-color-muted">AI-powered agricultural analysis for sustainable farming.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-color-muted">
              <li>
                <Link href="#" className="hover:text-color-primary transition">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-color-primary transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-color-primary transition">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-color-muted">
              <li>
                <Link href="#" className="hover:text-color-primary transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-color-primary transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-color-primary transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-color-muted">
              <li>
                <Link href="#" className="hover:text-color-primary transition">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-color-primary transition">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-color-primary transition">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-color-border pt-8 text-center text-sm text-color-muted">
          <p>&copy; 2025 Smart AgroVision. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

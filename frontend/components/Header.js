import Link from 'next/link'
import { Nav } from './Nav'

export function Header() {
  return (
    <header>
      <div className="bar">
        <Link href='/'>sick fits</Link>
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
      <Nav />
    </header>
  )
}
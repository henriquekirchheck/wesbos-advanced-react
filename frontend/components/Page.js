import { Header } from './Header'

export function Page({ children, cool }) {
  return (
    <div>
      <Header />
      <h2>Hello, I am the page component</h2>
      <p>{cool}</p>
      {children}
    </div>
  )
}

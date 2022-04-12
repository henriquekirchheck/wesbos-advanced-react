export function Page({ children, cool }) {
  return (
    <div>
      <h2>Hello, I am the page component</h2>
      <p>I&apos;m {cool}</p>
      {children}
    </div>
  )
}
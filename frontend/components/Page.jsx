import styled from 'styled-components'
import { Header } from './Header'

const InnerStyles = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
`

export function Page({ children }) {
  return (
    <>
      <Header />
      <InnerStyles>{children}</InnerStyles>
    </>
  )
}

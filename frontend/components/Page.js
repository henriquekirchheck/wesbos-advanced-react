import styled from 'styled-components'
import { Header } from './Header'

const InnerStyles = styled.div`
  max-width: var(--max-width);
`

export function Page({ children }) {
  return (
    <InnerStyles>
      <Header />
      {children}
    </InnerStyles>
  )
}

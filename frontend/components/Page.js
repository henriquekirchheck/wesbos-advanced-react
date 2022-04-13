import styled, { createGlobalStyle } from 'styled-components'
import { Header } from './Header'

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  :root {
    --red: #ff0000;
    --black: #393939;
    --gray: #3a3a3a;
    --light-gray: #e1e1e1;
    --off-white: #ededed;
    --max-width: 1000px;
    --box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.9);
  }

  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    font-family: 'rednika_next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
  }

  a {
    text-decoration: none;
    color: var(--black);
  }

  a:hover {
    text-decoration: underline;
  }

  button {
    font-family: 'rednika_next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`

const InnerStyles = styled.div`
  max-width: var(--max-width);
`

export function Page({ children }) {
  return (
    <div>
      <GlobalStyles />
      <Header />
      {children}
    </div>
  )
}

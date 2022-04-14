import { Page } from '../components/Page'
import NProgress from 'nprogress'
import Router from 'next/router'
import { ApolloProvider } from '@apollo/client'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import '../components/styles/nprogress.css'
import withData from '../lib/withData'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const GlobalStyle = createGlobalStyle`
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

const theme = {}

function App({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ThemeProvider>
    </ApolloProvider>
  )
}

App.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {}
  if(Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  pageProps.query = ctx.query
  return pageProps
}

export default withData(App)

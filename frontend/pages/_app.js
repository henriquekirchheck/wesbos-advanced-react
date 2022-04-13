import { Page } from '../components/Page'
import NProgress from 'nprogress'
import Router from 'next/router'
// import { ApolloProvider } from '@apollo/client'

import '../components/styles/nprogress.css'
import withData from '../lib/withData'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function App({ Component, pageProps /* apollo */ }) {
  return (
    // <ApolloProvider client={apollo}>
    <Page>
      <Component {...pageProps} />
    </Page>
    // </ApolloProvider>
  )
}

export default withData(App)

import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import Head from 'next/head'
import Link from 'next/link'
import { perPage } from '../config'
import { DisplayError } from './ErrorMessage'
import PaginationStyles from './styles/PaginationStyles.js'

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    productsCount
  }
`

export function Pagination({ page }) {
  const { error, loading, data } = useQuery(PAGINATION_QUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <DisplayError error={error} />

  const count = data.productsCount
  const pageCount = Math.ceil(count / perPage)

  return (
    <PaginationStyles>
      <Head>
        <title>
          Sick Fits - Page {page} of {pageCount}
        </title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>&#8592; Prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Itens Total</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>Next &#8594;</a>
      </Link>
    </PaginationStyles>
  )
}

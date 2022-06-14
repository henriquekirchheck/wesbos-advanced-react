import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { DisplayError } from './ErrorMessage'
import Head from 'next/head'
import styled from 'styled-components'

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  max-width: var(--max-width);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  img: {
    width: 100%;
    object-fit: contain;
  }
`

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY(
    $id: ID!
  ) {
    product(where: { id: $id }) {
      name
      price
      description
      id
      photo {
        image {
          publicUrlTransformed
        }
        altText
      }
    }
  }
`

export function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: {
      id
    }
  })
  console.log({ data, loading, error })
  if(loading) return <p>Loading...</p>
  if(error) return <DisplayError error={error}/>
  const { product: item } = data
  return (
    <ProductStyles>
      <Head>
        <title>Sick Fits | {item.name}</title>
      </Head>
      <img src={item.photo.image.publicUrlTransformed} alt={item.photo.altText} />
      <h2>{item.name}</h2>
      <p>{item.description}</p>
    </ProductStyles>
  )
}
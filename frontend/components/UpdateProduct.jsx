import { useMutation, useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import Router from 'next/router'
import { useState } from 'react'
import { useForm } from '../lib/useForm'
import { DisplayError } from './ErrorMessage'
import Form from './styles/Form'

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    product(where: { id: $id }) {
      id
      name
      price
      description
    }
  }
`

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      where: { id: $id }
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`

export function UpdateProduct({ id }) {

  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: {
      id,
    },
  })

  const { formInputs, handleChange, clearForm } = useForm({
    name: queryData?.product.name || '',
    price: queryData?.product.price || '',
    description: queryData?.product.description || '',
  })

  const [mutError, setMutError] = useState(null)
  const [mutLoading, setMutLoading] = useState(false)
  const [mutData, setMutData] = useState(null)
  const [mutProduct] = useMutation(UPDATE_PRODUCT_MUTATION, {
    onError: (error) => {
      setMutError(error)
    },
    onCompleted: (data) => {
      setMutData(data)
      setMutLoading(false)
    },
  })
  async function handleSubmit(event) {
    event.preventDefault()
    setMutLoading(true)
    await mutProduct({
      variables: {
        id,
        ...formInputs
      }
    })
    clearForm()
    Router.push({
      pathname: `/product/${id}`,
    })
  }

  if (queryLoading) return <p>Loading...</p>

  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError error={queryError || mutError} />
      <fieldset aria-busy={mutLoading} disabled={mutLoading}>
        <label htmlFor="name">
          Name
          <input
            required
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={formInputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            required
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={formInputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            required
            id="description"
            name="description"
            placeholder="Description"
            value={formInputs.description}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  )
}

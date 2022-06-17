import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import Router from 'next/router'
import { useForm } from '../lib/useForm'
import { DisplayError } from './ErrorMessage'
import { ALL_PRODUCTS_QUERY } from './Products'
import Form from './styles/Form'

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
    }
  }
`

export function CreateProduct() {
  const { formInputs, handleChange, clearForm } = useForm({
    name: 'Shoes',
    price: 3200,
    description: 'Cool Shoes',
    image: null,
  })

  const [createProduct, { error, loading }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: formInputs,
      refetchQueries: [
        {
          query: ALL_PRODUCTS_QUERY,
        },
      ],
    }
  )

  async function handleSubmit(event) {
    event.preventDefault()
    const response = await createProduct()
    clearForm()
    Router.push({
      pathname: `/product/${response.data.createProduct.id}`,
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError error={error} />
      <fieldset aria-busy={loading} disabled={loading}>
        <label htmlFor="image">
          Image
          <input type="file" id="image" name="image" onChange={handleChange} />
        </label>
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

        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  )
}

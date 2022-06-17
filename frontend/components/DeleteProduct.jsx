import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(where: { id: $id }) {
      id
    }
  }
`

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteProduct))
}

export function DeleteProduct({ id, children }) {
  const [deleteProduct, {loading}] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: {
      id,
    },
    update
  })

  const handleDelete = () => {
    if (confirm('Are you sure you want to dele this item?')) {
      deleteProduct().catch((err) => alert(err.message))
    }
  }

  return (
    <button type="button" onClick={handleDelete} disabled={loading}>
      {children}
    </button>
  )
}

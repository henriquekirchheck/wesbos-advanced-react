import { useForm } from '../lib/useForm'
import Form from './styles/Form'

export function CreateProduct() {
  const { formInputs, handleChange, clearForm, resetForm } = useForm({
    name: 'Shoes',
    price: 3200,
    description: 'Cool Shoes',
    image: '',
  })

  function handleSubmit(event) {
    event.preventDefault()
    console.log(formInputs)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor="image">
          Image
          <input
            required
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
          />
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

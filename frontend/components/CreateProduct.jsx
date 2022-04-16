import { useForm } from '../lib/useForm'

export function CreateProduct() {
  const { formInputs, handleChange, clearForm, resetForm } = useForm({
    name: 'Shoes',
    price: 3200,
    description: 'Cool Shoes',
  })

  return (
    <form>
      <label htmlFor="name">
        Name
        <input
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
          type="number"
          id="price"
          name="price"
          placeholder="price"
          value={formInputs.price}
          onChange={handleChange}
        />
      </label>

      <button type='button' onClick={clearForm}>Clear Form</button>
      <button type='button' onClick={resetForm}>Reset Form</button>
    </form>
  )
}

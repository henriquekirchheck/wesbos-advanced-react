import { useState } from 'react'

export function useForm(initial = {}) {
  const [formInputs, setFormInputs] = useState(initial)

  function handleChange(event) {
    let { value, name, type } = event.target
    if (type === 'number') value = parseInt(value)
    if (type === 'file') value[0] = event.target.files

    setFormInputs({
      ...formInputs,
      [name]: value,
    })
  }

  function resetForm() {
    setFormInputs(initial)
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(formInputs).map(([key, value]) => [key, ''])
    )

    setFormInputs(blankState)
  }

  return { formInputs, handleChange, resetForm, clearForm }
}

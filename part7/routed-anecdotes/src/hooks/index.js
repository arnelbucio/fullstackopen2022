import { useState } from 'react'

export const useField = (name, type = 'text') => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = (event) => {
    setValue('')
  }

  return {
    name,
    type,
    value,
    onChange,
    reset
  }
}

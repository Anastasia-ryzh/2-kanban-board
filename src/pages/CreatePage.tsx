import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const CreatePage = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    if (!title.trim()) {
      inputRef.current?.focus()
      return
    }

    navigate('/')
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Создать задачу</h2>

      <div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Название (обязательно)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ display: 'block', marginBottom: '1rem', width: '300px' }}
        />
      </div>

      <div>
        <textarea
          placeholder="Описание (необязательно)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ display: 'block', marginBottom: '1rem', width: '300px' }}
        />
      </div>

      <button onClick={handleSubmit}>Создать</button>
    </div>
  )
}

export default CreatePage
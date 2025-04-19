import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProfiles } from '../contexts/ProfileContext'

const ProfileCreate = () => {
  const [name, setName] = useState('')
  const [img, setImg] = useState('')
  const [sueldo, setSueldo] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const { createProfile } = useProfiles()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (name.trim() === '' || img.trim() === '' || sueldo.trim() === '' ) {
      setError('Please fill in all fields')
      return
    }

    try {
      await createProfile({ name, img, sueldo })
      navigate('/profiles')
    } catch (err) {
      setError('Error creating profile')
      console.log('err -> ', err)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-800'>
      <div className='max-w-md w-full p-6 rounded'>
        <h2 className='text-2xl font-bold text-center text-white mb-4'>
          Crear un nuevo empleado
        </h2>
        {/* error  */}
        {error && (
          <p className="text-red-400 mb-2">{error}</p>
        )}
        {/* form  */}
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-4'
        >
          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='p-2 rounded bg-gray-700 text-white'
          />
          <input
            type='text'
            placeholder='URL Avatar'
            value={img}
            onChange={(e) => setImg(e.target.value)}
            className='p-2 rounded bg-gray-700 text-white'
          />
          <input
            type='text'
            placeholder='Sueldo'
            value={sueldo}
            onChange={(e) => setSueldo(e.target.value)}
            className='p-2 rounded bg-gray-700 text-white'
          />
          <button
            type='submit'
            className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200'
          >
            Crear Empleado
          </button>

          <button
            onClick={() => navigate('/profiles')}
            className='bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition duration-200'
          >
            Regresar al listado de empleados
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProfileCreate
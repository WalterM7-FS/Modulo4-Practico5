import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useProfiles } from '../contexts/ProfileContext'

const ProfileEdit = () => {
  // estados
  const [name, setName] = useState('')
  const [img, setImg] = useState('')
  const [sueldo, setSueldo] = useState('')
  const [error, setError] = useState('')

  // otros hooks
  const navigate = useNavigate()
  const { profiles, updateProfile } = useProfiles()
  const { id } = useParams()

  // setear el nombre y avatar del perfil a editar con el id de la url
  useEffect(() => {
    const currentProfile = profiles.find((profile) => profile.id === id)
    if (currentProfile) {
      setName(currentProfile.name)
      setImg(currentProfile.img)
      setSueldo(currentProfile.sueldo)
    }
  }, [profiles, id])


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (name.trim() === '' || img.trim() === '' || sueldo.trim() === '') {
      setError('Please fill in all fields')
      return
    }

    try {
      await updateProfile(id, { name, img, sueldo })
      navigate(`/profiles/${id}`)
    } catch (err) {
      setError('Error updating profile')
      console.log('err -> ', err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="max-w-md w-full bg-gray-800 p-6 rounded">
        <h2 className="text-2xl font-bold text-white mb-4">Editar empleado</h2>
        {error && <p className="text-red-400 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white"
          />
          <input
            type="text"
            placeholder="URL de la img"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white"
          />
          <input
            type="text"
            placeholder="Sueldo"
            value={sueldo}
            onChange={(e) => setSueldo(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white"
          />
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white p-2 rounded">
            Guardar cambios
          </button>
          <button onClick={() => navigate('/profiles')} className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded">
            Regresar al perfil
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProfileEdit
import { FormEvent, useState } from 'react'
import asideIMG from '../assets/illustration.svg'
import logoIMG from '../assets/logo.svg'
import '../styles/auth.scss'
import { Button } from '../components/button'
import {FiLogIn} from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import { database } from '../services/firebase'
import { useAuth } from '../hooks/useAuth'


export function NewRoom(){

  const [newRoom,SetNewRoom] = useState('')
  const {user} = useAuth()
  const history = useHistory()

  async function handlecreateRoom(event:FormEvent){
    event.preventDefault()

    if(newRoom.trim() === ''){
      return;
    }

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      
        title: newRoom,
        authorId : user?.id,
    })

    history.push(`/admin/rooms/${firebaseRoom.key}`)
    
  }

  return (

    <div id="page-auth">
      <aside>
        <img src={asideIMG} alt="ilustration" />
        <strong>Toda pergunta tem uma resposta.</strong>
        <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoIMG} alt="Logo" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handlecreateRoom} >
            <input 
              type="text" 
              placeholder="Nome da sala"
              onChange={event => SetNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit"><FiLogIn size={24}/>Criar sala</Button>
          </form>
          <p>que entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
        </div>
      </main>
    </div>
  )
}
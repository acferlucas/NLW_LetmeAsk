import asideIMG from '../assets/illustration.svg'
import logoIMG from '../assets/logo.svg'
import googleIMG from '../assets/google-icon.svg'
import '../styles/auth.scss'
import { Button } from '../components/button'
import {FiLogIn} from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import {FormEvent, useState} from 'react'
import { database } from '../services/firebase'

export function Home(){
  
  const history = useHistory()
  const {user, signInWithGoogle} = useAuth()
  const [roomcode,setRoomcode] = useState('')
  
async function navigateToNewRoom(){
    if(!user) {
      await signInWithGoogle()
  } 
  history.push('/rooms/new') 
}

async function handleJoinRoom(event:FormEvent){
  event.preventDefault()
  
  if(roomcode.trim() === ''){
    return;
  }
  const roomRef = await database.ref(`rooms/${roomcode}`).get();
  
  if(!roomRef.exists()){
    alert('room not found')
  }else {
    history.push(`/rooms/${roomcode}`)
  }
  
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
          <button onClick={navigateToNewRoom} className="create-room">
            <img src={googleIMG} alt="" />
            Crie sua sala com Google
          </button>
          <div className="separetor">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input type="text"
                   placeholder="Digite o codigo da Sala"
                   onChange={(event) => setRoomcode(event.target.value)}
                   value= {roomcode}
            />
            <Button type="submit"><FiLogIn size={24}/>Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}
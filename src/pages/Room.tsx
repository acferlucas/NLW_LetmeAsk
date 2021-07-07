import { useState, FormEvent,useEffect } from 'react'
import {useParams } from 'react-router-dom'
import logoIMG from '../assets/logo.svg'
import { Button } from '../components/button'
import { RoomCode } from '../components/RoomCode/RoomCode'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'
import '../styles/room.scss'

type FirebaseQuestions = Record<string, {
  
  author: {
    name : string
    avatar: string
  },
  content : string
  isAnswered: boolean
  isHighlighted: boolean
}>

type Questions = {
  id: string
  author: {
    name : string
    avatar: string
  },
  content : string
  isAnswered: boolean
  isHighlighted: boolean
}


type RoomParams = {
  id: string
}

export function Room(){

  const params = useParams<RoomParams>()
  const {user} = useAuth()
  const [newquestion,setNewquestion] = useState('')
  const [questions,setQuestions] = useState<Questions[]>([])
  const [title,setTitle] = useState('')

  useEffect(() => {
    const roomRef = database.ref(`rooms/${params.id}`)

    roomRef.on('value',room => {
      
      const databaseRoom = room.val()
      const firebaseQuestion:FirebaseQuestions = databaseRoom.questions ?? {}

      const parsedQuestion = Object.entries(firebaseQuestion).map(([key,value]) =>{
        return {
          id:key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,

        }
      })
      setTitle(databaseRoom.title)
      setQuestions(parsedQuestion)
    })

  },[params.id])

  async function handleSendQuestion(event : FormEvent){
    event.preventDefault()

    if(newquestion.trim() == ''){
      return
    }
    if(!user){
      throw new Error('you must be logged in')
    }
    const question = {
      content: newquestion,
      auth: {
        name:user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered : false
    }

    await database.ref(`rooms/${params.id}/questions`).push(question)

    setNewquestion('')
  }
  
  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoIMG} alt="LetmeAsk" />
          <RoomCode code = {params.id} />
        </div>
      </header>
      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} perguntas</span>}
        </div>
        <form onSubmit={handleSendQuestion}>
          <textarea placeholder="O que você quer perguntar ?" onChange={(event) => setNewquestion(event.target.value)} value={newquestion}/>
          <div className="form-footer">
            {user ? (
              <div className="user-info">

                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>  

              </div>
            ) : (<span>Para enviar uma pergunta, <button>faça seu Login</button></span>)}
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>
        {JSON.stringify(questions)}
      </main>
    </div>
  )
}
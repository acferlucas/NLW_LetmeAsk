import { useState, FormEvent,useEffect } from 'react'
import {useParams } from 'react-router-dom'
import logoIMG from '../assets/logo.svg'
import { Button } from '../components/button'
import { Question } from '../components/Question/Question'
import { RoomCode } from '../components/RoomCode/RoomCode'
import { useAuth } from '../hooks/useAuth'
import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'
import '../styles/room.scss'

type RoomParams = {
  id: string
}

export function Room(){

  const params = useParams<RoomParams>()
  const roomId = params.id
  const {user} = useAuth()
  const { title, questions} = useRoom(roomId)
  const [newquestion,setNewquestion] = useState('')

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
          <RoomCode code = {roomId} />
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
        <div className="question-list">
          {questions.map((question => <Question key={question.id} content={question.content} author={question.author}/>))}
        </div>
      </main>
    </div>
  )
}
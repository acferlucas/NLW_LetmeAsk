import {useParams } from 'react-router-dom'
import logoIMG from '../assets/logo.svg'
import { Button } from '../components/button'
import { Question } from '../components/Question/Question'
import { RoomCode } from '../components/RoomCode/RoomCode'
//import { useAuth } from '../hooks/useAuth'
import { useRoom } from '../hooks/useRoom'
import '../styles/room.scss'

type RoomParams = {
  id: string
}

export function AdminRoom(){

  const params = useParams<RoomParams>()
  const roomId = params.id
  //const {user} = useAuth()
  const { title, questions} = useRoom(roomId)

  
  
  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoIMG} alt="LetmeAsk" />
          <div>
            <RoomCode code = {roomId} />
            <Button isOutline >Encerrar sala</Button>
          </div>
        </div>
      </header>
      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} perguntas</span>}
        </div>
        <div className="question-list">
          {questions.map((question => <Question key={question.id} content={question.content} author={question.author}/>))}
        </div>
      </main>
    </div>
  )
}
import {useHistory, useParams } from 'react-router-dom'
import { useState } from 'react'
import Modal from 'react-modal'

import logoIMG from '../assets/logo.svg'
import deleteIMG from '../assets/delete.svg'
import xIMG from '../assets/Group.svg'
import deleteQuestionIMG from '../assets/Icon - Excluir.svg'

import { Button } from '../components/button'
import { Question } from '../components/Question/Question'
import { RoomCode } from '../components/RoomCode/RoomCode'
//import { useAuth } from '../hooks/useAuth'
import { useRoom } from '../hooks/useRoom'
import '../styles/room.scss'
import { database } from '../services/firebase'

type RoomParams = {
  id: string
}

export function AdminRoom(){

  const params = useParams<RoomParams>()
  const history = useHistory()
  const roomId = params.id
  //const {user} = useAuth()
  const { title, questions} = useRoom(roomId)
  const [isOpen, setIsOpen] = useState(false)

  function openModal(){
    setIsOpen(true)
  }

  async function handleDeleteQuestion(questionId:string){
    const questionRef =  await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    setIsOpen(false)   
  }
  async function handleEndRoom(){
    
    if(window.confirm('Tem certeza que deseja Encerrar a sala ?')){
      await database.ref(`rooms/${roomId}`).update({
        endedAt : new Date(),
      }) 

      history.push('/')
    }
    
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoIMG} alt="LetmeAsk" />
          <div>
            <RoomCode code = {roomId} />
            <Button isOutline onClick={handleEndRoom} >Encerrar sala</Button>
          </div>
        </div>
      </header>
      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} perguntas</span>}
        </div>
        
        <div className="question-list">
          {questions.map((question => <Question key={question.id} content={question.content} author={question.author}>
            <button type="button" onClick={openModal}>
              <img src={deleteIMG} alt="Botão de delete" />
            </button>
            <Modal 
                isOpen={isOpen}
                onRequestClose={() => {
                  setIsOpen(false)
                  
                }}
                style={{
          content: {
            width: '40%',
            height: '45%',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            display: 'flex',
            justifyContent:'center',
            alignItems: 'center',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#F0F0F5',
            border: 0,
            borderRadius:8,
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          }
                }}
            >
              <div className="modal">
                <img src={deleteQuestionIMG} alt="Delete icon" />
                <h1>Excluir Pergunta</h1>
                <p>Tem certeza que você deseja excluir esta pergunta?</p>
                <footer className="modal-footer">
                  <button className="cancel" type="button" onClick={() => {
                    setIsOpen(false)
                    }}>Cancelar</button>
                  <button 
                  className="delete"
                  type="button"
                  onClick={() => {handleDeleteQuestion(question.id)}}
                  > 
                    Excluir
                  </button>
                </footer>
              </div>
            </Modal>
          </Question>))}
        </div>
      </main>
    </div>
  )
}
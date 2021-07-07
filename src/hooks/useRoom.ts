import { useState , useEffect} from "react"
import { database } from "../services/firebase"


type FirebaseQuestions = Record<string, {
  
  auth: {
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



export function useRoom(roomId: string){
  const [questions,setQuestions] = useState<Questions[]>([])
  const [title,setTitle] = useState('')
  
  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)

    roomRef.on('value',room => {
      
      const databaseRoom = room.val()
      const firebaseQuestion:FirebaseQuestions = databaseRoom.questions ?? {}

      const parsedQuestion = Object.entries(firebaseQuestion).map(([key,value]) =>{
        return {
          id:key,
          content: value.content,
          author: value.auth,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,

        }
      })
      setTitle(databaseRoom.title)
      setQuestions(parsedQuestion)
    })

  },[roomId])

  return {questions , title}
}
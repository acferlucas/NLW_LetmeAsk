import { useState , useEffect} from "react"
import { database } from "../services/firebase"
import { useAuth } from "./useAuth"


type FirebaseQuestions = Record<string, {
  
  auth: {
    name : string
    avatar: string
  },
  content : string
  isAnswered: boolean
  isHighlighted: boolean
  likes : Record<string,{
    authorId: string
  } >
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
  likeCount: number
  likeId : string | undefined
}



export function useRoom(roomId: string){
  const [questions,setQuestions] = useState<Questions[]>([])
  const [title,setTitle] = useState('')
  const { user } = useAuth()
  
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
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key,like]) => like.authorId === user?.id)?.[0],

        }
      })
      setTitle(databaseRoom.title)
      setQuestions(parsedQuestion)
    })

    return () => {
      roomRef.off('value') 
    }

  },[roomId, user?.id])

  return {questions , title}
}
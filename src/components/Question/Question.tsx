import {  ReactNode } from "react"
import './style.scss'

type QuestionsProps = {

  content:String

  author: {
    name:string
    avatar:string
  }
  children ?:ReactNode
  isAnswered ?: boolean
  isHighlighted ?: boolean
}

export function Question({ content, author , isAnswered = false, isHighlighted = false, children}:QuestionsProps){
  console.log(author.avatar)
  return (
    <div className={`question ${isAnswered ? 'answered' : ''} ${isHighlighted ? 'highlighted' : ''}`}>
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt="Avantar author" />
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  )
}
import {  ReactNode } from "react"
import './style.scss'

type QuestionsProps = {

  content:String

  author: {
    name:string
    avatar:string
  }
  children ?:ReactNode
}

export function Question({ content, author , children}:QuestionsProps){
  console.log(children)
  return (
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt="" />
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  )
}
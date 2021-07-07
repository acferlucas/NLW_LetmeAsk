import './style.scss'

type QuestionsProps = {

  content:String

  author: {
    name:string
    avatar:string
  }
}
export function Question({ content, author }:QuestionsProps){
  console.log(author)
  return (
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt="" />
        </div>
        <div></div>
      </footer>
    </div>
  )
}
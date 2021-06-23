import {ButtonHTMLAttributes} from 'react'
import './button.scss'

type buttonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: buttonProps){
  return (
    <button className="button" {...props} />
  )
}

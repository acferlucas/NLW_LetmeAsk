import {ButtonHTMLAttributes} from 'react'
import './button.scss'

type buttonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutline?: boolean
}

export function Button({isOutline = false, ...props}: buttonProps){
  return (
    <button className={`button ${isOutline ? 'outlined' : ''}`} {...props} />
  )
}

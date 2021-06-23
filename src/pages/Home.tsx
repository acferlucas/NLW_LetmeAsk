import asideIMG from '../assets/illustration.svg'
import logoIMG from '../assets/logo.svg'
import googleIMG from '../assets/google-icon.svg'
import '../styles/auth.scss'
import { Button } from '../components/button'
import {FiLogIn} from 'react-icons/fi'


export function Home(){
  return (
    <div id="page-auth">
      <aside>
        <img src={asideIMG} alt="ilustration" />
        <strong>Toda pergunta tem uma resposta.</strong>
        <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoIMG} alt="Logo" />
          <button className="create-room">
            <img src={googleIMG} alt="" />
            Crie sua sala com Google
          </button>
          <div className="separetor">ou entre em uma sala</div>
          <form >
            <input type="text" placeholder="Digite o codigo da Sala"/>
            <Button type="submit"><FiLogIn size={24}/>Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}
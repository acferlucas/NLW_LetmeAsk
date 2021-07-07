import copyIMG from '../../assets/copy.svg'
import './style.scss'

type RoomCodeProps = {
  code: string
}

export function RoomCode(props: RoomCodeProps){
  
  function copyRoomCodeToClipboard(){

    navigator.clipboard.writeText(props.code)
  }

  return(
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyIMG} alt="" />
      </div>
      <span>sala #{props.code}</span>
    </button>
  )
}
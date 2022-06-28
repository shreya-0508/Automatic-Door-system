import ReactDOM from 'react-dom'
import './Modal.css'

export default function Input({handleChange,onClose}) {
  return ReactDOM.createPortal((
    <div className="modal-backdrop">
      <div className="user-modal">
        <h3>Input</h3>
        <br/>
        <div onClick={()=>handleChange(0)} style={{cursor:"pointer"}}>Approaching</div>
        <div onClick={()=>handleChange(1)} style={{cursor:"pointer"}}>Crossing</div>
        <div onClick={()=>handleChange(2)} style={{cursor:"pointer"}}>leaving</div>
        <div onClick={()=>handleChange(3)} style={{cursor:"pointer"}}>Null</div>
        <br/>
        <button onClick={()=>onClose()}>Done</button>
      </div>
    </div>
  ), document.body)
}
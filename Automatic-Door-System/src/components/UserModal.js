import { useState } from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'

export default function UserModal({set}) {
  const [number,setNumber]=useState(1000);
  const cc=(e)=>{
    // console.log(e);
    setNumber(parseInt(e.target.value));
  }
  return ReactDOM.createPortal((
    <div className="modal-backdrop">
      <div className="user-modal">
        <h3>Set Configuration</h3>
        <span>
        <label>
          Enter time (in milliseconds)
        </label>
        <input type="number"  onChange={cc} />
        </span>
        
        <button onClick={()=>{set(number)}}>Done</button>
      </div>
    </div>
  ), document.body)
}
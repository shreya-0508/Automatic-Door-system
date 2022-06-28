import { useEffect, useState } from "react";
import "./App.css";
import UserModal from "./components/UserModal";
import EmailModal from "./components/EmailModal";
import Input from './components/Input';
function App() {
  const [showModal, setShowModal] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [dis, setDis] = useState(true)
  const [doorState, setDoorState] = useState(3);
  const [personState, setPersonState] = useState(3);
  const [gt,sgt]=useState(1000);
  
  const handleConfig = () => {
    setShowModal(true);
  };
  const handleInput = () => {
    setShowInput(prev => !prev)
  };
  const removeConfig = () => {
    setShowModal(false);
  };
  const handleStart = () => {
    setDis(false);
  }
  const handleOff = () => {
    setDis(true)
  }
  const handleChange = (opt) => {
    setDoorState(opt);
    setPersonState(opt);
    handleInput();
  };
  const setgt=(timer)=>{
    sgt(timer);
    removeConfig();
  }
  useEffect(() => {
    if (doorState === 0) {
      setTimeout(() => {
        setDoorState(1);
        setPersonState(1);
      }, gt);
    }
    if (doorState === 1) {
      setTimeout(() => {
        setDoorState(2);
        setPersonState(2);
      }, gt);
    }
    if (doorState === 2) {
      setTimeout(() => {
        setDoorState(3);
        setPersonState(3);
      }, gt);
    }
  }, [doorState,gt,personState]);
  

  return (
    <div className="App">
      {showModal && <UserModal  set={setgt} />}
      {showInput && <Input onClose={handleInput} handleChange={handleChange} />}
      <h1 className="heading" style={{ color: "#c23866", fontWeight:"bold" }}>
        Automatic Door System
      </h1>
      <div className="state-changes">
        <h3 style={{fontWeight:"bold", marginTop:"1%"}}>Display Panel</h3>
        <br/>
        <p>
          Door's Current State -{" "}
          {doorState === 0 && <span style={{ fontWeight: "bold" }}>OPENING</span>}
          {doorState === 1 && <span style={{ fontWeight: "bold" }}>OPEN</span>}
          {doorState === 2 && <span style={{ fontWeight: "bold" }}>CLOSING</span>}
          {doorState === 3 && <span style={{ fontWeight: "bold" }}>CLOSED</span>}
        </p>
        <p>
          Person's Current State -{" "}
          {personState === 0 && <span style={{ fontWeight: "bold" }}>APPROACHING</span>}
          {personState === 1 && <span style={{ fontWeight: "bold" }}>CROSSING</span>}
          {personState === 2 && <span style={{ fontWeight: "bold" }}>LEAVING</span>}
          {personState === 3 && <span style={{ fontWeight: "bold" }}>NULL</span>}
        </p>
        <p>Timer to change door's state - {" "}<span style={{ fontWeight: "bold" }}>{gt}</span></p>
      </div>
      <div className="button-1">
        {dis && <button className='disa' >Set Configuration</button>}
        {!dis && <button className='config' onClick={() => { handleConfig() }} >Set Configuration</button>}
      </div>
      <div className="button-2">
        {!dis && <button className='disa' >Start</button>}
        {dis && <button className='config' onClick={() => { handleStart() }} >Start</button>}
        {dis && <button className='disa' >Off</button>}
        {!dis && <button className='off' onClick={() => { handleOff() }} >Off</button>}
      </div>
      <div className="button-3">
        {dis && <button className='disa' >Input</button>}
        {!dis && <button className='input' onClick={() => { handleInput() }} >Input</button>}
      </div>
      <div className="button-4">
        {!dis && <button className='disa' >Emergency Start</button>}
        {dis && <button className='em-start' onClick={() => { handleStart() }} >Emergency Start</button>}
        {dis && <button className='disa' >Emergency Off</button>}
        {!dis && <button className='em-off' onClick={() => { handleOff() }} >Emergency Off</button>}
      </div>
      <div className="button-5">
        <button className="query" onClick={() => setModalShow(true)}>
          Queries?
        </button>
      </div>
      <EmailModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default App;
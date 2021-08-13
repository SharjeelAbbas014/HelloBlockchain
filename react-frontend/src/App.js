import logo from './logo.svg';
import axios from "axios"
import {useEffect, useState} from "react"
import './App.css';

function App() {
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([])
  const sendTask = async()=>{
    const res = await axios.post("http://localhost:8000/add", {taskInput});
    console.log(res)
    const newTask = [...tasks, {id: res.id, title: taskInput}]
    setTasks(newTask);
  }
  const deleteF=async(id)=>{
    console.log(id)
    await axios.post("http://localhost:8000/delete", {id})
    setTasks((await axios.get("http://localhost:8000/")).data);

  }
  useEffect(async()=>{
    setTasks((await axios.get("http://localhost:8000/")).data);
  },[])
  return (
    <div className="App">
      <div className="back">
      <input type="text" value={taskInput} onChange={e=>{setTaskInput(e.target.value)}}/>
      <button className="addTask" onClick={sendTask}>ADD TASK</button>
      {
        tasks.map(t=>{
          console.log(t)
          if(tasks.length == 0){
            return null
          }
          return <div className="task"><p>{t.Record.title}</p><button onClick={()=>deleteF(t.Record.id)}>d</button></div>
        })
      }
    </div>
    </div>
  );
}

export default App;

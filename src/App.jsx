import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  useEffect(()=> {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
    
  }, [])

  const handleedit = (e, id) => {
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
     let newTodos = todos.filter(item=>{
      return item.id!==id
     });
    setTodos(newTodos)
    saveToLS()
  }

  const handledelete = (e, id) => {
     let newTodos = todos.filter(item=>{
      return item.id!==id
     });
    setTodos(newTodos)
    saveToLS()
  }

  const handleadd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }
  

  return (
    <>
      <Navbar />
      <div className="container mx-auto m-5 rounded-xl bg-violet-300 p-5 min-h-[80vh]">
        <div className="addTodo my-2">
          <h2 className='text-lg font-bold '>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-1/2' />
          <button onClick={handleadd} disabled={todo.length<=3} className='bg-purple-700
           hover:bg-purple-500 disabled:bg-purple-700 px-2 mx-4 text-white font-bold rounded-sm '>Save</button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished :
        <h2 className="text-lg font-bold my-2">Your Todos</h2>
        <div className="todos">
          {todos.length ===0 && <div className="m-5">No Todos to show</div> }
          {todos.map(item => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between w-1/2 my-2">
              <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id=""/>
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              <div className="buttons flex h-[100%]">
                <button onClick={(e)=>handleedit(e, item.id)} className='bg-purple-700 hover:bg-purple-500 px-2 mx-2 text-white font-bold rounded-sm '>Edit</button>
                <button onClick={(e)=>{handledelete(e, item.id)}} className='bg-purple-700 hover:bg-purple-500 px-2  text-white font-bold rounded-sm '>Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>

    </>
  )
}

export default App

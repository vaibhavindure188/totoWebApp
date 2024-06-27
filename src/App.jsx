import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts/index'
import TodoForm from './components/TodoForm'
import  TodoItem  from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([{id:1,todo:"message", completed: false}])
  const addTodo = (todo) =>{
    setTodos((pre) => [{ id:Date.now(), ...todo},...pre])  // we have used spread operator to spread todos array first by using pre
                //      object destructoring        array destr   //  and then we spread todo object(which is argument) to add unique id in that object
  }

  const updateTodo = (id, todo) =>{
    setTodos((pre) => pre.map((preTodo) =>(preTodo.id === todo.id ? todo : preTodo )));  // if you are using paranthesis for map no need to write return word
  }

  const deleteTodo = (id) =>{
    setTodos((pre) => pre.filter((todo)=> todo.id != id))
  }
  const toggleComplete = (id) =>{
    setTodos((pre) =>    // parameter consist of previous todoes   imp note you cant use {} here  
      pre.map((todo) =>(  // parameter consit of  each individual todo in the array (which is object)
        todo.id === id ?  { completed: !todo.completed , ...todo} : {todo} 
      ))
  )
  }
  

  // to update local storage when any change happens in todos array
  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos));
  },[todos])

  // to get the data from local storage  and set it into todos state at the beginning
  useEffect(()=>{
    let storedTodos = JSON.parse(localStorage.getItem('todos'))
    if(storedTodos.length > 0) setTodos(storedTodos);
  },[])  

  return (
    <div >
      <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}} >
        
        <TodoForm />
        {
 
         todos.map((todo)=>(
          <div key={todo.id} className='mx-60' >
            <TodoItem aTodo={todo} />
            
          </div>
         ))
        }


        
      </TodoProvider>
    </div>
  )
}

export default App

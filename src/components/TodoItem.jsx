import React, { useState } from 'react'
import { useTodo } from '../contexts';
import  './todoItem.css'

function TodoItem({aTodo}) {
    const [isEditable, setIsEditable] = useState(false);
    const [todomessage, setTodoMess] = useState(aTodo.todo);
    const {updateTodo, deleteTodo, toggleComplete} = useTodo();

    const editTodo = () =>{
        updateTodo(aTodo.id, { ...aTodo, todo:todomessage}) // it is replacing a new todo with todo having id
        setIsEditable(false) 
    }

    const toggleCompleting = () =>{
        toggleComplete(aTodo.id);   // this fun will change the value of completed ie false to true and vice versa
    }

    const deleting = () =>{
      deleteTodo(aTodo.id);
    }
  return (
    <>
      <div>
        <input className={`cursor-pointer mx-2 `}  type='checkbox'  checked={aTodo.completed} onChange={toggleCompleting}   />
        <input style={{borderRadius:'5px'}} type='text' className={`${aTodo.completed ? "line-through ":""} ${
          isEditable ? "border-transparent" : "  border-green focus:ring-8 focus-visible"
        }`} value={todomessage}  onChange={(e)=>setTodoMess(e.target.value)} readOnly={!isEditable} />
         <button style={{borderRadius:'20px'}} className='bg-emerald-950 text-white h-8 w-32 mx-6 my-1' onClick={()=>{
            if(aTodo.completed) return 
            if(isEditable){
              editTodo()
            }
            else setIsEditable((pre)=> !pre)  // imp note whenever you want to toggle or edit the value use callback
          }} 
          disabled={aTodo.completed } 
          >{isEditable ? "save" : "edit"}

         </button>

         <button style={{borderRadius:'20px'}} className='bg-emerald-950 text-white h-8 w-32' onClick={()=>deleting()}>delete</button>  
      </div>
    </>
  )
}

export default TodoItem

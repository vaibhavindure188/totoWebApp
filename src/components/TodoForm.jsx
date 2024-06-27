import React, { useState } from 'react'
import { useTodo } from '../contexts';

function TodoForm() {
    const [todomessage, setTodoMess]  = useState("");
    const {addTodo} = useTodo();

    const addingNewTodo = (e) =>{
        e.preventDefault();
        if(!todomessage)
            return;
        addTodo({todo: todomessage, completed: false})  // you can use 'id : Date.now()' here also instead of in main.jsx (object destructoring)
        setTodoMess("")
    }

  return ( 
    <>
     <form className='flex ml-48 mx-36 my-20 ' onSubmit={addingNewTodo}>
        <input style={{borderRadius:'20px'}} className='mx-20 bg-slate-700 w-64 text-center text-white' type='text' placeholder='write todo...' value={todomessage} onChange={(e)=> setTodoMess(e.target.value)} />
        <button style={{borderRadius:'20px'}} type='submit' className='bg-emerald-950 text-white h-8 w-32 '>add</button>
     </form> 
    </>
  )
}

export default TodoForm

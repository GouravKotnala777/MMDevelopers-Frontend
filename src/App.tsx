import { CheckCircleIcon, CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { color } from '@chakra-ui/react';
import React, { ChangeEvent, FC, KeyboardEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const App:FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [updatedTodo, setUpdatedTodo] = useState<{id:number; todo:string; isDone:boolean}>();
  const [todos, setTodos] = useState<{id:number; todo:string; isDone:boolean}[]>([]);
  const [isInpEmpty, setIsInpEmpty] = useState<boolean>(false);
  const [isUpdateActive, setIsUpdateActive] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<string>();
  const [haveTodoDone, setHaveTodoDone] = useState<string>("");
  const [s, setS] = useState<string>();
  const inpRef = useRef<any>("red");

  const handleAddTodo = () => {
    if (todo.trim() !== "") {
      setTodos([...todos, {id:Date.now(), todo, isDone:false}]);
      setTodo("");
      setIsInpEmpty(false);
    }
    else{
      setIsInpEmpty(true);
    }
  };

  const handleDeleteTodo = (q:number) => {
    setTodos((prev) => prev.filter(item => item !== todos[q]));
  };
  const handleUpdateTodo = (data:{id:number; todo:string; isDone:boolean}) => {
    setSelectedTodo(`todo_data${data.id}`);
    setS(`todo_data${data.id}`);
    
    let arr:{id:number; todo:string; isDone:boolean}[] = [];
    let findResult:{id:number; todo:string; isDone:boolean}|undefined = todos.find((q:{id:number; todo:string; isDone:boolean}) => q.id === data.id);    
    
    if (updatedTodo && updatedTodo.todo.trim() !== "") {
      console.log({updatedTodo});
      todos.forEach((q:{id:number; todo:string; isDone:boolean}) => {
        if (q.id !== findResult?.id) {
          arr.push(q);
        }
        else{
          if (updatedTodo) {
            arr.push(updatedTodo);
          }
        }
      });
      setTodos([...arr]);
      setUpdatedTodo(undefined);
      setSelectedTodo("");
    }

  };

  useEffect(() => {
    console.log("**********");
    console.log(selectedTodo);
    console.log("**********");
  }, [selectedTodo]);




  return (
    <AddBackground>
      {
        isInpEmpty ? <h1 style={{color:"red", position:"absolute"}}>Please Write Todo First1</h1> : <></>
      }
      <h2 className="main_header">Todo App</h2>
      <input
        className="create_todo_inp"
        type="text"
        placeholder="Enter a Todo"
        name="create_todo_inp"
        value={todo}
        onKeyDown={(e:KeyboardEvent<HTMLInputElement>) => e.code === "Enter" && handleAddTodo()}

        onChange={(e:ChangeEvent<HTMLInputElement>) => setTodo(e.target.value)}
      />
      <button className="create_todo_btn" onClick={handleAddTodo}>Go</button>
      <div className="todo_lists_cont" onClick={() => {}}>
        {
          todos.map((q:{id:number; todo:string; isDone:boolean}, index:number) => (
              <div className="todo_cont" key={index}>
                <input className="inp" id={`inp${q.id}`} style={{display:selectedTodo === `todo_data${q.id}` ? "block" : "none"}} onChange={(e:ChangeEvent<HTMLInputElement>) => setUpdatedTodo({id:Date.now(), todo:e.target.value, isDone:false})}/>
                {
                  haveTodoDone === `todo_data${q.id}` ?
                    <s className="todo_data" id={`todo_data${q.id}`} style={{display:selectedTodo === `todo_data${q.id}` ? "none" : "block"}}>{q.todo}</s>
                    :
                    <div className="todo_data" id={`todo_data${q.id}`} style={{display:selectedTodo === `todo_data${q.id}` ? "none" : "block"}}>{q.todo}</div>
                }
                
                <div className="todo_inps">
                  <button onClick={() => setHaveTodoDone(`todo_data${q.id}`)}><CheckIcon /></button>
                  <button onClick={() => handleUpdateTodo(q)}><EditIcon /></button>
                  <button onClick={() => handleDeleteTodo(index)}><DeleteIcon /></button>
                </div>
              </div>
            ))
        }
      </div>
    </AddBackground>
  );
};

export default App;

const AddBackground = styled.section`
  border:2px solid violet;
  box-sizing:border-box;

  .main_header{
    text-align:center;
  }
  .create_todo_inp{
    // border:2px solid indigo;
    width:70%;
    margin:1rem 0 1rem 11%;
    padding:0.5rem;
    font-size:1.1rem;
    border-radius:1rem 0 0 1rem;
    border-left:2px solid black;
    border-right:none;
    border-top:2px solid black;
    border-bottom:2px solid black;
  }
  .create_todo_btn{
    // border:2px solid indigo;
    width:2.5rem;
    padding:0.5rem;
    font-size:1.1rem;
    cursor:pointer;
    border-radius:0 1rem 1rem 0;
    border-left:none;
    border-right:2px solid black;
    border-top:2px solid black;
    border-bottom:2px solid black;
  }
  .create_todo_btn:hover{
    background:orange;
    color:white;
  }
  .todo_lists_cont{
    // border:2px solid blue;
    display:grid;
    grid-template-columns:repeat(3, 27%);
    grid-row-gap:2rem;
    // grid-column-gap:6%;
    justify-content:space-around;
    padding:1rem;
  }
    .todo_lists_cont .todo_cont{
      // border:2px solid green;
      display:grid;
      grid-template-columns:70% 30%;
      padding:0.4rem;
      border-radius:0.4rem;
      box-shadow:0.2px 0.2px 2px 0.1px gray;
      background:rgb(164, 229, 255);
      // border:2px solid rgb(72, 203, 255);

    }
      .todo_lists_cont .todo_cont .todo_data{
        // border:2px solid yellow;
        display:block;
      }
      .todo_lists_cont .todo_cont .inp{
        display:block;
        outline:none;
      }
      .todo_lists_cont .todo_cont .todo_inps{
        // border:2px solid orange;
        display:flex;
        justify-content:space-between;
      }
        .todo_lists_cont .todo_cont .todo_inps button{
          // border:2px solid red;
          cursor:pointer;
          background:rgb(255, 223, 164);;
          border-radius:0.2rem;
          outline:none;
          border:none;
        }


      @media (max-width:954px) {
        .todo_lists_cont{
          display:grid;
          grid-template-columns:repeat(3, 31%);
          grid-row-gap:1rem;
          // grid-column-gap:4%;
          justify-content:space-around;
          padding:1rem;
        }
          .todo_lists_cont .todo_cont{
            display:grid;
            grid-template-columns:71% 29%;
            padding:0.4rem;
            border-radius:0.4rem;
            box-shadow:0.2px 0.2px 2px 0.1px gray;
            background:rgb(164, 229, 255);
            // border:2px solid rgb(72, 203, 255);
          }
      }
      @media (max-width:825px) {
        .todo_lists_cont{
          display:grid;
          grid-template-columns:repeat(2, 45%);
          grid-row-gap:1rem;
          // grid-column-gap:4%;
          justify-content:space-around;
          padding:1rem;
        }
          .todo_lists_cont .todo_cont{
            display:grid;
            grid-template-columns:71% 29%;
            padding:0.4rem;
            border-radius:0.4rem;
            box-shadow:0.2px 0.2px 2px 0.1px gray;
            background:rgb(164, 229, 255);
            // border:2px solid rgb(72, 203, 255);
          }
      }
      @media (max-width:560px) {
        .create_todo_inp{
          margin:1rem 0 1rem 8%;
        }
        .todo_lists_cont{
          display:block;
          padding:1rem;
        }
          .todo_lists_cont .todo_cont{
            margin:0.5rem 0 0.5rem 0;
          }
      }
`;



import { AddIcon, CheckCircleIcon, CheckIcon, DeleteIcon, EditIcon, ExternalLinkIcon, HamburgerIcon, RepeatIcon } from '@chakra-ui/icons';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, IconButton, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, color, useDisclosure, useToast } from '@chakra-ui/react';
import React, { ChangeEvent, FC, KeyboardEvent, MouseEvent, SelectHTMLAttributes, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const App:FC = () => {
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [theme, setTheme] = useState<string>("rgb(156, 234, 255)");
  const [updatedTodo, setUpdatedTodo] = useState<{id:number; title:string; message:string; createAt:number; isDone:boolean; theme:string;}>({id:0, title:"", message:"", createAt:0, isDone:false, theme:""});
  const [todos, setTodos] = useState<{id:number; title:string; message:string; createAt:number; isDone:boolean; theme:string;}[]>([]);
  const [todosLocalStorage, setTodosLocalStorage] = useState<{id:number; title:string; message:string; createAt:number; isDone:boolean; theme:string;}[] | null>([]);
  const [isInpEmpty, setIsInpEmpty] = useState<boolean>(false);
  const [isUpdateActive, setIsUpdateActive] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<string>("");
  const [haveTodoDone, setHaveTodoDone] = useState<string>("");
  const [s, setS] = useState<string>();
  const toast = useToast();
  
  

  // function BackdropExample() {
    const Overlay = () => (
      <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
      />
      )
      
      const { isOpen:isOpenModal1, onOpen:onOpenModal1, onClose:onCloseModal1 } = useDisclosure()
      const { isOpen:isOpenModal2, onOpen:onOpenModal2, onClose:onCloseModal2 } = useDisclosure()
      const [overlay, setOverlay] = useState(<Overlay />)
  









  const handleAddTodo = () => {
    try {
        setTodos([...todos, {id:Date.now(), title:title, message:message, createAt:Date.now(), isDone:false, theme:theme}]);
        
        if (todosLocalStorage?.length !== 0 && todosLocalStorage !== null) {          
          window.localStorage.setItem("todos", JSON.stringify([...todosLocalStorage, {id:Date.now(), title:title, message:message, createAt:Date.now(), isDone:false, theme:theme}]));
        }
        else{
          window.localStorage.setItem("todos", JSON.stringify([{id:Date.now(), title:title, message:message, createAt:Date.now(), isDone:false, theme:theme}]));
        }
        setTitle("");
        setMessage("");
        setTheme("rgb(156, 234, 255)");
        setIsInpEmpty(false);
        onCloseModal1();
        toast({
          title:"Todo created Successfully",
          status:"success",
          position:"bottom-right",
          duration:3000
        });

    } catch (error) {
      toast({
        title:"error occured",
        status:"error",
        position:"bottom-right",
        duration:3000
      });
      onCloseModal1();
    }
  };
  const handleDeleteTodo = (q:number) => {
    if (todosLocalStorage) {

      if (todosLocalStorage.filter(item => item !== todosLocalStorage[q]).length !== 0) {
        setTodosLocalStorage(() => todosLocalStorage.filter(item => item !== todosLocalStorage[q]));
        window.localStorage.setItem("todos", JSON.stringify([...todosLocalStorage]));
      }
      else{
        setTodosLocalStorage(() => todosLocalStorage.filter(item => item !== todosLocalStorage[q]));
        window.localStorage.setItem("todos", JSON.stringify([]));
      }
      toast({
        title:"Todo Deleted Successfully",
        status:"success",
        position:"bottom-right",
        duration:3000
      });
      
    }
    
  };
  const handleUpdateTodo = (data:{id:number; title:string; message:string; createAt:number; isDone:boolean; theme:string;}) => {
    // setSelectedTodo(`todo_data${data.id}`);
    // setS(`todo_data${data.id}`);


    let arr:{id:number; title:string; message:string; createAt:number; isDone:boolean; theme:string;}[] = [];
    let findResult:{id:number; title:string; message:string; createAt:number; isDone:boolean; theme:string;}|undefined = todos.find((q:{id:number; title:string; message:string; createAt:number; isDone:boolean; theme:string;}) => q.id === data.id);

    console.log("%%%%%%%%%%%%%");
    console.log(data);
    console.log(findResult);
    console.log(updatedTodo);
    console.log("%%%%%%%%%%%%%");
    

    todosLocalStorage?.forEach((item:{id:number; title:string; message:string; createAt:number; isDone:boolean; theme:string;}) => {
      if (item.id !== data.id) {
        arr.push(item);
      }
      else{
        item = {id:item.id, title:updatedTodo.title, message:updatedTodo.message, createAt:item.createAt, isDone:item.isDone, theme:updatedTodo.theme};
        arr.push(item);
      }
    });
    window.localStorage.setItem("todos", JSON.stringify([...arr]));
    setTodos([...arr]);
    onCloseModal2();

    toast({
      title:"Todo Updated",
      status:"success",
      position:"bottom-right",
      duration:3000
    });


  };
  const handleIsDoneTodo = (q:number) => {
    let arr:{id:number; title:string; message:string; createAt:number; isDone:boolean; theme:string;}[] = [];
    todosLocalStorage?.forEach((item:{id:number; title:string; message:string; createAt:number; isDone:boolean; theme:string;}) => {
      if (item.id !== todosLocalStorage[q].id) {
        arr.push(item);
      }
      else{
        item.isDone = !item.isDone;
        arr.push(item);
        // arr.push({id:number, title:string, message:string, createAt:number, isDone:boolean, theme:string,})
      }
    });
    window.localStorage.setItem("todos", JSON.stringify([...arr]));
    setTodos([...arr]);

    if (arr[q].isDone) {
      toast({
        title:"Todo is done",
        status:"success",
        position:"bottom-right",
        duration:3000
      });
    }
    else{
      toast({
        title:"Todo is not done",
        status:"warning",
        position:"bottom-right",
        duration:3000
      });

    }
  }

  useEffect(() => {
    // console.log("**********");
    // console.log(selectedTodo);
    // console.log("**********");
  }, [selectedTodo]);

  useEffect(() => {
    let localStogaget:{id:number; title:string; message:string; createAt:number; isDone:boolean; theme:string;}[] | null | string = window.localStorage.getItem("todos");
    console.log("**********");
    console.log(localStogaget);
    console.log("**********");
    
    if (localStogaget) {
      setTodosLocalStorage(JSON.parse(localStogaget));
    }
  }, [todos]);



  return (
    <AddBackground>
      {
        isInpEmpty ? <h1 style={{color:"red", position:"absolute"}}>Please Write Todo First1</h1> : <></>
      }
      {/* <pre>{JSON.stringify(selectedTodo, null, `\t`)}</pre> */}
      <h2 className="main_header">Todo App</h2>
        <>
          <Button
            onClick={() => {
              setOverlay(<Overlay />)
              onOpenModal1();
            }}
          >
            Use Overlay one
          </Button>
          {
              <Modal isCentered isOpen={isOpenModal1} onClose={onCloseModal1}>
                {overlay}
                <ModalContent width="50%">
                  <ModalHeader>Create Todo</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Input placeholder="Title" name="title_inp" required margin="0.1rem" onChange={(e:ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
                    <Input placeholder="Message" name="message_inp" required margin="0.1rem" onChange={(e:ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)} />
                    <Select name="theme_inp" value={theme} margin="0.1rem" onChange={(e) => setTheme(e.target.value)}>
                      <option value="rgb(124, 227, 255)">default</option>
                      <option value="rgb(255, 157, 157)">red</option>
                      <option value="rgb(255, 215, 141)">orange</option>
                      <option value="rgb(255, 255, 159)">yellow</option>
                      <option value="rgb(158, 255, 158)">green</option>
                      <option value="rgb(132, 255, 255)">cyan</option>
                      <option value="rgb(137, 137, 255)">blue</option>
                      <option value="rgb(201, 126, 255)">indigo</option>
                      <option value="rgb(255, 164, 255)">violet</option>
                      <option value="">none</option>
                    </Select>
                  </ModalBody>
                  <ModalFooter >
                    <Button colorScheme="red" marginRight="1rem" onClick={onCloseModal1}>Close</Button>
                    <Button onClick={handleAddTodo}>Create</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
          }
        </>

      <div className="todo_lists_cont">
        {
          todosLocalStorage?.map((q:{id:number; title:string; message:string; createAt:number; isDone:boolean; theme:string;}, index:number) => (
                          <div className="todo_cont" style={{background:q.theme}} key={index}>
                            {/* <input className="inp"  onChange={(e:ChangeEvent<HTMLInputElement>) => setUpdatedTodo({id:Date.now(), title:e.target.value, message:"", createAt:Date.now(), isDone:false, theme:""})}/> */}
                            { selectedTodo === `modal${q.id}` ?
                              (<Modal id={`modal${q.id}`} isOpen={isOpenModal2} onClose={onCloseModal2} isCentered>
                                  {overlay}
                                  <ModalContent width="50%">
                                    <ModalHeader>Update Todo {index}</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                      <Input placeholder="Title" name="title" required margin="0.1rem" onChange={(e:ChangeEvent<HTMLInputElement>) => setUpdatedTodo({...updatedTodo, title:e.target.value})} />
                                      <Input placeholder="Message" name="message" required margin="0.1rem" onChange={(e:ChangeEvent<HTMLInputElement>) => setUpdatedTodo({...updatedTodo, message:e.target.value})} />
                                      <Select name="theme" value={theme} margin="0.1rem" onChange={(e) => setUpdatedTodo({...updatedTodo, theme:e.target.value})}>
                                        <option value="rgb(124, 227, 255)">default</option>
                                        <option value="rgb(255, 157, 157)">red</option>
                                        <option value="rgb(255, 215, 141)">orange</option>
                                        <option value="rgb(255, 255, 159)">yellow</option>
                                        <option value="rgb(158, 255, 158)">green</option>
                                        <option value="rgb(132, 255, 255)">cyan</option>
                                        <option value="rgb(137, 137, 255)">blue</option>
                                        <option value="rgb(201, 126, 255)">indigo</option>
                                        <option value="rgb(255, 164, 255)">violet</option>
                                        <option value="">none</option>
                                      </Select>
                                    </ModalBody>
                                    <ModalFooter >
                                      <Button colorScheme="red" marginRight="1rem" onClick={onCloseModal2}>Close</Button>
                                      <Button onClick={() => {handleUpdateTodo(q)}}>Update</Button>
                                    </ModalFooter>
                                  </ModalContent>
                                </Modal>)
                                :
                                ("")
                            }
                            {
                              q.isDone ?
                                <s className="todo_data">{q.title}</s>
                                :
                                <div className="todo_data" id={`todo_data${q.id}`} style={{display:selectedTodo === `todo_data${q.id}` ? "none" : "block"}}>{q.title}</div>
                            }
                            <div className="todo_inps">
                              <Menu>
                                <MenuButton
                                  as={IconButton}
                                  aria-label='Options'
                                  icon={<HamburgerIcon />}
                                  variant='outline'
                                  onClick={() => setSelectedTodo(`modal${q.id}`)}
                                  // width="4rem"
                                />
                                <MenuList>
                                  <MenuItem icon={<AddIcon />} command='⌘T'>
                                    New Tab
                                  </MenuItem>
                                  <MenuItem icon={<ExternalLinkIcon />} command='⌘N'>
                                    New Window
                                  </MenuItem>
                                  <MenuItem icon={<RepeatIcon />} command='⌘⇧N'>
                                    Open Closed Tab
                                  </MenuItem>
                                  <MenuItem icon={<DeleteIcon />} command='⌘⇧N' onClick={() => handleDeleteTodo(index)}>
                                    Delete Todo
                                  </MenuItem>
                                  {/* <MenuItem icon={<EditIcon />} command='⌘O' onClick={() => handleUpdateTodo(q)}> */}
                                  <MenuItem icon={<EditIcon />} command='⌘O' onClick={() => {setOverlay(<Overlay />); onOpenModal2();}}>
                                    Edit Todo
                                  </MenuItem>
                                </MenuList>
                              </Menu>
                              <button onClick={() => handleIsDoneTodo(index)}><CheckIcon /></button>
                              <button onClick={() => handleDeleteTodo(index)}><DeleteIcon /></button>
                            </div>
                            <div className="todo_message">
                              {q.message}
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
      // background:rgb(164, 229, 255);
      // border:2px solid rgb(72, 203, 255);
      grid-row-gap:1rem;

    }
      .todo_lists_cont .todo_cont .todo_data{
        // border:2px solid yellow;
        display:block;
        font-weight:bold;
        margin-left:0.4rem;
      }
      .todo_lists_cont .todo_cont .inp{
        display:block;
        outline:none;
      }
      .todo_lists_cont .todo_cont .todo_inps{
        // border:2px solid orange;
        display:flex;
        justify-content:space-between;
        // width:2rem;
      }
        .todo_lists_cont .todo_cont .todo_inps button{
          // border:2px solid red;
          cursor:pointer;
          // background:rgb(255, 223, 164);
          border-radius:0.2rem;
          outline:none;
          border:none;
        }
    .todo_message{
      // border:2px solid red;
      grid-column:1/-1;
      padding:0.2rem;
      border-radius:0.5rem;
      word-break: break-all;
      background:white;
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
            // background:rgb(164, 229, 255);
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
            // background:rgb(164, 229, 255);
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



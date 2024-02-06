import { FC, MouseEventHandler, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "./redux/reducer/userReducer";



const TestingComponent:FC = () => {
    const [num, setNum] = useState<number>(0);
    const [list1, setList] = useState<number[]>([]);
    const dispatch = useDispatch();


    const addUserHandler = (payload:number) => {
        setList([...list1, list1.length+1]);
        dispatch(addUser(payload));

    };
    const removeUserHandler = () => {
        setList([]);
    };
    
    return(
        <div style={{border:"2px solid green", margin:"10px", background:"gainsboro"}}>
            <h1>Testing Component</h1>

            <button style={{border:"2px solid black"}} onClick={() => addUserHandler(list1.length)}>Add New User</button>
            <button style={{border:"2px solid black"}} onClick={removeUserHandler}>Remove All Users</button>
            <ul>
                {
                    list1.map((item, index) => {
                        return <li key={index}>{item}</li>
                    })
                }
            </ul>

        </div>
    )
}

export default TestingComponent;
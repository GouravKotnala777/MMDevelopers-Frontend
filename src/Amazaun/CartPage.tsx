import { FC, useState } from "react"
import HomePage from "./HomePage"
import TestingComponent from "./TestingComponent";


const CartPage:FC = () => {
    const [num, setNum] = useState<number>(0);
    const [list, setList] = useState<number[]>([]);
    const addUserHandler = () => {
        setList([...list, list.length+1]);

    };
    const removeUserHandler = () => {
        setList([]);

    };
    
    return(
        <div style={{border:"2px solid blue"}}>
            <HomePage />
            <h1>Cart</h1>

            <button style={{border:"2px solid black"}} onClick={addUserHandler}>Add New User</button>
            <button style={{border:"2px solid black"}} onClick={removeUserHandler}>Remove All Users</button>
            <ul>
                {
                    list.map((item, index) => {
                        return <li key={index}>{item}</li>
                    })
                }
            </ul>
            <TestingComponent />

        </div>
    )
}

export default CartPage;
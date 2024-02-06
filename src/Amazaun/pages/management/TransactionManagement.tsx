import styled from "styled-components";
import AdminSideBar from "../../components/AdminSideBar";
import { ChangeEvent, FormEvent, useState } from "react";
import naruto from "../../naruto.jpg";
import { OrderItemType, OrderType } from "../../../types";
import { Link } from "react-router-dom";


const orderItems:OrderItemType[] = [
    {
        name:"Puma Shoes",
        photo:naruto,
        _id:"asasdasad",
        quantity:4,
        price:2000
    }
];

const TransactionManagement = () => {
    const [order, setOrder] = useState<OrderType>({
        name:"Naruto",
        address:"Ho.No.371",
        city:"Faridabad",
        country:"India",
        state:"Haryana",
        pinCode:121002,
        status:"Processing",
        subtotal:1000,
        discount:100,
        shippedCharges:100,
        tax:0,
        total:1000,
        orderItems,
        _id:"asdasdada",

    });

    const {name,address,city,country,state,pinCode,status,subtotal,discount,shippedCharges,tax,total,_id} = order;

    const updateHandler = () => {
        setOrder(prev => ({
            ...prev, status:prev.status === "Processing"?"Shipped":"Delivered"
        }))
    };

    return(
        <TransactionManagementBackground>
            <AdminSideBar />
            <main className="main">
                <section>
                    <h2>Order Item</h2>
                    {
                        order.orderItems.map(i => (
                            <ProductCard name={i.name} photo={i.photo} price={i.price} quantity={i.quantity} _id={i._id} />
                        ))
                    }
                </section>
                <article className="shipping_info_card">
                    <h1>Order Info</h1>
                    <h5>User Info</h5>
                    <p>Name:{name}</p>
                    <p>address:{`${address}, ${city}, ${state}, ${country}, ${pinCode}`}</p>
                    <h5>Amount Info</h5>
                    <p>Subtotal: {subtotal}</p>
                    <p>Shipping Charges: {shippedCharges}</p>
                    <p>Tax: {tax}</p>
                    <p>Discount: {discount}</p>
                    <p>Total: {total}</p>
                    <h5>Status Info</h5>
                    <p>Status: <span style={{color:status === "Delivered"?"purple":status==="Shipped"?"green":"red"}}>{status}</span></p>
                    <button onClick={updateHandler}>Process Status</button>
                </article>

            </main>
        </TransactionManagementBackground>        
    )
};

const ProductCard = ({name, photo, price, quantity, _id}:OrderItemType) => (
    <div className="transaction_product_card">
        <img src={photo} alt={name} />
        <Link to={`/product/${_id}`}>{name}</Link>
        <span>${price} X {quantity} = ${price * quantity}</span>
    </div>
);


export default TransactionManagement;

const TransactionManagementBackground = styled.section`
border:2px solid red;
display:grid;
grid-template-columns:20% 80%;
height:100vh;
    .aa{
        border:2px solid blue;
        height:100%;
    }
    .main{

        // border:2px solid green;
        display:flex;
        // align-items:center;
        justify-content:space-around;
        // display:grid;
        // place-content:center;
    }
    .shipping_info_card{
        // border:2px solid red;
    }
        .shipping_info_card h1{
            font-weight:bold;
            font-size:1.1rem;
        }
        .shipping_info_card h5{
            font-weight:bold;
            font-size:0.9rem;
        }
        .shipping_info_card p{
            font-size:0.9rem;
        }
        .shipping_info_card button{
            // border:2px solid red;
            margin:1rem 0;
            padding:0.4rem;
            width:100%;
            background:rgb(5,107,224);
            color:white;

        }
        .shipping_info_card button:hover{
            opacity:0.8;
        }
`;
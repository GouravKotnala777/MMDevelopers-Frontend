import styled from "styled-components";
import AdminSideBar from "../../components/AdminSideBar";
import { ChangeEvent, FormEvent, useState } from "react";
import naruto from "../../naruto.jpg";
import HomePage from "../../HomePage";

const ProductManagement = () => {
    const [name, setName] = useState<string>("Puma Shoes");
    const [price, setPrice] = useState<number>(2000);
    const [stock, setStock] = useState<number>(10);
    const [photo, setPhoto] = useState<string>(naruto);

    const [nameUpdated, setNameUpdated] = useState<string>(name);
    const [priceUpdated, setPriceUpdated] = useState<number>(price);
    const [stockUpdated, setStockUpdated] = useState<number>(stock);
    const [photoUpdated, setPhotoUpdated] = useState<string>(photo);

    const changeImageHandler = (e:ChangeEvent<HTMLInputElement>) => {
        const file:File|undefined = e.target.files?.[0];

        const reader:FileReader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (typeof reader.result == "string") setPhotoUpdated(reader.result);
            }
        }
    };

    const submitHandler = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setName(nameUpdated);
        setPrice(priceUpdated);
        setStock(stockUpdated);
        setPhoto(photoUpdated);
    };

    return(
        <ProductManagementBackground>
            <AdminSideBar />
            <HomePage />
            <main className="main">
                <section className="product_management_section" style={{position:"relative"}}>
                    {
                        stock > 0 ?
                        (<span style={{color:"rgb(0, 235, 0)", position:"absolute", top:"0", right:"0"}}>{stock} Available</span>)
                        :
                        (<span style={{color:"rgb(255, 0, 0)", position:"absolute", top:"0", right:"0"}}>Not Available</span>)
                    }
                    <strong>ID - sdasdad</strong>
                    <img src={photo} alt="product" />
                    <p>{name}</p>
                    <strong>${price}</strong>
                </section>
                <article className="transaction_management_article">
                    <form className="transaction_management_form" onSubmit={submitHandler}>
                        <h2>Update Product</h2>
                        <div>
                            <label>Name</label>
                            <input type="text" placeholder="Name" value={nameUpdated} onChange={(e) => setNameUpdated(e.target.value)} required />
                        </div>
                        <div>
                            <label>Price</label>
                            <input type="number" placeholder="Price" value={priceUpdated} onChange={(e) => setPriceUpdated(Number(e.target.value))} required />
                        </div>
                        <div>
                            <label>Stock</label>
                            <input type="number" placeholder="Stock" value={stockUpdated} onChange={(e) => setStockUpdated(Number(e.target.value))} required />
                        </div>
                        <div>
                            <label>Photo</label>
                            <input type="file" placeholder="Photo" onChange={changeImageHandler} />
                        </div>

                        {photoUpdated && <img src={photoUpdated} alt="New_Image" style={{width:"25%"}} />}

                        <button type="submit">Update</button>
                    </form>
                </article>
            </main>
        </ProductManagementBackground>        
    )
};

export default ProductManagement;

const ProductManagementBackground = styled.section`
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
        justify-content:center;
        // display:grid;
        // place-content:center;
    }
    .product_management_section{
        
    }
    
    .transaction_management_article{
        // border:2px solid green;
        height:90vh;
        padding:1.5rem;
        width:100%;
        max-width:400px;
        background-color:white;
        border-radius:5px;
        box-shadow:5px 5px 10px rgba(0,0,0,0.216);
        // display:flex;
        // align-items:center;
        // justify-content:center;
        // display:grid;
        // place-content:center;
    }
        .transaction_management_article .transaction_management_form {
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:space-between;
            // border:2px solid yellow;
            height:100%;
        }
            .transaction_management_article .transaction_management_form h2{
                text-transform:uppercase;
                letter-spacing:2px;
            }
            .transaction_management_article .transaction_management_form img{
                object-fit:cover;
                border-radius:5px;
                // margin:10px auto;
                // border:2px solid blue;
            }
            .transaction_management_article .transaction_management_form div{
                width:100%;
                position:relative;
            }
                .transaction_management_article .transaction_management_form div label{
                    position:absolute;
                    left:0;
                    top:-1.5rem;
                }
                .transaction_management_article .transaction_management_form div input{
                    padding:0.5rem;
                    border:1px solid rgba(13, 13, 13, 0.196);
                    width:100%;
                    outline:none;
                    border-radius:5px;
                }
            .transaction_management_article .transaction_management_form button{
                padding:1rem;
                border:none;
                background-color:rgb(5, 107, 224);
                color:white;
                width:100%;
                border-radius:5px;
                font-size:1.1rem;
                // cursor:pointer;
                // border:1px solid rgba(13, 13, 13, 0.196);
            }

@media screen and (width <= 600px){
grid-template-columns:100%;
// z-index:2;
    .main{

        // border:2px solid green;
        display:flex;
        flex-direction:column;
        // align-items:center;
        // justify-content:center;
    }
    .product_management_section img{
        margin:10px auto;
    }
    .transaction_management_article{
        border:2px solid green;
        height:90vh;
        padding:1.5rem;
        margin:10px auto;
        width:100%;
        max-width:400px;
        background-color:white;
        border-radius:5px;
        box-shadow:5px 5px 10px rgba(0,0,0,0.216);
        // display:flex;
        // align-items:center;
        // justify-content:center;
        // display:grid;
        // place-content:center;
    }
    // .transaction_management_article .transaction_management_form div label{
    //     position:absolute;
    //     left:0;
    //     top:-1.5rem;
    // }
    // .transaction_management_article .transaction_management_form div input{
    //     padding:0.5rem;
    //     border:1px solid rgba(13, 13, 13, 0.196);
    //     width:100%;
    //     outline:none;
    //     border-radius:5px;
    // }
} 
`;
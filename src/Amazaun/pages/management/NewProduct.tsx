import styled from "styled-components";
import AdminSideBar from "../../components/AdminSideBar";
import { ChangeEvent, useState } from "react";
import HomePage from "../../HomePage";


const NewProduct = () => {
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number>();
    const [stock, setStock] = useState<number>();
    const [photo, setPhoto] = useState<string>();

    const changeImageHandler = (e:ChangeEvent<HTMLInputElement>) => {
        const file:File|undefined = e.target.files?.[0];

        const reader:FileReader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (typeof reader.result == "string") setPhoto(reader.result);
            }
        }
    };

    return(
        <NewProductBackground>
            <AdminSideBar />
            <HomePage />
            <main className="main">
                <article className="new_product_article">
                    <form className="new_product_form">
                        <h2>New Product</h2>
                        <div>
                            <label>Name</label>
                            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div>
                            <label>Price</label>
                            <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
                        </div>
                        <div>
                            <label>Stock</label>
                            <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(Number(e.target.value))} required />
                        </div>
                        <div>
                            <label>Photo</label>
                            <input type="file" placeholder="Photo" value={photo} onChange={changeImageHandler} required />
                        </div>

                        {photo && <img src={photo} alt="New_Image" />}

                        <button type="submit">Create</button>
                    </form>
                </article>
            </main>
        </NewProductBackground>
    )
};

export default NewProduct;

const NewProductBackground = styled.section`
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
        // display:flex;
        // align-items:center;
        // justify-content:center;
        display:grid;
        place-content:center;
    }
    .new_product_article{
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
        .new_product_article .new_product_form {
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:space-between;
            // border:2px solid yellow;
            height:100%;
        }
            .new_product_article .new_product_form h2{
                text-transform:uppercase;
                letter-spacing:2px;
            }
            .new_product_article .new_product_form img{
                object-fit:cover;
                border-radius:5px;
            }
            .new_product_article .new_product_form div{
                width:100%;
                position:relative;
            }
                .new_product_article .new_product_form div label{
                    position:absolute;
                    left:0;
                    top:-1.5rem;
                }
                .new_product_article .new_product_form div input{
                    padding:0.5rem;
                    border:1px solid rgba(13, 13, 13, 0.196);
                    width:100%;
                    outline:none;
                    border-radius:5px;
                }
            .new_product_article .new_product_form button{
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
} 
`;
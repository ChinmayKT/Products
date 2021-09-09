import React , {useState } from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom'


const CreateProduct = () => {

    const [product ,setProduct] = useState({
        name:'',
        price : '',
        description:''    
    })
    const [nameError, setNameError] = useState({});
    const [priceError, setPriceError] = useState({});
    const [descriptionError, setDescriptionError] = useState({});

    const history =  useHistory()

    const onChangeInput =  (e) => {
        const {name , value} = e.target;
        setProduct({...product , [name]: value})
    }

    const createProduct = async e => {
        e.preventDefault()
        const isValid = formValidation();

        try {
           
            if(isValid){
                const token = localStorage.getItem('tokenStore')
                if(token){
                    const { name , price , description } = product;
                  
                    const newProduct = {
                        name , price , description
                    }
                 
                   await axios.post('/api/products', newProduct , {
                        headers : {Authorization:token}
                    })
            }
           
                return history.push('/')
              
            }
        } catch (err) {
            // window.location.href = '/';
            console.log(err.message)
        }
    }


    const formValidation = () => {
        const nameError = {};
        const priceError = {};
        const descriptionError = {};
    
        let isValid = true;
    
        if (!product.name) {
          nameError.nameIsShort = "Required";
          isValid = false;
        }
        if (!product.price) {
          priceError.priceIsInvalid = "Required";
          isValid = false;
        }
        if (!product.description) {
            descriptionError.descriptionIsInvalid = "Required";
            isValid = false;
          }
       
    
        setNameError(nameError);
        setPriceError(priceError);
        setDescriptionError( descriptionError);
    
        return isValid;
      };


    return (
        <div className="create-note" >
            <h2>Add Product</h2>
            <form onSubmit={createProduct} autoComplete ="off"  >
                
            

                <div className="row" >
                    <label htmlFor="name" >Name</label>
                    <input type="text" value={product.name} id="name" placeholder="Name"
                    name = "name" onChange = {onChangeInput} maxlength = "36"  />
                </div>

                {Object.keys(nameError).map((key, i) => {
              return (
                <div key={i} style={{ color: "red" }}>
                  {nameError[key]}
                </div>
              );
            })}

                <div className="row" >
                    <label htmlFor="price" >Price</label>
                    <input type="text" value={product.price} id="price" placeholder="Price"
                    name = "price"  onChange = {onChangeInput}   />
                </div>

                
            {Object.keys(priceError).map((key, i) => {
              return (
                <div key={i} style={{ color: "red" }}>
                  {priceError[key]}
                </div>
              );
            })}

                <div className="row" >
                    <label htmlFor="description" >Description</label>
                    <textarea type="text" value={product.description} id="description" placeholder="Description"
                    name = "description" row="10" onChange={onChangeInput}/>
                </div>

                {Object.keys(descriptionError).map((key, i) => {
              return (
                <div key={i} style={{ color: "red" }}>
                  {descriptionError[key]}
                </div>
              );
            })}

              

                <button  type="submit" >Save</button>
            </form>
            
        </div>
    )
}

export default CreateProduct

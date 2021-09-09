import React , {useState } from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom'

const CreateProduct = () => {

    const [product ,setProduct] = useState({
       
        name:'',
        price : '',
        description:''
        
    })

    const history =  useHistory()

    const onChangeInput =  (e) => {
        const {name , value} = e.target;
        setProduct({...product , [name]: value})
    }

    const createProduct = async e => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('tokenStore')
            if(token){
                const { name , price , description } = product;
              
                const newProduct = {
                    name , price , description
                }
             
               await axios.post('/api/products', newProduct , {
                    headers : {Authorization:token}
                })

              

                return history.push('/')
              
            }
        } catch (err) {
            // window.location.href = '/';
            console.log(err.message)
        }
    }



    return (
        <div className="create-note" >
            <h2>Add Product</h2>
            <form onSubmit={createProduct} autoComplete ="off"  >
                
            

                <div className="row" >
                    <label htmlFor="name" >Name</label>
                    <input type="text" value={product.name} id="name" placeholder="Name"
                    name = "name" required onChange = {onChangeInput} maxlength = "36"  />
                </div>

                <div className="row" >
                    <label htmlFor="price" >Price</label>
                    <input type="text" value={product.price} id="price" placeholder="Price"
                    name = "price" required onChange = {onChangeInput}   />
                </div>

                <div className="row" >
                    <label htmlFor="description" >Description</label>
                    <textarea type="text" value={product.description} id="description" placeholder="Description"
                    name = "description" required row="10" onChange={onChangeInput}/>
                </div>

              

                <button  type="submit" >Save</button>
            </form>
            
        </div>
    )
}

export default CreateProduct

import React , {useState , useEffect} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom'

const EditProduct = ({match}) => {

    const [product ,setProduct] = useState({
      
        name:'',
        price : '',
        description:'',
       
    })

    const history =  useHistory()

    useEffect(()=>{
        const getProduct = async () => {
            const token = localStorage.getItem('tokenStore')
        
            if(match.params.id){
                const res= await axios.get(`/api/products/${match.params.id}` , {
                    headers: {Authorization : token}
                })

                console.log(res)
              

                const Data = res.data.pro

                setProduct({ 
                  
                    name : Data.name,
                    price: Data.price,
                    description : Data.description,
                    

                })
            }
        }
        getProduct()
    },[match.params.id])

    const onChangeInput =  (e) => {
        const {name , value} = e.target;
        setProduct({...product , [name]: value})
    }

    const editProduct = async e => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('tokenStore')
         
            if(token){
                const { name , price , description } = product;
                const newProduct = {
                    name , price , description
                }
              
                await axios.put(`/api/products/${match.params.id}`, newProduct , {
                    headers : {Authorization:token}
                })
             

                return history.push('/')
      
            }
        } catch (err) {
            // window.location.href = '/';
            console.log(err)
        }
    }

console.log(product)

    return (
        <div className="create-note" >
            <h2>Edit Product</h2>
            <form onSubmit={editProduct} autoComplete ="off"  >
           

                <div className="row" >
                    <label htmlFor="name" >Name</label>
                    <input type="text" value={product.name} id="name" placeholder="Name"
                    name = "name" required onChange = {onChangeInput}   />
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

export default EditProduct

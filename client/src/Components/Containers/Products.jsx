import React , {useState , useEffect}from "react";
import axios from "axios";
import {Link} from 'react-router-dom'

const Students = ({ pro , loading }) => {
    const [product, setProduct] = useState([]);
  const [token, setToken] = useState("");

  const getProducts = async (token) => {
    const res = await axios.get("/api/products", {
      headers: { Authorization: token },
    });
 
    setProduct(res.data); 
  };

  console.log(pro)
useEffect(() => {
  const token = localStorage.getItem("tokenStore");

  setToken(token);
  if (token) {
    getProducts(token);
  }
}, []);

const deleteProduct = async (id) => {
  console.log(id);
  let x = window.confirm("Are you sure to delete this Product?");
  if (x) {
    try {
      if (token) {
       
        await axios.delete(`/api/products/${id}`, {
          headers: { Authorization: token },
        });
        getProducts(token);
      
        alert("Product Will be Deleted");
        window.location.href = '/';
      }
    } catch (error) {
    
      window.location.href = '/';
    }
  } else {
    alert("Action canceled");
  }
};

 
  return (
    <div>
      <div className="note-wrapper">
        {pro.map((product) => (
          <div className="card" key={product._id}>
            <div>
              Name : {product.name} 
              <div>
              Price : ₹{product.price}

              </div>
             

              <div className="text-wrapper" >
              Description :{product.description} 
              </div>

              <div className="card-footer" >
              <Link to={`edit/${product._id}`} className="edit">    Edit </Link>
              ||  <Link className="delete" onClick={() => deleteProduct(product._id)}>  DELETE </Link>
              </div>
              
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Students;

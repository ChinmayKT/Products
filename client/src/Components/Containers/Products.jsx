import React , {useState , useEffect}from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



const Products = ({ pro , loading }) => {
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

  pro.map((product)=>{
    console.log(product._id)
  })
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const classes = useStyles();
  return (
   
     <div>

<TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center" >ID</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center" styles={{width:'20px'}} >Description</TableCell>
            <TableCell align="center">Created__At</TableCell>
            <TableCell align="center">Updated__At</TableCell>
            <TableCell align="center">Added_by_User</TableCell>
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pro.map((product) => (
            <TableRow key={product._id}>
              <TableCell align="center"> {product._id} </TableCell>
              <TableCell align="center">  {product.name}</TableCell>
              
              <TableCell align="center">₹{product.price}</TableCell>
              <TableCell align="center" styles={{width:'20px'}} >{product.description}</TableCell>
              <TableCell align="center">{product.createdAt.substring(0,10)}</TableCell>
              <TableCell align="center">{product.updatedAt.substring(0,10)}</TableCell>
              <TableCell align="center">{product.username}</TableCell>
              <TableCell align="center" ><Link to={`edit/${product._id}`} className="edit"> Edit</Link></TableCell>
              <TableCell align="center" > <Link className="delete"onClick={() => deleteProduct(product._id)} > DELETE </Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


       
        
      
        {/* {pro.map((product) => (
           <Col  sm={12} md={6} lg={4} xl={3}>
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
          </Col>
        ))} */}
         
         </div>
   
  );
};

export default Products;

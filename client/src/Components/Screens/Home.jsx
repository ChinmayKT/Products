import React, { useState, useEffect} from "react";

import axios from "axios";
import Products from '../Containers/Products'
import Pagination from '../Containers/Pagination'



const Home = ({match}) => {

  const [loading , setLoading] = useState(false)
  const [product, setProduct] = useState([]);
  const [token, setToken] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerpage] = useState(5)

  const keyword = match.params.keyword

  const getProducts = async (token , keyword ='') => {
    const res = await axios.get(`/api/products?keyword=${keyword} `, {
      headers: { Authorization: token },
    });
   
    setProduct(res.data); 
  };

useEffect(() => {
  const token = localStorage.getItem("tokenStore");
  setToken(token);
  if (token) {
    getProducts(token , keyword);
  }
}, [keyword]);

const getCurrentProducts = () => {
    const indexoflastProduct = currentPage * productsPerpage 
    const indexoffirstProduct = indexoflastProduct - productsPerpage 
    const currentProducts = product.slice(indexoffirstProduct , indexoflastProduct)
 
    return currentProducts
}
  
  const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
    <div>
     
              <Products pro = {getCurrentProducts()} loading={loading} />
      
        

      <div>
      <Pagination className="page-footer"
                productsPerpage = {productsPerpage} 
                totalProducts = {product.length}
                paginate = {paginate}
              />
      </div>
        
    

      
    </div>
  );
};

export default Home;

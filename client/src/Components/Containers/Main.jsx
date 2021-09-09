import React from 'react'
import Header from './Nav'
import Home from '../Screens/Home'
import CreateProduct from '../Screens/CreateProduct'
import EditProduct from '../Screens/EditProduct'

import { BrowserRouter as Router , Route } from 'react-router-dom'

const Students = ({setIslogin}) => {
    return (
      <Router>
          <div className="notes-page" >
             <Header setIslogin= {setIslogin} />
             <section>
                 <Route  path="/search/:keyword" component={Home}/>   
                 <Route  path="/" component={Home} exact />                     
                 <Route  path="/create" component={CreateProduct} exact />
                 <Route  path="/edit/:id" component={EditProduct} exact />             
             </section>          
          </div>
      </Router>
    )
}

export default Students

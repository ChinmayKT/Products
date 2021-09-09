import React , {useState , useEffect} from 'react'
import {Link , Route } from 'react-router-dom';
import Search from './Search'

import axios from 'axios';

const Nav = ({setIslogin}) => {

    let [profile ,setProfile] = useState({})

    useEffect(()=>{
       const getData = async () => {
           const data = await axios.get('/users/profile' , {
               headers : {Authorization : localStorage.getItem('tokenStore')}
           })
           const userData = data.data.user
           setProfile(userData)          
       }
       getData()
    },[setProfile])
    
      const logoutSubmit = () =>{
        localStorage.clear()
        setIslogin(false)
    }
    return (
       <header>
             
           <div  class="logo" >
               <h4><Link to="/" >Products</Link></h4>    
           </div>
           <div className ='searching' >
               <Route render = {({history})=> <Search   history = {history} />} />
            </div>
           <ul>
               <li><Link> Name : {profile.username} </Link></li>
               <li><Link to="/" >Home</Link></li>
               <li><Link to="/create">Add Products</Link></li>
              
               <li onClick= {logoutSubmit} ><Link to="/">Logout</Link></li>
           </ul>

       </header>
    )
}

export default Nav

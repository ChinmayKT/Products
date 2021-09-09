import React , {useState , useEffect} from 'react';
import axios from 'axios';
import Login from './Components/Screens/Login'
import Students from './Components/Containers/Main';
import Footer from './Components/Containers/Footer.jsx'


function App() {

  const [isLogin , setIslogin] = useState(false)

  useEffect(()=>{ 
    const checkLogin = async () => {
      const token = localStorage.getItem('tokenStore')
    
      if(token){
        const verified = await axios.get('/users/verify', {
          headers : {Authorization : token}
        })
      
        setIslogin(verified.data)

        if(verified.data === false) return localStorage.clear()

      }else{
        setIslogin(false)
      }
    }

    checkLogin()
  },[])

  
  return (
    <div className="App">
      {
        isLogin ?  
        <div>
          <Students setIslogin= {setIslogin} /> 
        
          <Footer/>
        </div>
        
        : <Login  setIslogin= {setIslogin} />
      }
      
     
    </div>
  );
}

export default App;

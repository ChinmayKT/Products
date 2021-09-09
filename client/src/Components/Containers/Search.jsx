import React , {useState } from 'react'



const Search = ({history}) => {
   
    const [keyword , setKeyword] = useState('')

    const searchHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()) {
            history.push(`/search/${keyword}`)
        }else{
           history.push('/')
        }
    }

    return (
        <div>
            <form onSubmit={searchHandler} >
                <input type="text" 
                 name='search'
                 className ='searchBox'
                 onChange={(e)=>setKeyword(e.target.value)} 
                 Placeholder ='Search Products'
                  /> 
                 

                  <button  className='searchButton' type="submit" > Search </button>
            </form>
            
        </div>
    )
}

export default Search

import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link, useLocation} from 'react-router-dom';

const Update = () => {
    const navigate = useNavigate();
    const location = useLocation();


    const temp = location.pathname.split("/")
    const id = temp[2]
    

    const [book, getBook] = useState({});
    const [bks, setBooks] = useState({
      name: "",
      author: "",
      genre: "Fiction",
  });
    
    useEffect(() => {
        const fetchBook = async () =>{
          try{
            const res = await axios.get("http://localhost:3001/books/"+ id);
            
            getBook(res.data)
            setBooks(res.data)
            console.log("hggj");
          }
          catch(err){
              console.log(err)
          }
        }
        fetchBook();
      }, [])


    console.log(book[0])
    
    

      

     


      

    const handleChange = (e) => {
        setBooks((prev) => ({...prev, [e.target.name]: e.target.value}));
      };
    
      
    
      const handleClick = async (e) => {
        e.preventDefault()
        try{
          const res = await axios.put("http://localhost:3001/books/"+id, bks);
          navigate("/");
        }
        catch(err){
          console.log(err)
        }
      }

  return (
    <div>
    <div className='Form'> 
      <h1>Update Book</h1>
      <input type="text" placeholder='name' onChange = {handleChange} name='name' value={book.name}/>
      <input type="text" placeholder='author' onChange = {handleChange} name='author' value={book.author}/>
      <select name='genre' onChange = {handleChange} placeholder='none' value={book.genre}>
        <option value="Fiction">Fiction</option>
        <option value="Non-fiction">Non-fiction</option>
        <option value="Novel">Novel</option>
      </select>
    <button onClick={handleClick}>Update</button>
      
  </div>  </div>
    
  )
}

export default Update
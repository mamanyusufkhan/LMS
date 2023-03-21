import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link} from 'react-router-dom';

const AddBookForm = () => {

  const [books, getBooks] = useState([]);
  const [bks, setBooks] = useState({
    name: "",
    author: "",
    genre: "Fiction",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [entryPerPage, setEntryPerPage] = useState(10);
  const pageNumbers = [];
  const totalEntries = books.length;
  for (let i = 1; i <= Math.ceil(totalEntries/entryPerPage); i++){
    pageNumbers.push(i);
  }
  console.log(pageNumbers)


  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchAllBooks = async () =>{
      try{
        const res = await axios.get("http://localhost:3001/books");
        getBooks(res.data)
      }
      catch(err){
          console.log(err)
      }
    }
    fetchAllBooks();
  }, [])

  console.log(books)

  const indexOfLastEntry = currentPage * entryPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entryPerPage;
  const currentEntry = books.slice(indexOfFirstEntry, indexOfLastEntry); 

  const handleChange = (e) => {
    setBooks((prev) => ({...prev, [e.target.name]: e.target.value}));
  };

  console.log(bks)

  const handleClick = async (e) => {
    e.preventDefault()
    try{
      const res = await axios.post("http://localhost:3001/books", bks);
      window.location.reload();
    }
    catch(err){
      console.log(err)
    }
  }

  const handleDelete = async (id) =>{
    try{
      const res = await axios.delete("http://localhost:3001/books/"+id);
      window.location.reload();
    }
    catch(err){
      console.log(err)
    }
  }

  const paginate = pageNumber => setCurrentPage(pageNumber);


  return (
    <div>
    <div className='Form'> 
      <h1>Add New Book</h1>
      <input type="text" placeholder='name' onChange = {handleChange} name='name'/>
      <input type="text" placeholder='author' onChange = {handleChange} name='author'/>
      <select name='genre' onChange = {handleChange} placeholder='none'>
        <option value="Fiction">Fiction</option>
        <option value="Non-fiction">Non-fiction</option>
        <option value="Novel">Novel</option>
      </select>
    <button onClick={handleClick}>Add</button>
      
  </div>  


    <h1>Book List</h1>
    <div className='Books'>
      <table cellPadding={20} border="1">
      <thead>
      <tr>
      <th>id</th>
      <th>Name</th>
      <th>Author</th>
      <th>Genre</th>
      </tr>
      </thead>  
      <tbody>
      {currentEntry.map(book=>(
        // <div className='Book' key={book.id}>
          <tr key={book.id}>
          <td>{book.id}</td>
          <td>{book.name}</td> 
          <td>{book.author}</td> 
          <td>{book.genre}</td> 
          <td><button className='delete' onClick={() => handleDelete(book.id)}>Delete</button>
          <button className='update'><Link to={`update/${book.id}`}>Update</Link></button>
          </td>
          </tr>
        // </div>
      ))}
      </tbody>
      </table> 
      
      <nav>
        <ul className='pagination'>
          {pageNumbers.map(number => (
            <li key={number} className="page-item">
              <a onClick={() => paginate(number)} className='PageLink'>{number}</a>
            </li>
          ))}
        </ul>
        </nav> 

    </div>
    
    </div>
  )
}

export default AddBookForm

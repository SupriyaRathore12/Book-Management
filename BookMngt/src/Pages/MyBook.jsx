import React from 'react'
import { useState } from 'react';
import {ToastContainer, toast} from "react-toastify";

const MyBook = () => {
  const [book, setBook] = useState({
    image: "",
    name: "",
    author: "",
    description: "",

  })
  const changeHandler = (e) => {
    let { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };
  const changeImageHandler = (e) => {
    const file = e.target.files[0];

    if (file) {
      const readFile = new FileReader();

      readFile.onloadend = () => {
        setBook((prev) => ({
          ...prev,
          image: readFile.result,
        }))
      }
      readFile.readAsDataURL(file);
    }
  }
  const submitHandler = (e) => {
    e.preventDefault();
    if(!book.image || !book.name ||!book.author || !book.description){
      toast.error("All files are required");
      return;
    }
    const newBook={...book,id:Date.now()};
    const bookExisted=JSON.parse(localStorage.getItem("book-data"))||[];
    bookExisted.push(newBook);
    localStorage.setItem("book-data",JSON.stringify(bookExisted));

    toast.success("Book added successful")
    setBook({
      image: "",
      name: "",
      author: "",
      description: "",
    })
  }

  return (
    <div>

      <form action="" className='login-form' onSubmit={submitHandler}>
      <ToastContainer position='top-center' autoClose={1500} theme='dark'/>

        <h4>Add Your Books--</h4>
        <label htmlFor="name"> Book Name:</label>
        <input
          type="text" id="name"
          name="name"
          placeholder='Enter Book name'
          value={book.name}
          onChange={changeHandler}
        />
        <label htmlFor="Author name" >Author Name:</label>
        <input type="text"
          id="author"
          name="author"
          placeholder='Enter Author name'
          value={book.author}
          onChange={changeHandler}
        />
        <label htmlFor="desc">Book Description:</label>
        <textarea name="description"
          id="desc"
          value={book.description}
          onChange={changeHandler}>

        </textarea>
        <label htmlFor="">Choose Book img:</label>
        <input
          type="file"
          name="" id=""
          accept='image/*'
          onChange={changeImageHandler}

        />
        <button type='submit' className='button'>Add Books</button>

      </form>
     


    </div>
  )
}

export default MyBook

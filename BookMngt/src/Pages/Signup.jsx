import React from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import {ToastContainer,toast} from "react-toastify";

function Signup () {
  const[formData,setformData]=
  useState({
    name: '', 
    email: '', 
    phone: '',
     password: '',
  })
  const changeHandler=(e)=>{
    let {name,value}=e.target;
    console.log(name,value);
    
  
  setformData((prev)=>({
    ...prev,
    [name]:value,
  }));
  setErrors((prevErrors)=>({
    ...prevErrors,
    [name]:"",
  
  }))
}; 

const submitHandler = (e) => {
  e.preventDefault();
  const validateErrors = formValidator();
  setErrors(validateErrors);
  if(Object.keys(validateErrors).length===0){
    let existingUsers=JSON.parse(localStorage.getItem("user-Data")) || [];
    const updatedUsers=[...existingUsers,formData];
    localStorage.setItem("user-Data", JSON.stringify(updatedUsers));
    toast.success("Signup successful!");
  setformData({
    name: '', 
    email: '', 
    phone: '',
     password: '',
  })

  }

}
const [errors,setErrors]=useState({});
const formValidator=()=>{
  let newErrors={};
  let {name,email,password,phone,}=formData;

  //Name Validation
  if(name.trim().length<2){
    newErrors.name="Name must be atleast 2 characters long";
  }
  const isValidName= /^[a-zA-Z ]*$/;
  if(!isValidName.test(name)){
    newErrors.name="Enter a valid name";
  }
  //Email Validation
  const isValidEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!isValidEmail.test(email)) {
    newErrors.email="Enter a valid email address";
  }
  const isValidPhone=  /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;
  if(!isValidPhone.test(phone)){
    newErrors.phone="Enter a valid phone number";
  }
  //Password Validation
  const isValidPassword=  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,20}$/;
  if (!isValidPassword.test(password)) {
    newErrors.password="Password must be 8-20 characters."
  }

  return newErrors;
}
  return (
    <>
    <form action="" className='login-form' onSubmit={submitHandler}>
      <ToastContainer/>
        <h4>SignUp Form--</h4>
        <label htmlFor="name">Name:</label>
        <input 
        type="text" id="name" name="name" placeholder='Enter your name' value={formData.name} onChange={changeHandler} />
        {errors.name && <span className='error'>{errors.name}</span>}
        <label htmlFor="email">Email:</label>
        <input type="text" name="email" id="email" placeholder='Enter your Email' value={formData.email} onChange={changeHandler}/>
        {errors.email && <span className='error'>{errors.email}</span>}
        <label htmlFor="phone">Phone No:</label>
      <input type="number" name="phone" id="phone" placeholder="Enter your phone number" value={formData.phone} onChange={changeHandler} /> 
      {errors.phone && <span className='error'>{errors.phone}</span>}
        <label htmlFor="password">Password:</label>
        <input type="text" name="password" id="pswd" placeholder='Enter your password' value={formData.password} onChange={changeHandler}/>
        {errors.password && <span className='error'>{errors.password}</span>}
        <button type="submit" className='button'>Signup</button>
        <p>Already have an account <Link to="/login">Login</Link></p>

    </form>
    </>
  )
}

export default Signup

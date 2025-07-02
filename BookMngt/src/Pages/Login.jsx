import { Link } from 'react-router-dom'
import "./Login.css"
function Login() {
  return (
    <>
     <form action="login-form" className='login-form'>
      <h4>Login Form--</h4>
      <label htmlFor="password">Password:</label>
      <input type="password" id="pswd" placeholder="Enter Your Password"/>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" placeholder="Enter your name" />
      <label htmlFor="phone">Phone No:</label>
      <input type="number" name="" id="phone" placeholder="Enter your phone number" />
      <button type="submit" className='button'>Login</button>
      <p>If you don't have any account please<Link to="/signup" > Signup</Link></p>
     </form>
    </>
  );
}
export default Login;

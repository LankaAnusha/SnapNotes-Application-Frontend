import React, { useReducer,useRef,useState } from 'react';
import '../Styles/Signup_Style.css';
import user_image from '../Images/user_account.png';
import mail from '../Images/mail.png';
import password from '../Images/password.png';
import passwordshow from '../Images/password_show.png';
import password_hide from '../Images/hide.png';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
const initialState = {id:'',username: '', email: '', password: '' };
const reducer = (state, action) => {
  switch (action.type) {
    case 'setUsername':
      return { ...state, username: action.payload};
    case 'setEmail':
      return { ...state, email: action.payload };
    case 'setPassword':
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

function Signup() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [errors, setErrors] = useState({});
  const [password_show,setPassword_Show]=useState(false)
  const pwd_ref=useRef(null)
  const navigate=useNavigate()
  const validateForm = () => {
    const errors = {};
    if (!state.username.trim()) {
      errors.username = 'Username is required';
    }
    if (!state.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(state.email)) {
      errors.email = 'Email is invalid';
    }
    if (!state.password.trim()) {
      errors.password = 'Password is required';
    }
    else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!#^%*?&])[A-Za-z\d@$!#^%*?&]{7,}/.test(state.password)) {
      errors.password = 'Password must be at least 7 characters long, starting with a capital letter, and containing alphabets, numbers, and special symbols';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios.post('http://localhost:1965/postuserdetails',state)
      .then((res)=>{
       const ele=document.getElementById('saved-details')
       ele.innerHTML='Your details saved. Successfully!! Once login to continue further'
       ele.style.backgroundColor='rgb(96, 235, 96)'
       ele.style.boxShadow='1px 1px 2px 2px rgb(96,235,96)'
       ele.style.padding='5px'
       ele.style.marginBottom='20px'
       ele.style.borderRadius='10px'
        setTimeout(()=>navigate('/Signin'),2500)})
      .catch((err)=>console.log(err))
  }
};
  const handlePassword=()=>{
    if(pwd_ref.current){
      pwd_ref.current.style.backgroundColor='#AAC4FF'
      pwd_ref.current.style.border='none'
      pwd_ref.current.type='password'
      setPassword_Show(false)
    }
  }
  const handlePassword1=()=>{
    if(pwd_ref.current){
      pwd_ref.current.style.backgroundColor='#AAC4FF'
      pwd_ref.current.style.border='none'
      pwd_ref.current.type='text'
      setPassword_Show(true)
    }
  }
  return (
    <>
      <main>
      <h5 id='saved-details'></h5>
        <form onSubmit={handleSubmit}>
          <h3 style={{ textShadow: '1px 1px 3px black' }}>SIGN UP</h3>
          <section>
            <div className='signup-item-1'>
                <img src={user_image} style={{ height: '20px' }} />
                <input type='text' placeholder='Username'  onChange={(e) =>{dispatch({ type: 'setUsername', payload: e.target.value })}} />           
            </div>
            {errors.username && <span className="error">{errors.username}</span>}
            <hr />
            <div className='signup-item-2'>
                <img src={mail} style={{ height: '20px',width:'20px'}} />
                <input type='email' placeholder='Email' onChange={(e) => dispatch({ type: 'setEmail', payload: e.target.value })} />
            </div>
            {errors.email && <span className="error">{errors.email}</span>}
            <hr />
            <div className='signup-item-3'>
              <div className='user-password'>
              <img src={password} style={{ height: '20px'}} />
              <input type='password' placeholder='Password' ref={pwd_ref} onChange={(e) => dispatch({ type: 'setPassword', payload: e.target.value })}/>
              {password_show?<figure><img src={passwordshow} onClick={handlePassword} style={{height:'20px',marginLeft:'90px',marginBottom:'-10px'}}/></figure>
              :<figure><img src={password_hide} onClick={handlePassword1} style={{height:'20px',marginBottom:'-10px'}}/></figure>}
              </div>
            </div>
            {errors.password && <span className="error">{errors.password}</span>}
            <hr />
          </section>
         <button type='submit'>Sign Up</button>
          <h6 style={{ cursor: 'pointer' }}></h6>
        </form>
      </main>
    </>
  );
}

export default Signup;

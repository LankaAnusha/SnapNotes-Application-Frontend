import React,{useState,useReducer,useRef} from 'react'
import '../Styles/Signin_Style.css';
import mail from '../Images/mail.png';
import password from '../Images/password.png'
import {useNavigate} from 'react-router-dom'
import passwordshow from '../Images/password_show.png';
import password_hide from '../Images/hide.png';
import axios from 'axios'
const initialState = { email: '', password: '' };

const reducer = (state, action) => {
  switch (action.type) {
    case 'setEmail':
      return { ...state, email: action.payload };
    case 'setPassword':
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

function Signin() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [errors, setErrors] = useState({});
    const [forgotPassword,setForgotPassword]=useState(false)
    const navigate=useNavigate()
    const [password_show,setPassword_Show]=useState(false)
    const [password_show1,setPassword_Show1]=useState(false)
    const pwd_ref=useRef(null)
    const pwd_ref1=useRef(null)
    const validateForm = () => {
        const errors = {};
        if (!state.email.trim()) {
          errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(state.email)) {
          errors.email = 'Email is invalid';
        }
        if (!state.password.trim()) {
          errors.password = 'Password is required';
        }
        else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$#^!%*?&])[A-Za-z\d@$#^!%*?&]{7,}/.test(state.password)) {
          errors.password = 'Password must be at least 7 characters long, starting with a capital letter, and containing alphabets, numbers, and special symbols';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
      };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
          axios.get(`http://localhost:1965/getuserdetails/${state.email}?password=${state.password}`)
          .then((res)=>{
            setTimeout(()=>navigate('/',{state:res.data}))
        })
          .catch((err)=>{
           if(err.response.data.message==='Invalid Password' || err.response.data.message==='Invalid Email' ){
            const ele=document.getElementById('error-details')
            ele.innerHTML=`Invalid Email or Password. Please Try Again`;
            ele.style.color='black'
            ele.style.marginBottom='20px'
            ele.style.border='1px solid red'
            ele.style.padding='10px'
            ele.style.backgroundColor='#ffb3b3'
            ele.style.borderRadius='5px'
           }
          }) 
    }
};

const handleChangePassword=(e)=>{
  axios.patch('http://localhost:1965/updateuserpassword',{email:state.email,newPassword:pwd_ref1.current.value})
  e.preventDefault()
  setForgotPassword(false)
  pwd_ref.current.value=''
}

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
  const handlePassword2=()=>{
      if(pwd_ref1.current){
        pwd_ref1.current.style.backgroundColor='#AAC4FF'
        pwd_ref1.current.style.border='none'
        pwd_ref1.current.type='password'
        setPassword_Show1(false)
      }
    }
    const handlePassword3=()=>{
      if(pwd_ref1.current){
        pwd_ref1.current.style.backgroundColor='#AAC4FF'
        pwd_ref1.current.style.border='none'
        pwd_ref1.current.type='text'
        setPassword_Show1(true)
      }
    }
  const handleForgotPassword=()=>{
    setForgotPassword(true)
    pwd_ref.current.value=''
  }
    return ( <>
    <main>
       {!forgotPassword && <h6 id='error-details'></h6> } 
    <form>
      {forgotPassword?<>
        <h3 style={{textShadow:'1px 1px 3px black',wordSpacing:'5px'}}>Reset your password</h3>
        <section>
        <div className='signin-item-1'>
            <img src={mail} style={{height:'20px',opacity: '0.6'}}/>
            <input type='email' placeholder='Enter Email' value={state.email} disabled></input>
        </div>
            {errors.email && <span className="error">{errors.email}</span>}
        <hr/>
        <div className='signin-item-2'>
            <div className='user-password'>
            <img src={password} style={{height:'20px'}}/>
            <input id='newpassword' type='password' ref={pwd_ref} placeholder='Enter New Password'></input>
            </div>
            {password_show?<figure><img src={passwordshow} onClick={handlePassword} style={{height:'20px',marginBottom:'-10px'}}/></figure>
            :<figure><img src={password_hide} onClick={handlePassword1} style={{height:'20px',marginBottom:'-10px'}}/></figure>}
        </div>
        {errors.password && <span className="error">{errors.password}</span>}
        <hr/>
        <div className='signin-item-3'>
            <div className='user-password'>
            <img src={password} style={{height:'20px'}}/>
            <input type='password' ref={pwd_ref1} placeholder='Confirm New Password' onChange={(e) => dispatch({ type: 'setPassword', payload: e.target.value })}></input>
            </div>
            {password_show1?<figure><img src={passwordshow} onClick={handlePassword2} style={{height:'20px',marginBottom:'-10px'}}/></figure>
            :<figure><img src={password_hide} onClick={handlePassword3} style={{height:'20px',marginBottom:'-10px'}}/></figure>}
        </div>
        {errors.password && <span className="error">{errors.password}</span>}
        <hr/>
        </section>
        <button onClick={handleChangePassword}>Save Password</button>
      </>:<>
        <h3 style={{textShadow:'1px 1px 3px black'}}>LOG IN</h3>
        <section>
        <div className='signin-item-1'>
            <img src={mail} style={{height:'20px'}}/>
            <input type='email' placeholder='Email' onChange={(e) => dispatch({ type: 'setEmail', payload: e.target.value })}></input>
        </div>
            {errors.email && <span className="error">{errors.email}</span>}
        <hr/>
        <div className='signin-item-2'>
            <div className='user-password'>
            <img src={password} style={{height:'20px'}}/>
            <input type='password' ref={pwd_ref} placeholder='Password' onChange={(e) => dispatch({ type: 'setPassword', payload: e.target.value })}></input>
            </div>
            {password_show?<figure><img src={passwordshow} onClick={handlePassword} style={{height:'20px',marginBottom:'-10px'}}/></figure>
            :<figure><img src={password_hide} onClick={handlePassword1} style={{height:'20px',marginBottom:'-10px'}}/></figure>}
        </div>
        {errors.password && <span className="error">{errors.password}</span>}
        <hr/>
        <div className='signin-item-3'>
          <div className='remember-me'>
            <input type='checkbox'></input><h6>Remember Me</h6>
          </div>
            <h6 style={{cursor:'pointer'}} onClick={handleForgotPassword}>Forgot Password?</h6>
        </div>
        </section>
        <button onClick={handleSubmit}>Log In</button>
      </>}
        
    </form>
    </main>
    
    </> );
}

export default Signin;
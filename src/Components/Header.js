import React ,{useState,useEffect} from 'react'
import '../Styles/Header_Style.css'
import account from '../Images/account.png'
import themes from '../Images/themes.png'
import 'bootstrap/dist/css/bootstrap.css';
import {Link,useNavigate} from 'react-router-dom'
import user from '../Images/user.png'

function Header(props) {
    const navigate=useNavigate()
    const [user_name, setUser_name] = useState('');
    const [theme,setTheme]=useState(false)
    useEffect(()=>{
        if (props.state) {
            setUser_name(props.state.username);
              const ele= document.getElementById('user-image')
              if(ele){ele.src=user
            ele.style.height='32px'}
           }
    },[props.state])
    const handleTrash=()=>{
        const ele=document.getElementById('trash')
        ele.style.backgroundColor='#7c9fef'
        ele.style.padding='3px'
        ele.style.width='100px'
        ele.style.borderRadius='5px'
        ele.style.color='whitesmoke'
        ele.style.textAlign='center'
        const ele1=document.getElementById('all')
        ele1.style.backgroundColor='whitesmoke'
        ele1.style.color='black'
        const ele2=document.getElementById('fav')
        ele2.style.backgroundColor='whitesmoke'
        ele2.style.color='black'
        props.trash()
    }
    function handleAll(){
        props.allnotes()
        document.getElementById('trash').style.backgroundColor=''
        document.getElementById('trash').style.color='black'
        document.getElementById('trash').style.padding=''
        document.getElementById('trash').style.width=''
        document.getElementById('fav').style.backgroundColor=''
        document.getElementById('fav').style.color='black'
        document.getElementById('fav').style.padding=''
        document.getElementById('fav').style.width=''
        const ele=document.getElementById('all')
        ele.style.backgroundColor='#7c9fef'
        ele.style.padding='3px'
        ele.style.width='100px'
        ele.style.borderRadius='5px'
        ele.style.color='whitesmoke'
        ele.style.textAlign='center'
    }
    function handleFav(){
        const ele=document.getElementById('fav')
        ele.style.backgroundColor='#7c9fef'
        ele.style.padding='3px'
        ele.style.width='100px'
        ele.style.borderRadius='5px'
        ele.style.color='whitesmoke'
        ele.style.textAlign='center'
        const ele1=document.getElementById('all')
        ele1.style.backgroundColor='whitesmoke'
        ele1.style.color='black'
        document.getElementById('trash').style.backgroundColor=''
        document.getElementById('trash').style.color='black'
        document.getElementById('trash').style.padding=''
        document.getElementById('trash').style.width=''
        props.favnotes()
    }
    function handleTheme(){
        setTheme(true)
        const ele=document.querySelector('.header-item-3')
        ele.style.backgroundColor='whitesmoke'
    }
    function handleDark(){
        props.handleDarkTheme();setTheme(false)
    }
    function handleLight(){
        props.handleLightTheme();setTheme(false)
    }
    return ( <>
    <div className='header'>
    <header>
     <div className='header-item-1'>
        <img src={account} id='user-image' alt='Image' onMouseOver={()=>{
           const ele= document.getElementById('acc')
           ele.style.display='flex'
           ele.style.gap='25px'
           document.querySelector('header').style.height='65px'
        }} onClick={()=>{const ele= document.getElementById('acc')
        ele.style.display='none'
        document.querySelector('header').style.height='40px'}}/>
        {user_name?<h4>{user_name}</h4>:(
            <div id='acc'>
            <Link to='/Signin' style={{textDecorationLine:'none'}}><h4 className='signin'>Sign In</h4></Link>
            <Link to='/Signup' style={{textDecorationLine:'none'}}><h4 className='signin'>Sign Up</h4></Link>
          </div>
        )}
        <div id='acc'>
        {user_name&&(<h4 onClick={()=>{
            setUser_name('')
            document.getElementById('user-image').src=account
            document.querySelector('header').style.height='40px'
            navigate('/',{state:undefined})
        }}>Logout</h4>)}
        </div>
     </div>
     <div className='header-item-2'>
        <h4 id='all'  style={{cursor:'pointer'}} onClick={handleAll}>All Notes</h4>
        <h4  id ='fav' style={{cursor:'pointer'}} onClick={handleFav}>Favourites</h4>
        <h4 id='trash' onClick={handleTrash} style={{cursor:'pointer'}}>Trash</h4>
    </div>
        <div className='header-item-3'>
        {theme?
        <>
        <table border='1'>
            <tr>
                <td onClick={handleDark}>Dark</td>
                <td onClick={handleLight}>Light</td>
            </tr>
        </table>
        </>
        :
        <>
        <img src={themes} alt='Image' style={{marginTop:'-7px',height:'20px'}}></img><h4 onClick={handleTheme}>Theme</h4>
        </>}
        </div>
    </header>
    </div>
    </> );
}

export default Header;
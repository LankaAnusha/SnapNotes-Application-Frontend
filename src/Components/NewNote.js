import React, { useContext, useReducer, useState } from 'react';
import '../Styles/New-Note.css';
import newnote from '../Images/new-note.png';
import noteimage from '../Images/image-gallery.png';
import title from '../Images/title.png';
import {UserContext} from './Application'

let date=new Date()
let updatedDate=date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()
const initialdata = { UserId: '', NoteId:'', title: '', image: '', content: '',date:updatedDate,fav:false};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setTitle':
      return { ...state, title: action.value };
    case 'setContent':
      return { ...state, content: action.value };
    case 'setImage':
      return { ...state, image: action.value }; 
    default:
      return state;
  }
}

function NewNote({handlenewNote}) {
  const [image, setImage] = useState(null);
  const [notesdata, dispatch] = useReducer(reducer, initialdata);
  const userId=useContext(UserContext)
  const [extradata,setExtraData]=useState(true)
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch({ type: 'setImage', value: reader.result });
    };
    reader.readAsDataURL(file);
  };
  function handleSubmit() {
    if (!notesdata.content.trim()) {
      alert('Please enter your Title and Content ');
      return;
    }
    notesdata.UserId=userId
    setTimeout(()=>{
    const ele1=document.getElementById('note-title-content')
    ele1.value=''
    ele1.style.height ='30px'
    const ele2=document.getElementById('new-note-content')
    ele2.value=''
    ele2.style.height ='70px'
    setImage(null)
    setExtraData(true)
    },1000)
    handlenewNote(notesdata)
  };
  function auto_grow(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.style.height = (element.scrollHeight) + "px";
    }
  }  
  function auto_grow1(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.style.height = '145px'
    }
  }  
  const handleExtraData=()=>{setExtraData(false);
    document.getElementById('new-note').style.height='fit-content';
  }
  return (
    <div id='new-note' className='new-note'>
      <div className='add-note-title'>
        {extradata && <h5 style={{textAlign:'justify',color:'#F3CA52',border:'1px solid #F3CA52',padding:'10px',borderRadius:'10px'}}>Adding a note is simple - just jot down your thoughts, ideas, or reminders in a few quick taps. It's an effortless way to keep track of important information,
           whether it's for work, school, or personal use. With just a few sentences, you can capture and organize your thoughts to stay productive 
           and focused throughout the day.</h5>}
        <div className='add-note-title-img'>
        <img src={newnote} style={{height:'20px',width:'30px'}} alt="Add Note" />
        <h5>Add Note</h5>
        </div>
      </div>
      <div className='note-title'>
        <img src={title} alt="Note Title" />
        <textarea onFocus={handleExtraData} onKeyUp={() => auto_grow('note-title-content')} placeholder='Title of Note' onChange={(e) => dispatch({ type: 'setTitle', value: e.target.value })} id='note-title-content'></textarea>
      </div>
      <hr />
      {!image&&
      <>
      <div className='new-note-image'>
      <img src={noteimage} alt="Image" />
      <label htmlFor="files" style={{ fontSize: '17px', width: '1200px', cursor: 'pointer' }}>Select Relevant Image for your note</label>
      <input id="files" style={{ visibility: 'hidden' }} type="file" onChange={handleImageChange} />
    </div>
    <hr />
    </>}
      
      {image && (
        <>
          <div>
            <img src={URL.createObjectURL(image)} alt="Selected Image" style={{ height: '150px', width: '250px', backgroundSize: 'cover', borderRadius: '10px',boxShadow:'1px 1px 2px 1px #b9bbc1',marginBottom:'13px' }} />
          </div>
          <hr />
        </>
      )}
      <textarea id='new-note-content' onKeyUp={() => auto_grow1('new-note-content')}placeholder='Type the Data for your Note here' onChange={(e) => dispatch({ type: 'setContent', value: e.target.value })}></textarea>
      <center><button onClick={handleSubmit}>Add Note</button></center>
    </div>
  );
}

export default NewNote;

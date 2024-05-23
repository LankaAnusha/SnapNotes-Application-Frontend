import React,{useState} from 'react'
import '../Styles/main-component.css'
import notes from '../Images/sticky-notes.png'
import Notes from './Notes'
import NewNote from './NewNote'
import DisplayNote from './DisplayNote'
import newnote from '../Images/plus.png'


function MainComponent(props) {
    const [displaynote,setDisplayNote]=useState(false)
    const [newNote,setNewNote]=useState({})
    const [trashnote,setTrashNote]=useState({})
    const [editednote,setEditedNote]=useState({})
    const [favnote,setFavNote]=useState({})
    const [note,setNote]=useState({})
    const [restorenote,setRestoreNote]=useState({})
    const [like,setLike]=useState('')
    function handleDisplayNote(data){
      setNote(data)
      setDisplayNote(true);  
      document.getElementById('maincomp-section').style.minWidth='500px'
      
    }
    function handleNewNote(){
      setDisplayNote(false)
    }
    function handleTrashNote(data){
    setTrashNote(data)
    setDisplayNote(false)
    }
    function handlenewNote(notedata)
    {
      setNewNote(notedata)
    }
    function handleeditNote(editeddata,notedata)
    {
      const updatedNote = { ...notedata, content: editeddata };
      setEditedNote(updatedNote);
    }
    function handleFavNote(notedata,like){
      setLike(like)
      var likednote={data:notedata,like:like}
      setFavNote(likednote)
    }

    function handleRestoreNote(notedata)
    {
      document.getElementById('maincomp-section').style.minWidth='1000px'
      setRestoreNote(notedata)
      setDisplayNote(false)
    }
    return (<>
    <>
    <div className='main-notes'>
    <section id='maincomp-section' style={{minWidth: (props.Trash || props.fav) &&'1000px'}}>
       <div className='header'>
        <img src={notes} alt='Image' style={{height:'25px'}}></img><h5 >{props.fav?'Favorite':(props.Trash?'Deleted':'All')} Notes</h5>
        {(!props.Trash && displaynote  && !props.fav)&& <img src={newnote} alt='Image' onClick={handleNewNote} style={{cursor:'pointer',position:'relative',left:'310px',height:'30px'}}/>}
       </div>
       <div className='all-notes'>
        <Notes favnotes={props.fav} displayNote={handleDisplayNote} newNote={newNote} favNote={favnote} display={displaynote} restoreNote={restorenote} editedNote={editednote} TrashNote={trashnote} noteType={props.Trash} allnotes={props.allnotes}/>
       </div>
    </section>
    <article>
      {(displaynote)&& <DisplayNote notedata={note} fav={props.fav} trash={props.Trash} all={props.allnotes} handleFavNote={handleFavNote} handleeditNote={handleeditNote} handleTrashNote={handleTrashNote} handleRestoreNote={handleRestoreNote}/>}
     {(!displaynote && !props.Trash && !props.fav) && <NewNote handlenewNote={handlenewNote}/>}
    </article>
   
    </div>
    </>
    </>  );
}

export default MainComponent;
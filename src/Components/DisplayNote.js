import React, { useState ,useEffect} from 'react';
import '../Styles/DisplayNote_Style.css';
import before_fav from '../Images/before-fav.png';
import trashimage from '../Images/delete.png';
import editnote from '../Images/edit.png';
import favourite from '../Images/favorite.png'

function DisplayNote({ fav,notedata,handleRestoreNote,handleTrashNote,handleFavNote,handleeditNote,trash,all}) {
    const [editedContent, setEditedContent] = useState(notedata.content);
    const [edit,setEdit]=useState(false)
    const handleContentChange = (event) => {
        setEditedContent(event.target.value);
    };
    function handleEditNote(){
        setEdit(false)
        handleeditNote(editedContent,notedata)
    }
    useEffect(()=>{
        setEditedContent(notedata.content)
    },[notedata])

    function handleFav(){
      const ele=document.getElementById('favheart')
      console.log(ele.src)
      if(ele.src.endsWith('favorite.d5e31a848104fb1c4b06.png'))
        {
           ele.src=before_fav
           let like='like_disable'
           handleFavNote(notedata,like)
        }
        else{
            ele.src=favourite
            let like='like_enable'
            handleFavNote(notedata,like)
        }
    }
    function handleRestore(){
        handleRestoreNote(notedata)
    }
    return (
        <div className='display-note' style={trash && {height:'590px'}}>
           <div className='header'>
                {notedata.image &&  <img src={notedata.image} alt='Image' style={{ width: '50px', height: '50px', borderRadius: '10px' }}/>}
                <h6>{notedata.title}</h6>
                <div className='fet' style={ !notedata.image ?{marginLeft:'70px'}:undefined}>
                {(all) && <>
                {notedata.fav ?<img id='favheart' src={favourite} style={{height:'20px'}} onClick={handleFav}/>:<img id='favheart' src={before_fav} style={{height:'20px'}} onClick={handleFav}/> }
                    <img src={trashimage} alt='Image' onClick={()=>handleTrashNote(notedata)} style={{height:'20px'}}/>
                <img src={editnote} style={{height:'20px'}} onClick={()=>{setEdit(true)}}/>
                </>}
                </div>
           </div>
            <hr style={{ marginLeft: '20px', marginRight: '20px' }} />
            <textarea
                style={{minHeight: fav &&'460px'}}
                value={editedContent}
                onChange={edit ? handleContentChange : undefined}/>
                {all && <center><button onClick={handleEditNote} >Save</button></center>}
                {trash && <center><button onClick={handleRestore} >Restore</button></center>}
        </div>
    );
}

export default DisplayNote;

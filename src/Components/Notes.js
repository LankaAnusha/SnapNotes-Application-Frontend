import React, { useContext, useState, useEffect, useCallback } from 'react';
import { UserContext } from './Application';
import axios from 'axios';
import SingleNote from './SingleNote';
import loadingImage from '../Images/loading.gif';
import search from '../Images/search.png'
import wrong from '../Images/wrong.png'

function Notes(props) {
    const userId = useContext(UserContext);
    const [allnotes, setAllNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [backupAllnotes,setBackUpAllNotes]=useState([])
    const [Wrong,setWrong]=useState(false)
    const searchtextRef=React.createRef();

    const fetchAllNotes = useCallback(() => {
        setLoading(true); 
        axios.get(`https://snapnotes-application-backend.onrender.com/getnotedetails/${userId}`)
            .then(res => {
                setAllNotes(res.data);
                setBackUpAllNotes(res.data)
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false)); 
    }, [userId]);

    const fetchFavoriteNotes = useCallback(() => {
        setLoading(true);
        axios.get(`https://snapnotes-application-backend.onrender.com/getfavnotesdetails/${userId}`)
            .then(res => {
                setAllNotes(res.data);
                setBackUpAllNotes(res.data)
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, [userId]);

    const fetchDeletedNotes = useCallback(() => {
        setLoading(true);
        axios.get(`https://snapnotes-application-backend.onrender.com/getdeletednotesdetails/${userId}`)
            .then(res => {
                setAllNotes(res.data);
                setBackUpAllNotes(res.data)
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, [userId]);

    useEffect(() => {
        if (props.allnotes && userId) {
            fetchAllNotes();
        }
    }, []);

    useEffect(() => {
        if (props.favnotes && userId) {
            fetchFavoriteNotes();
        }
    }, []);

    useEffect(() => {
        if (props.noteType && userId) {
            fetchDeletedNotes();
        }
    }, []);
 
    const trashnote = useCallback(() => {
        if (Object.keys(props.TrashNote).length !== 0 && !props.display) {
            axios.post('https://snapnotes-application-backend.onrender.com/posttrashnote', props.TrashNote);
            const NoteId = props.TrashNote.NoteId;
            const updatedNotes = allnotes.filter(note => note.NoteId !== NoteId);
            setAllNotes(updatedNotes);
        }
    }, [props.TrashNote]);    
    useEffect(()=>{
       if(props.TrashNote.NoteId!=='')
        {
            trashnote()
        }
    },[props.TrashNote])
    
    const newnote=useCallback(()=>{
        if(Object.keys(props.newNote).length !== 0 && !props.display)
            {
                 axios.post('https://snapnotes-application-backend.onrender.com/postnotedetails',props.newNote) 
                 .then(res=>{
                    const updatedNote={...props.newNote,NoteId:res.data.toString()}
                    setAllNotes(prevNotes => [...prevNotes, updatedNote]);

                 })
            }   
    },[props.newNote])

    useEffect(()=>{
      newnote()         
    },[props.newNote])
    
    const editednote = useCallback(() => {
        const content = props.editedNote.content;
        const NoteId = props.editedNote.NoteId;
        axios.patch('https://snapnotes-application-backend.onrender.com/updatenotecontent', {content:content,NoteId:NoteId})
            .then(response => {
                const updatedData = allnotes.map(note => {
                    if (note.NoteId === props.editedNote.NoteId) {
                        return { ...note, content: props.editedNote.content };
                    }
                    return note;
                });
                setAllNotes(updatedData);
            })
            .catch(err=>console.log(err))
    }, [props.editedNote]);
    
    useEffect(() => {
        editednote();
    }, [props.editedNote]);
    
    const favnote=useCallback(()=>{
        if(Object.keys(props.favNote).length !== 0)
            {
                if(props.favNote.like==='like_enable')
                {axios.post('https://snapnotes-application-backend.onrender.com/postfavnotes',props.favNote.data)
                const updatedData = allnotes.map(note => {
                        if (note.NoteId === props.favNote.data.NoteId) {
                            note.fav=true
                            return note;
                        }
                        return note;
                    });
                    setAllNotes(prevNotes => [...updatedData]); 
                }
                else{
                    axios.post('https://snapnotes-application-backend.onrender.com/deletefavnote',props.favNote.data)
                    const updatedData = allnotes.map(note => {
                        if (note.NoteId === props.favNote.data.NoteId) {
                            note.fav=false
                            return note;
                        }
                        return note;
                    });
                    setAllNotes(prevNotes => [...updatedData]); 
                }
            }
    },[props.favNote])

    useEffect(()=>{
      favnote()
    },[props.favNote])
    
    const restorenote=useCallback(()=>{
     if(Object.keys(props.restoreNote).length !== 0)
        {
            const updatedData=allnotes.filter((note)=>note.NoteId!==props.restoreNote.NoteId)
            setAllNotes(updatedData)
            axios.post('https://snapnotes-application-backend.onrender.com/restorenotedetails',props.restoreNote)
        }
    },[props.restoreNote])
    useEffect(()=>{
        restorenote()
    },[props.restoreNote])
    
    function handleSearch(data) {
        console.log(data);
        const filteredNotes = allnotes.filter((note) => {
            const title = note.title.toLowerCase();
            return title.includes(data.toLowerCase());
        });
        setAllNotes(filteredNotes);
    }
     function handleWrong(){
        setAllNotes(backupAllnotes)
        searchtextRef.current.value=''
        setWrong(false)
     }

    return (
        <>
        {loading && <>
            <div className='loading' style={{display:'flex',gap:'20px'}}>
            <h5 style={{textAlign:'center'}}>Loading ...</h5>
            <img src={loadingImage} style={{height:'30px',borderRadius:'50px'}}/>
            </div>
            </>}
        <div className='notes'>
            {!loading && (
                <>
                   <div className='header' style={{display:'flex',justifyContent:'space-between'}}>
                   <h5 style={{ color: '#10439F' }}>{allnotes.length} Notes</h5>
                   {allnotes.length!==0 && 
                   <div className='search' style={{display:'flex',gap:'7px'}}>
                   <img src={search} style={{marginTop:'5px',height:'15px'}}/>
                   <input type='text' ref={searchtextRef} onFocus={()=>setWrong(true)} placeholder='Search here for a note' onChange={(e)=>handleSearch(e.target.value)} style={{border:'none',marginTop:'-10px',backgroundColor:'whitesmoke'}}/>
                   {Wrong && <img src={wrong} onClick={handleWrong} style={{height:'15px',cursor:'pointer',marginTop:'5px'}}/>}
                   </div>}
                   </div>
                    <div className='singlenote'  style={(props.favnotes || props.noteType) && {display:'flex',gap:'20px',flexWrap:'wrap'}}>
                    {allnotes.map((note) => (
                        <SingleNote  displayNote={props.displayNote}  key={note._id}  UserId={note.UserId}  NoteId={note.NoteId} title={note.title}
                            content={note.content} image={note.image} date={note.date}  fav={note.fav} 
                        />
                    ))}
                    </div>
                </>
            )}
        </div>
        </>
    );
}

export default Notes;
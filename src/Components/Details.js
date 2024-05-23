import React,{useState,useEffect} from 'react';
import notes_video from '../Images/notes-video.mp4';
import '../Styles/Details.css';
import { Link } from 'react-router-dom';
function Details(props) {
  const [detailsColor, setDetailsColor] = useState('#524C42');
  console.log(props.darktheme)
  useEffect(() => {
    if (props.darktheme === true) {
      setDetailsColor('white');
    } else {
      setDetailsColor('#524C42');
    }
  }, [props.darktheme]);
  return (
    <>
      <div className='details'>
        <div className='details1'>
        <video preload autoPlay loop muted>
          <source src={notes_video} type="video/mp4" />
          </video>
          <h5 style={{color:detailsColor}}>Ready to simplify your note-taking? Try SnapNotes today and enjoy stress-free organization.
          <Link to='/Signup' style={{textDecorationLine:'none',marginLeft:'7px',textShadow:'2px 2px 2px 1px #7c9fef',marginRight:'3px',fontSize:'20px'}}>Sign Up Now</Link></h5>
        </div>
        <div className='content'>
          <h4>Welcome to SnapNotes – Your Easy Note-Taking App!</h4>
          <h6>Tired of messy notes? SnapNotes makes it simple. Just jot down your thoughts and ideas, and we'll keep them organized for you. No fuss, no clutter – just easy note-taking.</h6>
          <div className='content1'>
            <div className='item item1'>
          <h4>Never Forget Again</h4>
          <h6>SnapNotes: Instantly capture and secure your thoughts for easy access.</h6>
           </div>
           <div className='item item2'>
          <h4>Stay Organized</h4>
          <h6>Keep everything in one organized place, eliminating clutter and simplifying your search for notes.</h6>
           </div>
           <div className='item item3'>
          <h4>Make It Yours</h4>
          <h6>Customize SnapNotes to suit your style. Choose your favorite fonts, colors, and themes to personalize your note-taking experience.</h6>
           </div>
           <div className='item item4'>
          <h4>Simple and Secure</h4>
          <h6>Only authenticated users can access their notes, ensuring security, while our trash bin feature safeguards against accidental deletions.</h6>
           </div>
          </div>
        
        </div>
      </div>
    </>
  );
}

export default Details;

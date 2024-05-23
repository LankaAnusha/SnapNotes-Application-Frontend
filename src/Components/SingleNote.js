import React from 'react'
import '../Styles/SingleNote_Style.css'
function SingleNote(props) {
    const getRandomLightColor = () => {
        const randomComponent = () => Math.floor(Math.random() * 100) + 150; // Random number between 150 and 250

        const colors = [
            `rgb(${randomComponent()}, ${randomComponent()}, ${randomComponent()})`, // Blue
            `rgb(${randomComponent()}, ${randomComponent()}, ${randomComponent()})`, // Grey
            `rgb(${randomComponent()}, ${randomComponent()}, ${randomComponent()})`, // Orange
            `rgb(${randomComponent()}, ${randomComponent()}, ${randomComponent()})` // Pink
        ];

        return colors[Math.floor(Math.random() * colors.length)];
    };

    const randomColor = getRandomLightColor();
    const handleClick=()=>{
    props.displayNote(props);
    }
    let content='';
    for(let i=0;i<90 && i<props.content.length;i++)
    {content+=props.content[i];}
    content+='....'
    return (  <>
    <div className='single-note'  onClick={handleClick}style={{backgroundColor: randomColor}}>
            {props.image &&
            <div className='image'><img src={props.image} alt='Image' style={{height:'120px',borderRadius:'10px'}}/>
            </div>}
        <div className='content'>
        <h6 style={{fontWeight:'bold',width:'320px'}}>{props.title}</h6>
        <pre style={{width:'320px',height:'50px',overflowY:'hidden',color: 'rgb(98, 96, 96)',fontSize:'15px',fontFamily:'Gill Sans', overflowWrap: 'break-word',wordWrap: 'break-word',whiteSpace:'pre-wrap',marginBottom:'0px'}}>{content}</pre>
        <div className='date'>
        <h6 style={{fontSize:'12px'}}>Created on:</h6><h6 style={{fontSize:'12px'}}>{props.date}</h6>
        </div>
        </div>
    </div>
    </>);
}

export default SingleNote;
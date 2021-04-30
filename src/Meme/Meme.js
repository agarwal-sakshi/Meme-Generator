import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import {useHistory} from 'react-router-dom';

export const Meme = () => {
    const [memes,setMemes] = useState([]);
    const [memeIndex,setMemeIndex] = useState(0);
    const [captions,setCaptions] = useState([]);                   //array of strings for caption
    const history = useHistory();

    const updateCaption = (e, index) => {                          //index of the input we are editing
      const text = e.target.value || '';                           //target returns the element that triggered the event 'e'
      setCaptions(
        captions.map((c, i) => {                                  //current index of the caption
          if(index === i) {
            return text;
          } else {
            return c;
          }
        })
      );
    };

    const generateMeme = () => {
      const currentMeme = memes[memeIndex];                         //to get the current meme
      const formData = new FormData();                             //creating a form data object
  
      formData.append('username', 'agarwal_sakshi');
      formData.append('password', 'Sakshiimgflip');
      formData.append('template_id', currentMeme.id);
      captions.forEach((c, index) => formData.append(`boxes[${index}][text]`, c));     //looping through each caption        
  
      fetch('https://api.imgflip.com/caption_image', {                         //2nd parameter is an object with 2 properties     
        method: 'POST',
        body: formData
      }).then(res => {                                                       
        res.json().then(res => {
          history.push(`/generated?url=${res.data.url}`);                       //to generate this in URL
        });
      });
    };
  

    const shuffleMemes = (array) => {                              //to generate any random meme whenever page is reloaded
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * i);
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      };

    useEffect(() => {
              fetch('https://api.imgflip.com/get_memes').then(res => res.json().then(res => {           //converts the promise into JSON
                   const _memes=res.data.memes;             //array
                   shuffleMemes(_memes);                    //shuffling the meme before setting its state
                   setMemes(_memes);
              }));
    },[]);

    useEffect(() => {
             if(memes.length){
               setCaptions(Array(memes[memeIndex].box_count).fill(''));             //initalizing the captions with empty string
             }
    },[memeIndex,memes]); 

    return(
        memes.length?
         <div className={styles.container}>
           <button onClick={generateMeme} className={styles.generate}>Generate</button>
           <button onClick={() => setMemeIndex(memeIndex+1)} className={styles.skip}>Skip</button>
           {
             captions.map((c,index) => (
               <input onChange={(e) =>updateCaption(e,index)} key={index}/>                     //e is event //whenever we write in the caption input field
             ))
           }
           <img alt='meme' src={memes[memeIndex].url}/>
         </div>
         : <></>
    );
};

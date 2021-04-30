import React,{useState} from 'react';
import {useHistory,useLocation} from 'react-router-dom';
import styles from './styles.module.css';
import {useClipboard} from 'use-clipboard-copy';

export const MemeGenerated = () => {
   const [copied, setCopied] = useState(false);
   const clipboard = useClipboard();          
   const history = useHistory();                                     // we get to know the path here also..only diff is history is mutable 
   const location = useLocation();                                   //to know the current  URL path //location is an object
   const url = new URLSearchParams(location.search).get('url');

   const copyLink = () => {
    clipboard.copy(url);
    setCopied(true);
  };

    return (
        <div className={styles.container}>
        <button onClick={() => history.push('/')} className={styles.home}>           
          Make More Memes                                                               // will take you to the home page
        </button>
        { url && <img alt='meme' src={url} /> }                                         //short circuiting 
        <button onClick={copyLink} className={styles.copy}>                              
          {copied ? 'Link copied!' : 'Copy link'}
        </button>
      </div>
    );
};




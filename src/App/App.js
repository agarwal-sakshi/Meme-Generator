import React from 'react';
import {Meme} from '../Meme/Meme.js';
import {Switch,Route} from 'react-router-dom';
import {MemeGenerated} from '../MemeGenerated/MemeGenerated';

export const App = () => {
  return (
    <>
    <h1>MEME GENERATOR</h1>
    <Switch>
      <Route exact path='/'>
         <Meme/>
      </Route>
      <Route path='/generated'>
        <MemeGenerated/>
      </Route>
    </Switch> 
    </>
  );
}






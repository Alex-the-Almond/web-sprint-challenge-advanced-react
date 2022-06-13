import React from 'react'
import {useState} from 'react'
// Suggested initial states


export default function AppFunctional(props) {

  const [state, useState] = useState({
    x: 2,
    y: 2,
    moves: 0,
    email: '',
    message: '',
  });

  const reset = () => {
    setState({
      x: 2,
      y: 2,
      moves: 0,
      email: '',
      message: '',
    });
  };

  const moveLocation = (xCord, yCord) => {
    if(state.x + xCord > 3) {
      setState({...state, message: `You can't go right`})
    }
    
    else if (state.x + xCord < 1) {
      setState({...state, message: `You can't go left`})
    }

    else if (state.y + yCord > 3) {
      setState({...state, message: `You can't go down`})
    }

    else if (state.y + yCord < 1) {
      setState({...state, message: `You can't go up`})
    }

    else{
      setState({
        ...state,
        x: state.x + xCord,
        y: state.y + yCord,
        moves: state.moves + 1,
        message: ''
      })
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    fetch('http://localhost:9000/api/result', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(state),
    })
    .then((res) => res.json())
    .then((json) => {
      setState({...state, message: json.message, email: ''})
    })
    .catch(err => console.log(err))
  };

  const handleChanges = (evt) => {
    setState({...state, email: evt.target.value})
  }

  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates (2, 2)</h3>
        <h3 id="steps">You moved 0 times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
              {idx === 4 ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button id="left">LEFT</button>
        <button id="up">UP</button>
        <button id="right">RIGHT</button>
        <button id="down">DOWN</button>
        <button id="reset">reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}

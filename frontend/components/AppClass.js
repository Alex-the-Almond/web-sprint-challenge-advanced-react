import React from 'react'


export default class AppClass extends React.Component {
 state = {
  x: 2,
  y: 2,
  moves: 0,
  email: '',
  message: '',
 };

 reset = () => {
  this.setState({
    x: 2,
    y: 2,
    moves: 0,
    email: '',
    message: '',
  });
 };

 moveLocation = (xCord, yCord) => {

  if(this.state.x + xCord > 3) {
    this.setState({...this.state, message: `You can't go right`})
  } 
  
  else if(this.state.x + xCord < 1) {
    this.setState({...this.state, message: `You can't go left`})
  }

  else if(this.state.y + yCord > 3) {
    this.setState({...this.state, message: `You can't go down`})
  }

  else if(this.state.y + yCord < 1) {
    this.setState({...this.state, message: `You can't go up`})
  }

  else{
    this.setState({
      ...this.state,
      x: this.state.x + xCord,
      y: this.state.y + yCord,
      moves: this.state.moves + 1,
      message: ''
    })
  }
}

handleChange = (evt) => {
  this.setState({...this.state, email: evt.target.value})
}

handleSubmit = (evt) => {
  evt.preventDefault();

  fetch('http://localhost:9000/api/result', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(this.state)
  })
  
  .then(res => res.json())
  .then(json => this.setState({...this.state, message:json.message}))
  .catch(err => console.log(err));

  this.setState({...this.state, email: evt.target.value})
}

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{`Coordinates (${this.state.x}, ${this.state.y})`}</h3>
            {this.state.moves === 1 ? <h3 id="steps">You moved 1 times</h3> : <h3 id='steps'>You Moved {this.state.moves} times</h3>}
        </div>
        <div id="grid">
            <div className={`square ${this.state.x === 1 && this.state.y === 1 ? 'active' : ''}`}>{this.state.x === 1 && this.state.y === 1 ? 'B' : ''}</div>
            <div className={`square ${this.state.x === 2 && this.state.y === 1 ? 'active' : ''}`}>{this.state.x === 2 && this.state.y === 1 ? 'B' : ''}</div>
            <div className={`square ${this.state.x === 3 && this.state.y === 1 ? 'active' : ''}`}>{this.state.x === 3 && this.state.y === 1 ? 'B' : ''}</div>
            <div className={`square ${this.state.x === 1 && this.state.y === 2 ? 'active' : ''}`}>{this.state.x === 1 && this.state.y === 2 ? 'B' : ''}</div>
            <div className={`square ${this.state.x === 2 && this.state.y === 2 ? 'active' : ''}`}>{this.state.x === 2 && this.state.y === 2 ? 'B' : ''}</div>
            <div className={`square ${this.state.x === 3 && this.state.y === 2 ? 'active' : ''}`}>{this.state.x === 3 && this.state.y === 2 ? 'B' : ''}</div>
            <div className={`square ${this.state.x === 1 && this.state.y === 3 ? 'active' : ''}`}>{this.state.x === 1 && this.state.y === 3 ? 'B' : ''}</div>
            <div className={`square ${this.state.x === 2 && this.state.y === 3 ? 'active' : ''}`}>{this.state.x === 2 && this.state.y === 3 ? 'B' : ''}</div>
            <div className={`square ${this.state.x === 3 && this.state.y === 3 ? 'active' : ''}`}>{this.state.x === 3 && this.state.y === 3 ? 'B' : ''}</div>
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={() => this.moveLocation(-1, 0)}>LEFT</button>
          <button id="up" onClick={() => this.moveLocation(0, -1)}>UP</button>
          <button id="right" onClick={() => this.moveLocation(1, 0)}>RIGHT</button>
          <button id="down" onClick={() => this.moveLocation(0, 1)}>DOWN</button>
          <button id="reset" onClick={() => this.reset()}>reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email" value={this.state.email} onChange={evt => this.handleChange(evt)}></input>
          <input id="submit" type="submit" onClick={evt => this.handleSubmit(evt)}></input>
        </form>
      </div>
    )
  }
}

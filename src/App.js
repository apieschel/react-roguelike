import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="map">
          <div className="fieldOfVision">
            <Game/>
          </div>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    for(let i = 0; i < 50; i++) {
      return(
        <div className="grid">
        </div>
      );
    } 
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
		super(props);
		this.state = {
      userPosition: 67
		}
		this.constructMap = this.constructMap.bind(this);
	}
  
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
	
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
	
  handleKeyPress(e) {
    console.log(e.key);
    if(e.key === "ArrowRight")
  }
  
  constructMap() {
    let grid = [];
    let j = this.state.userPosition;
	  for(let i = 0; i < 250; i++) {
      if(i === j) {
        grid.push(<div className="user" key={i}></div>);
      } else {
        grid.push(<div className="gridItem" key={i}></div>);
      }
    }
    return grid;
  }
  
  render() {
    return (
      <div className="App">
        <div className="map">
          <div className="fieldOfVision">
            {this.constructMap()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
		super(props);
		this.state = {
      userPosition: 67
		}
		this.constructMap = this.constructMap.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
	}
  
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
	
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
	
  handleKeyPress(e) {
    if(e.key === "ArrowRight") {
      if((this.state.userPosition + 1) % 50) {
        this.setState({
          userPosition: this.state.userPosition + 1
        });
      }
    }
    if(e.key === "ArrowLeft") {
      if(this.state.userPosition % 50) {
        this.setState({
          userPosition: this.state.userPosition - 1
        });
      }
    }
    if(e.key === "ArrowUp") {
      if(this.state.userPosition > 49) {
        this.setState({
          userPosition: this.state.userPosition - 50
        });
      }
    }
    if(e.key === "ArrowDown") {
      if(this.state.userPosition < 1450) {
        this.setState({
          userPosition: this.state.userPosition + 50
        });
      }
    }
    console.log(this.state.userPosition);
  }
  
  constructMap() {
    let grid = [];
    let j = this.state.userPosition;
	  for(let i = 0; i < 1500; i++) {
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

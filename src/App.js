import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
		super(props);
		this.state = {
      
		}
		this.constructMap = this.constructMap.bind(this);
	}
  
  constructMap() {
    let grid = [];
	  for(let i = 0; i < 50; i++) {
      grid.push(<div className="gridItem"></div>);
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

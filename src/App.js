import React, { Component } from 'react'
import DrumMachine from './DrumMachine/DrumMachine'
import 'bulma/css/bulma.css'
import './App.css'


class App extends Component {
  render() {
    return (
      <div className="App">
        <DrumMachine />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react'
import { bankOne, bankTwo } from './Banks'
import './DrumMachine.css'



export default class DrumMachine extends Component {

    render() {
        return (
            <div id="drum-machine">
                DRUM MACHINE!!!
                <Display />
                <NumPad />
            </div>
        )
    }
}


class Display extends Component {
    render() {
        return(
            <div id="display">
                Display
            </div>
        )
    }
}


class NumPad extends Component {

    handleNumpadClick(index) {
        const audio = new Audio(`https://s3.amazonaws.com/freecodecamp/drums/Heater-${index}.mp3`);
        audio.play();
    }

    render() {
        const keys = "Q,W,E,A,S,D,Z,X,C".split(",").reduce( (acc, key, i) => {
            if ( i%3 === 0 ) acc.push([]);
            acc[acc.length-1].push(key);
            return acc;
        }, [])

        return (
            <div id="numpadContainer">
                {keys.map( (keyRow,i) => {
                    return (
                        <div className="columns" key={`keyRow${i}`}>
                            {keyRow.map( (key,j) => {
                                return (
                                    <div 
                                    className="drum-pad column is-4" 
                                    key={`key${j}`} 
                                    id={`button${key}`}
                                    onClick={this.handleNumpadClick.bind(this,i+j)}
                                    >
                                        {key}
                                        <audio src="asd" className="clip" id={key}></audio>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }
}
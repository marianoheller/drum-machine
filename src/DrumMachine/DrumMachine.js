import React, { Component } from 'react'
import { bankOne, bankTwo } from './Banks'
import './DrumMachine.css'

const banks = [ bankOne, bankTwo];

export default class DrumMachine extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentBank: bankOne
        }

        this.onToogleBank = this.onToogleBank.bind(this);
    }

    onToogleBank() {
        const { currentBank } = this.state;
        const currentIndex = banks.findIndex( (b) => b===currentBank);
        this.setState({
            currentBank: banks[ (currentIndex+1)%(banks.length) ],
        })
    }

    render() {
        const { currentBank } = this.state;
        return (
            <div className="columns" id="drum-machine">
                <div className="column is-one-third is-offset-one-third">
                    DRUM MACHINE!!!
                    <Display />
                    <NumPad bank={currentBank}/>
                    <BankChooser onToogle={this.onToogleBank}/>
                </div>
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

        const { bank } = this.props;
        const keys = bank.map( (b) => b.keyTrigger ).reduce( (acc, key, i) => {
            if ( i%3 === 0 ) acc.push([]);
            acc[acc.length-1].push(key);
            return acc;
        }, []);

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
                                        <audio src={
                                            bank.find( (b) => b.keyTrigger===key ).url
                                        } 
                                        className="clip" 
                                        id={key} 
                                        />
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


class BankChooser extends Component {

    render() {
        const { onToogle } = this.props;
        return (
            <div>
                <button onClick={onToogle}>ASASD</button>
            </div>
        )
    }
}
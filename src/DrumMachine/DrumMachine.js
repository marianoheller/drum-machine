import React, { Component } from 'react'
import { bankOne, bankTwo } from './Banks'
import './DrumMachine.css'

const banks = [ bankOne, bankTwo];

export default class DrumMachine extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentBank: bankOne,
            currentDisplay: ""
        }

        this.onToogleBank = this.onToogleBank.bind(this);
        this.onNumPadPress  = this.onNumPadPress.bind(this);
    }

    onToogleBank() {
        const { currentBank } = this.state;
        const currentIndex = banks.findIndex( (b) => b===currentBank);
        this.setState({
            currentBank: banks[ (currentIndex+1)%(banks.length) ],
        })
    }

    onNumPadPress(key) {
        const { currentBank } = this.state;
        this.setState({
            currentDisplay: currentBank.find( (b) => b.keyTrigger===key).id,
        })
    }


    render() {
        const { currentBank } = this.state;
        return (
            <div className="columns" id="drum-machine">
                <div className="column is-one-third is-offset-one-third">
                    DRUM MACHINE!!!
                    <Display keyPressed={this.state.currentDisplay} />
                    <NumPad bank={currentBank} onNumPadPress={this.onNumPadPress}/>
                    <BankChooser onToogle={this.onToogleBank}/>
                </div>
            </div>
        )
    }
}


class Display extends Component {
    render() {
        const { keyPressed } = this.props;

        return(
            <div id="display">
                { keyPressed }
            </div>
        )
    }
}


class NumPad extends Component {

    constructor(props) {
        super(props);

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleNumPadPress = this.handleNumPadPress.bind(this);
    }

    
    handleNumPadPress(key) {
        const { onNumPadPress } = this.props;
        return function() {
            const audioElement = this.refs[`audio${key}`];
            if (!audioElement ) return;
            audioElement.play();
            onNumPadPress(key);
        }.bind(this)
    }


    handleKeyDown(e) {
        const playAction = this.handleNumPadPress(e.key.toUpperCase());
        playAction();
    }

    componentDidMount(){
        this.numPad.focus();
    }

    render() {
        const { bank } = this.props;
        const keys = bank.map( (b) => b.keyTrigger ).reduce( (acc, key, i) => {
            if ( i%3 === 0 ) acc.push([]);
            acc[acc.length-1].push(key);
            return acc;
        }, []);

        return (
            <div id="numpadContainer" 
            onKeyDown={this.handleKeyDown.bind(this)}  
            tabIndex="1" 
            ref={(numPad) => { this.numPad = numPad; }} 
            >
                {keys.map( (keyRow,i) => {
                    return (
                        <div className="columns" key={`keyRow${i}`}>
                            {keyRow.map( (key,j) => {
                                return (
                                    <div 
                                    className="drum-pad column is-4" 
                                    key={`key${j}`} 
                                    id={`button${key}`}
                                    onClick={ this.handleNumPadPress(key).bind(this) }
                                    >
                                        {key}
                                        <audio src={
                                            bank.find( (b) => b.keyTrigger===key ).url
                                        }
                                        className="clip" 
                                        id={key}
                                        ref={`audio${key}`}
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
import React, { Component } from 'react'
import { bankOne, bankTwo } from './Banks'
import './DrumMachine.css'

const banks = [ bankOne, bankTwo];


export default class DrumMachine extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentBank: bankOne,
            currentDisplay: "",
            volume: 50,
        }

        this.onToogleBank = this.onToogleBank.bind(this);
        this.onNumPadPress  = this.onNumPadPress.bind(this);
        this.onVolumeChange = this.onVolumeChange.bind(this);
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

    onVolumeChange(value) {
        this.setState({
            volume: value,
        })
    }


    render() {
        const { currentBank, volume } = this.state;
        return (
            <div className="columns" id="drum-machine">
                <div className="column is-one-third is-offset-one-third">
                    <h1 id="title">Drum machine</h1>
                    <div className="columns">
                        <div className="column is-12">
                            <Display keyPressed={this.state.currentDisplay} />
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-1">
                            <VolumeController volume={volume} onVolumeChange={this.onVolumeChange}/>
                        </div>
                        <div className="column is-11">
                            <NumPad volume={volume} bank={currentBank} onNumPadPress={this.onNumPadPress}/>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-12">
                            <BankChooser onToogle={this.onToogleBank}/>
                        </div>
                    </div>
                    
                    
                    
                </div>
            </div>
        )
    }
}


class Display extends Component {
    render() {
        const { keyPressed } = this.props;

        return(
            <div id="display" dangerouslySetInnerHTML={ keyPressed ? {__html: keyPressed} : {__html: '&nbsp;'} } >
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

    componentWillMount()   {
        document.addEventListener("keydown", this.handleKeyDown, false);
    }
   
   
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown, false);
    }

    
    handleNumPadPress(key) {
        const { onNumPadPress, volume } = this.props;
        return function() {
            const audioElement = this.refs[`audio${key}`];
            if (!audioElement ) return;
            audioElement.volume = volume/100;
            audioElement.play();
            onNumPadPress(key);
        }.bind(this)
    }


    handleKeyDown(e) {
        const { bank } = this.props;
        const keyObj = bank.find( (b) => b.keyCode===e.keyCode );
        if( !keyObj ) return;
        const key = keyObj.keyTrigger;
        if ( !key ) return;
        const playAction = this.handleNumPadPress(key);
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
            <div onClick={onToogle} id="bankContainer">
                Toogle bank
            </div>
        )
    }
}

class VolumeController extends Component {

    handleValueChange(e) {
        e.preventDefault();
        const { onVolumeChange } = this.props;
        onVolumeChange(e.target.value);
    }

    render() {
        const { volume } = this.props;
        return (
            <div className="volumeContainer">
                <input id="volumeSlider" type="range"  orient="vertical" min="0" max="100" step="1" value={volume} onChange={this.handleValueChange.bind(this)}/>
            </div>
        )
    }
}
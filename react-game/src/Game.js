import React from 'react';
// import HireWorkerButton from './UpgradeButtons.js'
import './Game.css'

function UpgradeButton(props) {
    return (
        <div>
            <button onClick={props.onClick}>
                Upgrade Point Button
            </button>
        </div>
    )
}

function HireWorkerButton(props) {
    return(
        <div>
            <button id={props.id} onClick={props.onClick}>
                Hire Worker (+{props.workerOutput}/sec)
            </button>
            Amt: {props.numWorkers}
            <p>Cost: {props.cost}</p>
        </div>
    )
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            clickScoreIncrement: 1,
            clickUpgradePrice: 10,
            // previousIntervalScore: 0,
            // scorePerInterval: 0,
            statusMessage: '',
            cheapWorkers: 0,
            cheapWorkerCost: 10,
            expensiveWorkers: 0,
            expensiveWorkerCost: 100,
            workerOutput: 0,
        }
    }

    // TODO: use this
    canAfford = () => {
        return (this.state.score >= this.state.cost)
    } 

    tick = () => {
        this.setState(state => ({
            score: state.score + this.state.workerOutput,
        }));
    }

    handlePointClick = () => {
        this.setState({
            score: this.state.score + this.state.clickScoreIncrement,
        });
    }

    handleUpgradeClick = () => {
        if (this.state.score >= this.state.clickUpgradePrice) {
            this.setState({
                score: this.state.score - this.state.clickUpgradePrice,
                clickScoreIncrement: this.state.clickScoreIncrement + 1,
                clickUpgradePrice: Math.round((this.state.clickUpgradePrice*1.4)),
                statusMessage: "Upgrade purchased!",
            });
        }
        else{
            this.setState({
                statusMessage: "Insufficient funds.",
            });
        }
    }

    handleWorkerClick = (e) => {
        // Determine which Hire Worker function to call
        console.log(e.target.id)

        switch (e.target.id) {
            case 'cheapWorkers':
                this.hireCheapWorker()
                break;
            case 'expensiveWorkers':
                console.log('expensive ones')
                break;
        }

        // Start ticker when first worker is purchased
        // if (this.state.currentWorkers === 0) { 
        //     this.interval = setInterval(() => this.tick(), 1000);
        // }        
    }

    hireCheapWorker = () => {
        if (this.state.score >= this.state.cheapWorkerCost) {
            this.setState({
                cheapWorkers: this.state.cheapWorkers + 1,
                score: this.state.score - this.state.cheapWorkerCost,
                cheapWorkerCost: (Math.floor(this.state.cheapWorkerCost * 1.4)),
                workerOutput: this.state.workerOutput + 1,
                statusMessage: "Upgrade purchased!"
                
            })
        }
        else {
            this.setState({
                statusMessage: "Insufficient funds."
            })
        }
    }


    // calculateScorePerInterval = () => {
    //     // TODO: Consider getting rid of in general, but why am I not getting decimal places back?
    //     this.setState({
    //     previousIntervalScore: this.state.score,
    //     scorePerInterval: (this.state.score - this.state.previousIntervalScore)*5,
    //     });
    // }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000)
        // this.interval = setInterval(() => this.calculateScorePerInterval(), 1000);
    }

    render() {
        return (
            <div id="pageBody">
                <h2>Score: {this.state.score}</h2>
                <button onClick={this.handlePointClick}>Add Points (+{this.state.clickScoreIncrement})</button>
                <p><UpgradeButton onClick={this.handleUpgradeClick} /> Cost: {this.state.clickUpgradePrice}</p>
                <p><HireWorkerButton onClick={this.handleWorkerClick} id='cheapWorkers' cost={this.state.cheapWorkerCost} workerOutput={1} numWorkers={this.state.cheapWorkers} /></p>
                <p><HireWorkerButton onClick={this.handleWorkerClick} id='expensiveWorkers' cost={this.state.expensiveWorkerCost} workerOutput={5} numWorkers={this.state.expensiveWorkers} /></p>
                <p>Score per second: {this.state.workerOutput}</p>
                <p id="statusMessage">{this.state.statusMessage}</p>
            </div>
        )
    }
}

export default Game;
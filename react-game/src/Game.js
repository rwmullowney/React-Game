import React from 'react';
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
            cheapWorkers: 0,
            expensiveWorkers: 0,
            workerPrice: 10,
            previousIntervalScore: 0,
            scorePerInterval: 0,
            statusMessage: '',
        }
    }

    canAfford = () => {
        return (this.state.score >= this.state.cost)
    } 

    tick = () => {
        this.setState(state => ({
            score: state.score + this.state.currentWorkers,
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
        console.log(this.state.cheapWorkers)
        this.setState({
            workerType: this.state.workerType + 1,
        });

        // Start ticker when first worker is purchased
        if (this.state.currentWorkers === 0) { 
            this.interval = setInterval(() => this.tick(), 1000);
        }
    }

    calculateScorePerInterval = () => {
        // TODO: Consider getting rid of in general, but why am I not getting decimal places back?
        this.setState({
        previousIntervalScore: this.state.score,
        scorePerInterval: (this.state.score - this.state.previousIntervalScore)*5,
        })
    }

    componentDidMount() {
        this.interval = setInterval(() => this.calculateScorePerInterval(), 1000);
    }

    render() {
        return (
            <div id="pageBody">
                <h2>Score: {this.state.score}</h2>
                <button onClick={this.handlePointClick}>Add Points (+{this.state.clickScoreIncrement})</button>
                <p><UpgradeButton onClick={this.handleUpgradeClick} /> Cost: {this.state.clickUpgradePrice}</p>
                <p><HireWorkerButton id='cheapWorker' onClick={this.handleWorkerClick} cost={10} workerOutput={1} numWorkers={this.state.cheapWorkers}></HireWorkerButton></p>
                <p><HireWorkerButton id='expensiveWorker' onClick={this.handleWorkerClick} cost={100} workerOutput={5} numWorkers={this.state.expensiveWorkers}></HireWorkerButton></p>
                <p>Score per 5s: {this.state.scorePerInterval}</p>
                <p id="statusMessage">{this.state.statusMessage}</p>
            </div>
        )
    }
}

export default Game;
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

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            pointIncrement: 1,
            pointUpgradePrice: 10,
            currentWorkers: 0,
            workerPrice: 10,
            previousIntervalScore: 0,
            scorePerInterval: 0,
        }
    }

    // TODO: Check if current points are above cost.  If so, return True and allow the purchase.
    // enoughPoints() {
    //     if (this.score)
    // }

    tick() {
        this.setState(state => ({
            score: state.score + this.state.currentWorkers,
        }));
    }

    handlePointClick = () => {
        this.setState({
            score: this.state.score + this.state.pointIncrement,
        });
    }

    handleUpgradeClick = (e) => {
        this.setState({
            pointIncrement: this.state.pointIncrement + 1,
        })
    }

    handleWorkerClick = (e) => {
        this.setState({
            currentWorkers: this.state.currentWorkers + 1,
        })
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
                <button onClick={this.handlePointClick}>Add Points (+{this.state.pointIncrement})</button>
                <p><UpgradeButton onClick={this.handleUpgradeClick} /> Cost: {this.state.pointUpgradePrice}</p>
                <p><button onClick={this.handleWorkerClick}>Hire Worker</button> Cost: {this.state.workerPrice}</p>
                <p>Score per 5s: {this.state.scorePerInterval} </p>
            </div>
        )
    }
}

export default Game;
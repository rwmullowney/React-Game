import React from 'react';

// TODO: Is this necessary?  Break into more files>

class HireWorkerButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            workerPrice: 10,
        }
    }

    handleWorkerClick = (e) => {
        // TODO: Maybe do something like "if id = {this kind of worker} run this function"
        console.log("Target id: " + e.target.id)
        console.log("Amount: " + this.props.numWorkers)
        let testvar = e.target.id
        console.log(testvar)
        
        this.setState({
            [e.target.id]: [e.target.id] + 1,
            cheapWorkers: this.state.cheapWorkers + 1,
        });

        // Start ticker when first worker is purchased
        if (this.state.currentWorkers === 0) { 
            this.interval = setInterval(() => this.tick(), 1000);
        }
    }

    render(){
        return(
            <div>
                <button id={this.props.id} onClick={this.handleWorkerClick} cost={this.props.cost}>
                    Hire Worker (+{this.props.workerOutput}/sec)
                </button>
                Amt: {this.props.numWorkers}
                <p>Cost: {this.props.cost}</p>
            </div>
        )
    }
}

export default HireWorkerButton
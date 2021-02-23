import React from "react";
import ReactDOM from "react-dom";
import NCGStore from "./stores/NodecgStore";
import { replicate } from "./stores/NodecgStore";
import { Bracket, RoundProps } from "react-brackets";
import { render } from "react-dom";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      replicants: NCGStore.getReplicants(),
    };
  }
  componentDidMount() {
    // Subscribing to replicant changes
    replicate("timestamp");
    replicate("name");
    // We keep all our subscribed replicants in a single "replicants" object
    NCGStore.on("change", () => {
      this.setState({
        replicants: NCGStore.getReplicants(),
      });
    });
  }

  render() {
    const rounds = [
      {
        title: "Round one",
        seeds: [
          {
            id: 1,
            // date: new Date().toDateString(),
            teams: [{ name: this.state.replicants.name }, { name: "Team B" }],
          },
          {
            id: 2,
            // date: new Date().toDateString(),
            teams: [{ name: "" }, { name: "Team D" }],
          },
        ],
      },
      {
        title: "Round one",
        seeds: [
          {
            id: 3,
            date: new Date().toDateString(),
            teams: [{ name: "Team A" }, { name: "Team C" }],
          },
        ],
      },
    ];
    const lastStamp = String(new Date(this.state.replicants.timestamp));
    return (
      <div>
        <div className="container">
          <h1>Hello, {this.state.replicants.name}!</h1>
          <p>The last time someone pressed the button was {lastStamp}</p>
          <Bracket rounds={rounds} />
        </div>
      </div>
    );
  }
}

const root = document.getElementById("app");
ReactDOM.render(<App />, root);

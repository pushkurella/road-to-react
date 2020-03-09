import React, { Component } from "react";
import "./App.css";
import ReactDOM from "react-dom";
import Countdown from "react-countdown";
import moment from "moment";
const Completionist = () => <span>You are good to go!</span>;
const list = [
  {
    name: "Pushpak",
    matchesWon: 5,
    rank: 3,
    objectID: 0
  },
  {
    name: "Max",
    matchesWon: 0,
    rank: 2,
    objectID: 1
  },
  {
    name: "Deva",
    matchesWon: 0,
    rank: 3,
    objectID: 2
  },
  {
    name: "Abhijeet",
    matchesWon: 0,
    rank: 4,
    objectID: 3
  },
  {
    name: "Pallishree",
    matchesWon: 0,
    rank: 6,
    objectID: 4
  },
  {
    name: "Ron",
    matchesWon: 0,
    rank: 6,
    objectID: 5
  },
  {
    name: "Ali",
    matchesWon: 0,
    rank: 1,
    objectID: 6
  },
  {
    name: "Brenton",
    matchesWon: 0,
    rank: 3,
    objectID: 7
  },
  {
    name: "Vikas",
    matchesWon: 0,
    rank: 5,
    objectID: 8
  },
  {
    name: "Abdi",
    matchesWon: 0,
    rank: 4,
    objectID: 9
  },
  {
    name: "Morgenne",
    matchesWon: 0,
    rank: 6,
    objectID: 10
  },
  {
    name: "Francis",
    matchesWon: 0,
    rank: 2,
    objectID: 11
  },
  {
    name: "Yilun Bai",
    matchesWon: 0,
    rank: 4,
    objectID: 12
  },
  {
    name: "Jake",
    matchesWon: 0,
    rank: 3,
    objectID: 13
  },
  {
    name: "Jeevan",
    matchesWon: 0,
    rank: 2,
    objectID: 14
  },
  {
    name: "Andrzej",
    matchesWon: 0,
    rank: 1,
    objectID: 15
  },
  {
    name: "Matthew",
    matchesWon: 0,
    rank: 1,
    objectID: 16
  },
  {
    name: "Richard",
    matchesWon: 0,
    rank: 2,
    objectID: 17
  }
];
const matches = [
  {
    match: "1. Francis vs Morgenne"
  },
  {
    match: "2. Yilun Bai vs Abdi"
  },
  {
    match: "3. Abhijeet vs Pallishree"
  }
];
// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <span className="banner-header">
        The game begins in {days} days {hours} hours {minutes} minutes {seconds}{" "}
        seconds
      </span>
    );
  }
};

const startDate = moment(Date.now());
const timeEnd = moment(Date.UTC(2020, 3, 13, 16, 30));
const diff = timeEnd.diff(startDate);
const diffDuration = moment.duration(diff);

console.log("Total Duration in millis:", diffDuration.asMilliseconds());
console.log("Days:", diffDuration.days());
console.log("Hours:", diffDuration.hours());
console.log("Minutes:", diffDuration.minutes());
console.log("Seconds:", diffDuration.seconds());
let days = diffDuration.days();
ReactDOM.render(
  <Countdown
    date={Date.now() + diffDuration}
    renderer={renderer}
    days={days}
  />,
  document.getElementById("counter")
);

const largeColumn = {
  width: "40%"
};

const midColumn = {
  width: "30%"
};

const smallColumn = {
  width: "10%"
};

const isSearched = searchTerm => item =>
  item.name.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list,
      searchTerm: ""
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.state.list.sort((a, b) => a.rank - b.rank);
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  }

  render() {
    const { searchTerm, list } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange}>
            Search player name:
          </Search>
          <NextMatch></NextMatch>
        </div>
        <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
      </div>
    );
  }
}

const NextMatch = ({}) => (
  <div className="match-header">
    <h1>Coming up matches</h1>
    {matches.map(item => (
      <div>
        <h4> {item.match}</h4>
      </div>
    ))}
  </div>
);

const Search = ({ value, onChange, children }) => (
  <div className="App-header">
    <h1>KDC Ping pong league </h1>
    <div id="counter"></div>
    <form className="form-header">
      {children} <input type="text" value={value} onChange={onChange} />
    </form>
  </div>
);

const Table = ({ list, pattern, onDismiss }) => (
  <div className="table">
    <div className="table-row-header">
      <span style={largeColumn}>Name</span>
      <span style={midColumn}>Matches won</span>
      <span style={smallColumn}>Rank</span>
    </div>
    {list.filter(isSearched(pattern)).map(item => (
      <div key={item.objectID} className="table-row">
        <span style={largeColumn}>
          <a href="https://google.com">{item.name}</a>
        </span>
        <span style={midColumn}>{item.matchesWon}</span>
        <span style={smallColumn}>{item.rank}</span>
        <span style={smallColumn}>
          <Button
            onClick={() => onDismiss(item.objectID)}
            className="button-inline"
          >
            Out of league
          </Button>
        </span>
      </div>
    ))}
  </div>
);

const Button = ({ onClick, className = "", children }) => (
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>
);

export default App;

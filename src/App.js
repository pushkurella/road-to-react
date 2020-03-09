import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
const list = [
  {
    id: 0,
    title: "react",
    url: "http://reactjs.org",
    num_comments: 6
  },
  {
    id: 1,
    title: "angular",
    url: "http://reactjs.org",
    num_comments: 6
  },
  {
    id: 2,
    title: "redux",
    url: "http://reactjs.org",
    num_comments: 6
  },
  {
    id: 3,
    title: "node",
    url: "http://reactjs.org",
    num_comments: 6
  }
];
const title = "welcome to react";
const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

class Search extends Component {
  render() {
    const { value, onChange, children } = this.props;
    return (
      <form>
        {children}
        <input type="text" onChange={onChange} value={value}></input>
      </form>
    );
  }
}

class Table extends Component {
  render() {
    const { list, pattern, onDismiss } = this.props;
    return (
      <div>
        {list.filter(isSearched(pattern)).map(item => {
          return (
            <div key={item.id}>
              <span>
                <span>
                  <a href={item.url}>{item.title}</a>
                </span>
              </span>
              <Button onClick={() => onDismiss(item.id)}>Dismiss</Button>
            </div>
          );
        })}
      </div>
    );
  }
}

class Button extends Component {
  render() {
    const { onClick, className = "", children } = this.props;
    return (
      <button type="button" onClick={onClick} className={className}>
        {children}
      </button>
    );
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: list,
      searchTerm: ""
    };
    // this.onDismiss = this.onDismiss.bind(this);
  }
  onDismiss = id => {
    console.log("in on dismiss");
    const updatedList = this.state.list.filter(item => {
      return item.id !== id;
    });
    this.setState({
      list: updatedList
    });
  };
  onSearchChange = e => {
    console.log("inside on search change " + e.target.value);
    this.setState({
      searchTerm: e.target.value
    });
    console.log(this.state.list);
  };
  render() {
    {
      const { searchTerm, list } = this.state;
      return (
        <div className="App">
          <Search value={searchTerm} onChange={this.onSearchChange}>
            Search
          </Search>
          <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
        </div>
      );
    }
  }
}

export default App;

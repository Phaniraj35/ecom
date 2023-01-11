import React, { Component } from 'react'
import CardList from './components/CardList/CardList';
import SearchBox from './components/SearchBox/SearchBox';

export class MonsterComponent extends Component {

  constructor() {
    super();

    this.state = {
        monsters: [],
        searchField: ''
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then((users) => {
      this.setState({monsters: users});
    })
  }

  onSearch = (event) => {
    this.setState({searchField: event.target.value.toLocaleLowerCase()});
  }
 
  render() {

    const filteredMonsters = this.state.monsters.filter(monster => monster.name.toLocaleLowerCase().includes(this.state.searchField));

    return (
      <div>
        <SearchBox onSearch={this.onSearch} />
        <CardList monsters={filteredMonsters} />
      </div>
    )
  }
}

export default MonsterComponent
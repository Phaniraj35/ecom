import React, { Component } from 'react'

export class SearchBox extends Component {
  render() {
    return (
      <div>
        <input type="search" className='search-box' placeholder='search' onChange={this.props.onSearch}/>
      </div>
    )
  }
}

export default SearchBox
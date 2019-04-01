import React, { Component } from 'react'
import {connect} from 'react-redux';

//custom imports
import './Dashboard.css';
import searchLogo from '../../assest/search_logo.png';
import {updateSearchInput} from '../../ducks/reducer';

class Dashboard extends Component {
  render() {
    return (
      <section className='dashboard'>
        <section className='search'>
            <div className="search-input-section">
              <input value={this.props.searchInput} placeholder='Seach by title' className='search-input' onChange={(e) => {this.props.updateSearchInput(e.target.value)}}/>
              <img src={searchLogo} alt="search logo"/>
              <button className='btn-search'>reset</button>
            </div>
            <div className="my-post-section">
              <label>My Post</label>
              <input type="checkbox" name="my-post"/>
            </div>
        </section>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    searchInput: state.searchInput
  }
}

const mapDispatchToProps = {updateSearchInput};

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
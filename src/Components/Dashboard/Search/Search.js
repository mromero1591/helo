import React from 'react';
import {connect} from 'react-redux';

//custom imports
import searchLogo from '../../../assest/search_logo.png';
import {updateSearchInput,updateMyPost,clearSearch} from '../../../ducks/postReducer';

function Search(props) {
    return(
        <div className="search-wrapper container">
          <div className="search-section">
            <input value={props.searchInput} onChange={(e) => {props.updateSearchInput(e.target.value)}} type="text" name="search" placeholder='Search by title'/>
            <img  className='search-button' src={searchLogo} alt="search icon"/>
            <button onClick={() => {props.clearSearch()}} className='reset-btn'>Reset</button>
          </div>

          <div className="my-post-wrapper">
            <label htmlFor="my-post">
              My Post
              <input onChange={(e) => {props.updateMyPost(e.target.checked ? true : false )}} type="checkbox" name='my-post'/>
            </label>
          </div>
        </div>
    )
}

function mapStateToProps(state) {
  return {
    searchInput: state.posts.searchInput,
    myPost: state.posts.myPost
  }
}

const mapDispactToProps = {updateSearchInput,updateMyPost,clearSearch};

export default connect(mapStateToProps,mapDispactToProps)(Search);
import React, {useState} from 'react';
import {connect} from 'react-redux';

//custom imports
import searchLogo from '../../../assest/search_logo.png';
import {updateSearchInput,updateMyPost,clearSearch} from '../../../ducks/postReducer';

function Search(props) {
  const [searchInput, setSearchInput] = useState('');
  const [mySearch, setMySearch] = useState(false);

  const search = () => {
    props.updateSearchInput(searchInput);
    props.updateMyPost(mySearch);
  }

  const resetSearch = () => {
    setSearchInput('');
    setMySearch(false);
    props.clearSearch();
  }

  return(
      <div className="search-wrapper container">
        <div className="search-section">
          <input value={searchInput} onChange={(e) => {setSearchInput(e.target.value)}} type="text" name="search" placeholder='Search by title'/>
          <img onClick={search}  className='search-button' src={searchLogo} alt="search icon"/>
          <button onClick={() => {resetSearch()}} className='reset-btn'>Reset</button>
        </div>

        <div className="my-post-wrapper">
          <label htmlFor="my-post">
            My Post
            <input checked={mySearch} onChange={(e) => {setMySearch(e.target.checked ? true : false )}} type="checkbox" name='my-post'/>
          </label>
        </div>
      </div>
  )
}

const mapDispactToProps = {updateSearchInput,updateMyPost,clearSearch};

export default connect(null,mapDispactToProps)(Search);
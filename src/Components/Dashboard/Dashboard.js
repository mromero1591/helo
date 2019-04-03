import React, { Component } from 'react'
import {connect} from 'react-redux';
import Axios from 'axios';

//custom imports
import './Dashboard.css';
import searchLogo from '../../assest/search_logo.png';
import {updateSearchInput, updateMyPost, updatePost} from '../../ducks/postReducer';
import Post from '../Post/Post';

class Dashboard extends Component {
  componentDidMount() {
    Axios.get(`/api/post/${this.props.user.id}`,
    {
      params: {
        userpost: this.props.myPost
      }
    })
    .then(res => {
      console.log(res.data);
      this.props.updatePost(res.data);
    }).catch(err => {
      console.log('error in getting post:', err);
    });
  }

  render() {
    const posts = this.props.posts.map( function(post) {
        return (
          <Post key={post.id} post={post} />
        );
    });
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
              <input checked={this.props.myPost} type="checkbox" name="my-post" onChange={(e) => {this.props.updateMyPost( this.props.myPost ? false : true )}}/>
            </div>
        </section>
        <section className='all-post-section'>
          {posts}
        </section>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    searchInput: state.post.searchInput,
    myPost: state.post.myPost,
    posts: state.post.posts,
    user: state.user.currentUser
  }
}

const mapDispatchToProps = {updateSearchInput,updateMyPost,updatePost};

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
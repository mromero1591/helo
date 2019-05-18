import React, { Component } from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';

import Search from './Search/Search';
import Post from '../Post/Post';

import {updatePost} from '../../ducks/postReducer';

class Dashboard extends Component {
  componentDidMount() {
    Axios.get('api/post')
    .then(res => {
      this.props.updatePost(res.data);
    }).catch(err => {
      console.log('error in getting a post');
    });
  }

  filterPost = (posts, searchInput, myPost) => {
    const filteredposts = posts.map( post => {
      if(searchInput !== '') {
        if(post.title.includes(searchInput)) {
          return (
              <Post key={post.id} post={post} />
          )
        }
      } else {
        return(
            <Post key={post.id} post={post} />
        )
      }
    });

    return filteredposts;
  }

  render() {
    const {posts, searchInput, myPost} = this.props;
    const displayPost = this.filterPost(posts, searchInput, myPost);
    return (
      <section className='dashboard'>
        <Search />
        <div className="container post-container">
          {displayPost}
        </div>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts.posts,
    searchInput: state.posts.searchInput,
    myPost: state.posts.myPost
  }
}

const mapDispatchToProps = {updatePost};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
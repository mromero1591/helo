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
    })
  }

  render() {
    const {posts, searchTerm} = this.props;
    const displayPost = posts.map( (post,searchTerm) => {
        return(
          <Post key={post.id} post={post} />
        )
    })
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
    posts: state.posts.posts
  }
}

const mapDispatchToProps = {updatePost};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
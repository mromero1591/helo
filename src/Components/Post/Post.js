import React, { Component } from 'react'

//custom imports
import './Post.css'

class Post extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <article className='post-container'>
        <h3>{this.props.post.title}</h3>
        <div className="post-user-section">
          <span className='post-user-name'>by authorName</span>
          <img className='post-profile-pic' src='https://robohash.org/test.png' />
        </div>
      </article>
    )
  }
}

export default Post;
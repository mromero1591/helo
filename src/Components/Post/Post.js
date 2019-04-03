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
          <span className='post-user-name'>by {this.props.post.username}</span>
          <img className='post-profile-pic' src={this.props.post.profile_pic} />
        </div>
      </article>
    )
  }
}

export default Post;
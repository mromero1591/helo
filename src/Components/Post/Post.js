import React, { Component } from 'react'
import Axios from 'axios';
//custom imports
import './Post.css'

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postId: -1,
      postTitle: '',
      postContent: '',
      postImg: '',
      postUser: {
        username: '',
        profile_pic: ''
      }
    }
  }
  componentDidMount() {
    const postId = parseInt(this.props.match.params.id);
    Axios.get(`/api/post/${postId}`)
    .then(res => {
      const {id,title,content,profile_pic,username,img} = res.data[0];
      this.setState({
        postId: id,
        postTitle: title,
        postContent: content,
        postImg: img,
        postUser: {
          username: username,
          profile_pic: profile_pic
        }
      });

      console.log(this.state);
    }).catch(err => {
      console.log('error on fron end:',err);
    });

  }

  render() {
    return (
      <section className='post'>
        <div className='post-details'>
          <h3 className='post-title'>{this.state.postTitle}</h3>
          <div className='post-user-section'>
            {this.state.postUser.username} 
            <img className='post-profile-pic' alt='profile pic' src={this.state.postUser.profile_pic}  />
          </div>
          <img className='post-img' src={this.state.postImg} attr='postimg'/>
          <p className='post-content'>{this.state.postContent}</p>
        </div>
        
      </section>
    )
  }
}

export default Post;
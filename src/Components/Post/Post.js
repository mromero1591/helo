import React from 'react'
import {Link} from 'react-router-dom';

function Post(props) {
    return (
      <Link className='post-card' to={`/post/${props.post.id}`}>
        <div className="post-title">
          {props.post.title}
        </div>
        <div className="post-user-wrapper">
          <div className="post-user-name">
            by {props.post.username}
          </div>
          <div className="profile-card-img-container">
            <img src={props.post.profile_pic} alt="profile" className="post-user-img"/>
          </div>
        </div>
      </Link>
    )
}

export default Post;
import React from 'react'

function Post(props) {
    return (
      <section className='post-card'>
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
      </section>
    )
}

export default Post;
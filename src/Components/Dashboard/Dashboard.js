import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Axios from 'axios';

//custom imports
import './Dashboard.css';
import searchLogo from '../../assest/search_logo.png';
import {updateSearchInput, updateMyPost, updatePost, clearSearch} from '../../ducks/postReducer';
import {getCookieValue} from '../../cokkies';

class Dashboard extends Component {
  componentDidMount() {
    const id = getCookieValue("userid");
    Axios.get(`/api/post/${id}`,
    {
      params: {
        userpost: this.props.myPost
      }
    })
    .then(res => {
      this.props.updatePost(res.data);
    }).catch(err => {
      console.log('error in getting post:', err);
    });
  }

  //Purpose: search the databse for a post that contais the search strings text
  //outcome: posts state is updated to contain the new post that contain the search string
  searchPost = () => {
    //get the search input and the post from props.
    const {searchInput, myPost} = this.props;

    //if my post is poitive then send the user id
    Axios.get('/api/search', {
        params: {
          userpost: myPost,
          searchString: searchInput
        }
      }).then( res => {
        this.props.clearSearch();
        this.props.updatePost(res.data);
      }).catch( err => {
        console.log(err);
      });
  }

  resetSearch = () => {
    this.props.clearSearch();
    const id = getCookieValue("userid");
    Axios.get(`/api/post/${id}`,
    {
      params: {
        userpost: this.props.myPost
      }
    })
    .then(res => {
      this.props.updatePost(res.data);
    }).catch(err => {
      console.log('error in getting post:', err);
    }); 
  }

  render() {
    const posts = this.props.posts.map( function(post) {
        return (
          <Link className='post-link' key={post.id} to={`/post/${post.id}`}>
          <article className='post-container'>
            <h3>{post.title}</h3>
            <div className="post-user-section">
              <span className='post-user-name'>by {post.username}</span>
              <img className='post-profile-pic' alt='profile pic' src={post.profile_pic} />
            </div>
          </article>
          </Link>

        );
    });
    return (
      <section className='dashboard'>
        <section className='search'>
            <div className="search-input-section">
              <input value={this.props.searchInput} placeholder='Seach by title' className='search-input' onChange={(e) => {this.props.updateSearchInput(e.target.value)}}/>
              <img onClick={this.searchPost} src={searchLogo} alt="search logo"/>
              <button onClick={this.resetSearch} className='btn-search'>reset</button>
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

const mapDispatchToProps = {updateSearchInput,updateMyPost,updatePost,clearSearch};

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
import React, { Component } from 'react'
import Axios from 'axios';

export default class PostPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            post: {}
        }
    }
    componentDidMount() {
        console.log('started');
        var id = this.props.match.params.postid
        Axios.get(`/api/post/${id}`)
        .then(res => {
            this.setState({post: res.data});
        }).catch(err => {
            console.log(err);
        });
    }
    render() {
        return (
        <section className="post-page">
            <div className='container post-wrapper'>
                <div className="post-page-header">
                    <h2>{this.state.post.title}</h2>
                    <div className="post-user-wrapper">
                    <div className="post-user-name">
                        by {this.state.post.username}
                    </div>
                    <div className="profile-card-img-container">
                        <img src={this.state.post.profile_pic} alt="profile" className="post-user-img"/>
                    </div>
                    </div>
                </div>

                <div className="post-page-content">
                    <div className="post-page-img-container">
                        <img src={this.state.post.img} alt="post content"/>
                    </div>
                    <div className="post-page-content">
                        {this.state.post.content}
                    </div>
                </div>
            </div>
        </section>
        )
    }
}

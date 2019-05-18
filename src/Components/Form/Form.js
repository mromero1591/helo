import React, {useState} from 'react'

import noImg from '../../assest/no_image.jpg';
import Axios from 'axios';

function Form(props) {

  const [imgUrl, setImgUrl] = useState(noImg);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const createPost = () => {

    Axios.post('/api/create', {title, imgUrl, content})
    .then(res => {
      props.history.push('/dashboard');
    })
  }

  const updateImage = (value, callback) => {
    var img = new Image();
    img.onload = function() {callback(true, value)};
    img.onerror = function() {callback(false, noImg)};
    img.src = value;
  }

  const validImage =(valid, url) => {
    setImgUrl(url);
  }
  return (
    <section className="page">
          <div className='container form-container'>
              <div className="page-header form-page-title">
                  <h2>New Post</h2>
              </div>

              <div className="form">
                <label>
                  Title:
                  <input value={title} onChange={( e => {setTitle(e.target.value)})} type="text"/>
                </label>
                <div className="img-container">
                    <img src={imgUrl} alt="post content"/>
                </div>
                <label htmlFor="img">
                  Image URL:
                  <input onChange={(e) => {updateImage(e.target.value, validImage)}} type="text"/>
                </label>

                <label htmlFor="content">
                  Content
                  <textarea value={content} onChange={( e => {setContent(e.target.value)})} name="content" cols="30" rows="10"></textarea>
                </label>
                <button onClick={createPost} className='btn'>Post</button>
              </div>
          </div>
      </section>
  )
}

export default Form;
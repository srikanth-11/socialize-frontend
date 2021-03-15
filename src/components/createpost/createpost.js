import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from "react-router-dom";
import { useAlert } from "react-alert";
import auth from "../../service/auth";


const CreatePost = () => {
  let history = useHistory();
  const Logout = () => {
    auth.logoutUser();
    history.push("/");
  };
  const alert = useAlert();
  const parseJwt = (token) => {

    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };
  let token = localStorage.getItem('token')
  let myemail = parseJwt(token).email
  let youremail = myemail.slice(0, -10);

  const [post, setPost] = useState()
  const submitPost = async (e) => {
    e.preventDefault()
    const data = {
      email: "kasireddysrikanth82@gmail.com",
      content: post
    }
    const result = await axios.post("https://sri-socialize.herokuapp.com/post/createpost", data, {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,

      },
    })
    if (result) {
      alert.success(result.data.message)
      history.push('/app')
    }


  }
  return <div className="container">
    <h1 style={{ justifyContent: "center", textAlign: "center" }}>
      {" "}
   Socailize<sup>2</sup>
    </h1>
    <div className="h5 mb-0 font-weight-bold text-danger">
      <Link to="/app">
        <button className="btn btn-primary float-left" >
          Go to posts
   </button>
      </Link>
    </div>
    <div className="h5 mb-0 font-weight-bold text-danger">
      <button className="btn btn-dark float-right" onClick={Logout}>
        logout
   </button>
    </div>
    <div>
      <h1
        style={{ justifyContent: "center", textAlign: "center" }}
        id="fix"
        className="text-primary center"
      >
        {youremail}
      </h1>
    </div>
    <form class="form-horizontal" onSubmit={submitPost}>

      <div class="form-group">
        <label class="control-label col-sm-2" for="pwd"><h3>Create a post</h3></label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="pwd" placeholder="share something" onChange={event => setPost(event.target.value)} />
        </div>
      </div>

      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </div>
    </form>


  </div>

}

export default CreatePost;

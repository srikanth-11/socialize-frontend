import React, { useState,useEffect } from 'react';
import { useHistory,Link } from "react-router-dom";
import { useAlert } from "react-alert";
import axios from 'axios'
import moment from 'moment';
import auth from "../../service/auth";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import MyPopup from '../../util/mypopup'

import {
  Button,
  Card,
  Form,
  Grid,
  Icon,
  Label,
} from 'semantic-ui-react';

import  DeleteCommentButton from '../commentdelete/commentdelete'

import DeleteButton from '../deletebutton/deletebutton'

function SinglePost(props) {
 const [loader, setloader] = useState("false");
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
  let myemail = parseJwt(token).email;
  let youremail = myemail.slice(0, -10);
 const postId = props.match.params.postId;
 let user = {
  email:myemail
}
 const [comment, setComment] = useState('');
 const [post, setPost] = useState([]);

 useEffect(() => {
  const fetchData = async () => {
   setloader("true");
   const data = {
     id:postId
    }
    const result = await axios.post(
      "https://sri-socialize.herokuapp.com/post/getpost", data,
      {
        headers: {
          "Content-Type": "application/json",
          'authorization': token,

        },
      }
    );
    if (result) {
     
     setloader("false");


   } else {
     alert.error('Unable to create');

   }
    
    setPost(result.data.posts);
    console.log(post)
  };
 
  fetchData();
 }, []);

 const submitComment= async () => {
 const  data={
   id:postId,
   email:user.email,
   content:comment
  }
  const result = axios.put( "https://sri-socialize.herokuapp.com/post/createcomment", data,
  {
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  }
);
if (result) {

 alert.success("comment created");
 window.location.reload()


} else {
 alert.error('Unable to create');
}
 }

 return (<> <div className="container-fluid">
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
 </div>
 <Grid>
  <Grid.Row>
    <Grid.Column width={1}>
    
    </Grid.Column>
    <Grid.Column width={12}>
      <Card fluid>
        <Card.Content>
          <Card.Header>{post.email}</Card.Header>
          <Card.Meta>{moment(post.createdAt).fromNow()}</Card.Meta>
          <Card.Description>{post.content}</Card.Description>
        </Card.Content>
        <hr />
        <Card.Content extra>
          
          <MyPopup content="Comment on post">
            <Button
              as="div"
              labelPosition="right"
              onClick={() => console.log('Comment on post')}
            >
              <Button basic color="blue">
                <Icon name="comments" />
              </Button>
              <Label basic color="blue" pointing="left">
              {}
              </Label>
            </Button>
          </MyPopup>
          {user && user.email === post.email && <DeleteButton id={post._id} />}
        </Card.Content>
      </Card>
      <div style={{ zIndex: -1 }}>
          {" "}
          <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={160}
            width={160}
            visible={loader}
          />
        </div>
      {user && (
        <Card fluid>
          <Card.Content>
            <p>Post a comment</p>
            <Form>
              <div className="ui action input fluid">
                <input
                  type="text"
                  placeholder="Comment.."
                  name="comment"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                 
                />
                <button
                  type="submit"
                  className="ui button teal"
                  disabled={comment.trim() === ''}
                  onClick={submitComment}
                >
                  Submit
                </button>
              </div>
            </Form>
          </Card.Content>
        </Card>
      )}
      {post.comments&&post.comments.map((comment) => (
        <Card fluid key={comment.id}>
          <Card.Content>
            {user && user.email === comment.email&& (
              <DeleteCommentButton id={post._id} commentid={comment._id} />
            )}
            <Card.Header>{comment.email.slice(0, -10)}</Card.Header>
            <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
            <Card.Description>{comment.content}</Card.Description>
          </Card.Content>
        </Card>
      ))}
    </Grid.Column>
  </Grid.Row>
</Grid>
</>
);
}
export default SinglePost
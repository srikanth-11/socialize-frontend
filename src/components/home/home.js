import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import moment from 'moment'
import axios from 'axios'
import { Button, Label, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import MyPopup from '../../util/mypopup'
import DeleteButton from '../../components/deletebutton/deletebutton'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import auth from "../../service/auth";



function SimpleCard() {
  const [loader, setloader] = useState("false");
  let history = useHistory();
  const Logout = () => {
    auth.logoutUser();
    history.push("/");
  };

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
  let user = {
    email: myemail
  }


  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setloader("true");
      const result = await axios.get(
        "https://sri-socialize.herokuapp.com/post/getposts",
        {
          headers: {
            "Content-Type": "application/json",
            'authorization': token,

          },
        }
      );
      if (result) {
        setloader("false");
        setPost(result.data.posts);

        console.log(post)
      }
    };

    fetchData();
  }, []);


  return <div className="container-fluid">
    <h1 style={{ justifyContent: "center", textAlign: "center" }}>
      {" "}
   Socailize<sup>2</sup>
    </h1>
    <div className="h5 mb-0 font-weight-bold text-danger">
      <Link to="/createpost">
        <button className="btn btn-primary float-left" >
          createpost
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

    <div className="row">

      <div style={{ zIndex: -1 }}> <Loader type="ThreeDots" color="#00BFFF" height={160} width={160} visible={loader} /></div>

      {
        post.map((item, index) => (
          <div className="col-xl-4 col-md-6 mb-4 p-1 " key={item._id}>
            <div className="card   shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="h5 mb-0 p-1 font-weight-bold ">
                      {item.email.slice(0, -10)}

                    </div>

                    <div className="text-xl font-weight-bold text mb-1">
                      {moment(item.createdAt).fromNow()}
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-primary">
                      {item.content}
                    </div>
                    <div>


                      <MyPopup content="Comment on post">
                        <Button labelPosition="right" as={Link} to={`/posts/${item._id}`}>
                          <Button color="blue" basic>
                            <Icon name="comments" />
                          </Button>
                          <Label basic color="blue" pointing="left">
                            {item.comments.length}
                          </Label>
                        </Button>
                      </MyPopup>
                      {user && user.email === item.email && <DeleteButton id={item._id} />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
        )}
    </div>
  </div>
}
export default SimpleCard;
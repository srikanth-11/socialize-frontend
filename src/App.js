import './App.css';
import SimpleCard from './components/home/home'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SinglePost from './components/singlepost/singlepost'
import CreatePost from './components/createpost/createpost'
import AlertTemplate from "react-alert-template-basic";
import Signup from './components/signup/signup'
import Login from './components/login/login'
import Forgotpassword from './components/forgotpassword/forgotpassword'
import Resetpassword from './components/resetpassword/resetpassword'
import { positions, Provider } from "react-alert";
import ProtectedRoute from './components/protected-route/protectedroute'
import Landingpage from './components/landingpage/landingpage'

function App() {
 const options = {
  timeout: 3000,
  position: positions.TOP_RIGHT
};
 return<> <Provider template={AlertTemplate} {...options}> <Router>
 
  <ProtectedRoute exact path="/posts/:postId" component={SinglePost} />
  <ProtectedRoute exact path="/app" component={SimpleCard} />
  <ProtectedRoute exact path="/createpost" component={CreatePost}/>
  <Route exact path="/signup" component={Signup} />
   <Route exact path="/login" component={Login} />
   <Route exact path="/forgotpassword" component={Forgotpassword} />
        <Route path="/reset-password/:resetToken" component={Resetpassword} />
        <Route exact path="/" component={Landingpage}/>
 </Router>
 </Provider>
 </>
}

export default App;

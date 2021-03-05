import './App.css';
import "./pages/LoginPage"
import { React, useEffect, useState, Fragment } from "react"
import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router, Route } from "react-router-dom"
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import { getToken, initAxiosInterceptors } from './auth';
import axios from 'axios';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Publish from './pages/Publish';
import CreateTopic from './pages/CreateTopic';
import ExplorePage from './pages/ExplorePage';
import TopicPage from './pages/TopicPage';


function App() {
  const [user, setUser] = useState(null)

  function fetchUser() {
    axios.get("/api/user/whoami")
      .then(({ data }) => {
        if (!user) {
          setUser(data.user)
          console.log(data.user);
        }
      }).catch((err) => {
        setUser(null)
      })
  }

  useEffect(() => {
    if (getToken()) {
      fetchUser();
    }
  }, [])
  return (
    <Router >
      <Fragment>
        <Navbar updateUser={() => fetchUser()} user={user} />
        <main>

          <Route path="/login" component={LoginPage} exact />
          <Route path="/register" component={RegisterPage} exact />
          <Route path="/" component={RegisterPage} exact />
          <ProtectedRoute component={Publish} user={user} path="/publish" />          
          <ProtectedRoute component={CreateTopic} user={user} path="/create-topic" />
          <ProtectedRoute component={ExplorePage} user={user} path="/explore" />
          <Route path="/topic/:id" component={TopicPage} />
          <Route path="/home" component={(props) => <HomePage {...props} user={user} updateUser={() => fetchUser()} exact />} />
        </main>
      </Fragment>
    </Router>
  );
}

export default App;

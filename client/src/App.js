import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Write from './pages/write/Write';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import SinglePost from './pages/singlepost/SinglePost';
import MyStory from './pages/mystory/MyStory';


function App() {
  return (
    <BrowserRouter>
      <div className="appMain">
          <Navbar/>
          <Switch>
            <Route path="/" exact><Home/></Route>
            <Route path="/login"><Login/></Route>
            <Route path="/register"><Register/></Route>
            <Route path="/write"><Write/></Route>
            <Route path="/singlepost/:id"><SinglePost/></Route>
            <Route path="/mystory/:user"><MyStory/></Route>
          </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;


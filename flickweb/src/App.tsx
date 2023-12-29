import '../src/App.scss'
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";

import HomeScreen from './screens/homeScreen';
import ProfileScreen from './screens/profile';
import WatchScreen from './screens/watchScreen';
import LoginScreen from './screens/loginScreen';
import { LoggedIn } from './screens/features/localState';
import AddDataScreen from './screens/addDataScreen';
import BottomNav from './screens/components/bottomNav';


function App() {
  return (
    <div className="base-flex App">
      <Router>
        <Switch>
          <Route path="/" exact component={() => <HomeScreen mediaPage={'home'} />} />
          <Route path="/movies" exact component={() => <HomeScreen mediaPage={'Movie'} />} />
          <Route path="/shows" exact component={() => <HomeScreen mediaPage={'Show'} />} />
          <Route path="/watch" exact component={() => <WatchScreen />} />
          <Route path="/add-data" exact component={() => <AddDataScreen />} />
          <Route path="/login" exact component={() => LoggedIn() ? <LoginScreen /> : <ProfileScreen />} />
          <Route path="/profile" exact component={() => LoggedIn() ? <ProfileScreen /> : <LoginScreen />} />
        </Switch>
        <BottomNav />
      </Router>
    </div>
  );
}

export default App;

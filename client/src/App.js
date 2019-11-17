import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Navigation from './Components/layout/Navigation/Navigation';
import Home from './Components/layout/Home/Home';
import Footer from './Components/layout/Footer/Footer';
import Login from './Components/layout/Login/Login';
import SignUp from './Components/layout/Signup/SignUp';
import Diary from './Components/layout/Diary/Diary';
import SetCalories from './Components/layout/SetCalories/SetCalories';
import Food from './Components/layout/Food/Food';
import ProileState from './Components/Context/profile/ProfileState';
import FoodModal from './Components/layout/Food/FoodModal/FoodModal';
import AlertMsg from './Components/Ui/AlertMsg/AlertMsg';
import AlertState from './Components/Context/alert/AlertState';
import AuthState from './Components/Context/auth/AuthState';
import PrivateRoute from './Components/routing/PrivateRoute';

const App = () => (
  <AuthState>
    <ProileState>
      <AlertState>
        <Router>
          <>
            <Navigation />
            <AlertMsg />
            <Switch>
              <Route exact path='/signup' component={SignUp} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/setcalories' component={SetCalories} />
              <PrivateRoute exact path='/food' component={Food} />
              <PrivateRoute exact path='/diary' component={Diary} />
              <Route exact path='/home' component={Home} />
              <Redirect from='/' to='/home' />
            </Switch>
            <Footer />
            <FoodModal />
          </>
        </Router>
      </AlertState>
    </ProileState>
  </AuthState>
);

export default App;

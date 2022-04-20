import * as React from 'react'
import { Route, useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux';

const GuardRoute = ({children,  ...rest}) => {

  let { user } = useSelector(state => state.auth);
  let navigate = useNavigate();

  return <Route {...rest}>
    {user ? children : navigate('/login')}
  </Route>
};

export default GuardRoute;
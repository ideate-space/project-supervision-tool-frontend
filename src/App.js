import React from 'react';
import './App.css';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import SignIn from './App/Auth/components/SignIn';
import BaseLayout from './App/layouts/BaseLayout';


Spin.setDefaultIndicator(<LoadingOutlined style={{ fontSize: 24 }} spin />);
const App = () => {
  return (
    <div className="App">
      <HashRouter hashType="hashbang">
        <Switch>
          <Route path="/app" component={BaseLayout} />
          <Route path="/signin" component={SignIn} />
          <Redirect to="/signin" />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;

import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Calc from './pages/Calculator';
import Cal from './pages/Calendar';
import Media from './pages/Media';
import 'react-calendar/dist/Calendar.css';
import Player from './pages/Player';
import './custom.css';
import 'antd/dist/antd.css';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/calculator" component={Calc} />
          <Route path="/calendar" component={Cal} />
          <Route path="/media" component={Media} />
          <Route path="/player" component={Player} />
        </Switch>
      </BrowserRouter>
    );
  }
}
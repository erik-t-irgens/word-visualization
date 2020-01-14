
import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import { Container } from "semantic-ui-react";

import NotFound from './SharedComponents/NotFound'
import Dashboard from './views/Dashboard';
import DataGraph from './views/DataGraph';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className='App'
      >
        <Helmet>
          <title>Twitter Visualization</title>
        </Helmet>
        <BrowserRouter>
          <div>



            <Container fluid style={{ padding: '0 1em' }}>
              <Switch>
                {/* NOTE: greedy paths by default apparently. */}
                <Route exact path={'/'} component={Dashboard} />

                <Route path={'/DataGraph/'} component={DataGraph} />
                <Route path={'/'} status={404} component={NotFound} />
              </Switch>
            </Container>
          </div>
        </BrowserRouter>

      </div>
    );
  }
}


export default App
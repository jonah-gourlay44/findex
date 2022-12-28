import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Dash from 'dash';
import Portfolio from 'portfolio';

class Main extends Component {

    render() {
        return (
            <Switch>
                <Route exact path="/" component={Dash} />
                <Route path="/portfolio" component={Portfolio} />
            </Switch>
        );
    }
}

export default Main;
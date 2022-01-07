import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Pick, Detail } from '../pages';
import '../css/App.css';
function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route path="/pick/detail" component={Detail}></Route>
                <Route path="/pick" component={Pick}></Route>
            </Switch>
        </Router>
    );
}

export default App;

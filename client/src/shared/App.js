import React from 'react';
import Home from "../pages/Home";
import PickOrder from "../pages/PickOrder";
import { BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route path="/pickorder" component={PickOrder}></Route>
            </Switch>
        </Router>
    )
}

export default App

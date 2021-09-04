import React from 'react';
import Home from "../pages/Home";
import PickOrder from "../pages/PickOrder";
import FirstPick from "../pages/FirstPick";
import LastPick from "../pages/LastPick";
import { BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route path="/pickorder/firstpick" component={FirstPick}></Route>
                <Route path="/pickorder/Lastpick" component={LastPick}></Route>
                <Route path="/pickorder" component={PickOrder}></Route>
            </Switch>
        </Router>
    )
}

export default App

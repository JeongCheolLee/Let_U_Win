import React from 'react';
// import Home from '../pages/Home';
// import PickOrder from '../pages/PickOrder';
// import FirstPick from '../pages/FirstPick';
// import LastPick from '../pages/LastPick';
// import Detail from '../pages/Detail';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
    Home,
    PickOrder,
    FirstPick,
    LastPick,
    Detail,
    TestPage,
} from '../pages';
import '../css/App.css';
function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route
                    path="/pickorder/:order/detail"
                    component={Detail}
                ></Route>
                <Route
                    path="/pickorder/firstpick"
                    component={FirstPick}
                ></Route>
                <Route path="/pickorder/Lastpick" component={LastPick}></Route>
                <Route path="/pickorder" component={PickOrder}></Route>
                <Route path="/test" component={TestPage} />
            </Switch>
        </Router>
    );
}

export default App;

import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Zxing from "./Zxing";
import Html5Qrcode from "./Html5Qrcode";

export default function App() {
    return (
        <Router>
            <div>
                {/*<nav>*/}
                {/*    <ul>*/}
                {/*        <li>*/}
                {/*            <Link to="/">Home</Link>*/}
                {/*        </li>*/}
                {/*        <li>*/}
                {/*            <Link to="/zxing">Zxing</Link>*/}
                {/*        </li>*/}
                {/*        <li>*/}
                {/*            <Link to="/html5-qrcode">html5-qrcode</Link>*/}
                {/*        </li>*/}
                {/*    </ul>*/}
                {/*</nav>*/}

                <Switch>
                    <Route path="/zxing">
                        <Zxing />
                    </Route>
                    <Route path="/html5-qrcode">
                        <Html5Qrcode />
                    </Route>
                    <Route path="/">

                        <Html5Qrcode />
                    </Route>
                </Switch>
                <div id="reader" width="300px" style={ {marginTop: 30} }></div>
            </div>
        </Router>
    );
}

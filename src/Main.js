import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";

class Main extends Component {
    render = () => {
        return (
            <Switch>
                {/*load component tiap halaman */}
                <Route path="/barang" component={Barang} />
            </Switch>
        );
    }
}

export default Main;
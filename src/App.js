import React from 'react';
import { Route } from 'react-router-dom';
import IndexTable from './components/IndexTable';
import SortingVisualizer from './components/SortingVisualizer';

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Route exact path="/" component={IndexTable} />
                <Route path="/sorting" component={SortingVisualizer} />
            </div>
        ); 
    }
}

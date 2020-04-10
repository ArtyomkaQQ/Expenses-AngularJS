import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Home from './Home';
import Category from './Category';
import Expense from './Expense';
import ExpenseEdit from './ExpenseEdit';

class App extends Component {
    state = {}
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={Home} />
                    <Route path='/categories' exact={true} component={Category} />
                    <Route path='/expenses' exact={true} component={Expense} />
                    <Route path='/expense/:id' component={ExpenseEdit} />
                </Switch>
            </Router>
        );
    }
}

export default App;
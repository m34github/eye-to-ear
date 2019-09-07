import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import Upload from './components/Upload.jsx';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/upload" component={Upload} />
          <Redirect to="/upload" />
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));

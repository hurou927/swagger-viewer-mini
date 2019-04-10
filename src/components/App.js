import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import ServiceConfigContext from '../contexts/ServiceConfigContext'
import axios from 'axios'
import yml from 'js-yaml'

import Common from './Common'
import Home from './Home'
import Swagger from './Swagger'


class App extends Component {

  state = { config: {Servicies:{}}}

  componentDidMount() {
    axios.get('/config.yml').then((response) => {
      const config = yml.safeLoad(response.data);
      this.setState({ config: config});
    }).catch((error)=>{
      console.log('ERROR!! occurred in Backend.')
    });
  }


  render() {

    const {config} = this.state;
    const servicies = Object
      .keys(config.Servicies)
      .map(v=>({
        ... config.Servicies[v],
        servicename: v
      }));


    return (
      <div style={{ 'padding': '0 20px 0 20px' }}>
        {/* TopBar */}
        <ServiceConfigContext.Provider value={config}>
          <BrowserRouter>
            <div id='browserRouter'>
              <Common servicies={servicies} />
              <Switch>
                <Route exact path='/' component={() => (<Home />)} />
                <Route path='/servicies/:serviceName' component={() => (<Swagger />)} />
                <Route path='/home' component={() => (<Home/>)} />
              </Switch>
            </div>
          </BrowserRouter>
        </ServiceConfigContext.Provider>

      </div>
    );
  }
}

export default App;

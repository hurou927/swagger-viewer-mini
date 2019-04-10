import React, { useEffect, useContext, useState } from 'react';
import { withRouter } from 'react-router-dom'
import SwaggerUi, { presets } from 'swagger-ui';
import { Dropdown, Header, Grid } from 'semantic-ui-react'
import ServiceConfigContext from '../contexts/ServiceConfigContext'
import 'swagger-ui/dist/swagger-ui.css';

import LSCache from '../common/localStorageCache.js'
const lsCache = new LSCache();

const credentialOptions = ['same-origin', 'omit', 'include']
  .map(v=>({key: v, text: v, value: v}))
const modeOptions = ['cors', 'same-origin', 'no-cors', 'navigate']
  .map(v => ({ key: v, text: v, value: v }))

function SwaggerView(props) {

  const config = useContext(ServiceConfigContext);
  const { serviceName } = props.match.params;

  const [credentials, setCredentials] = useState(lsCache.get('credentials').value || credentialOptions[0].key) 
  const [mode, setMode] = useState(lsCache.get('mode').value || modeOptions[0].key) 

  console.log(lsCache.get('credentials'));

  let swaggerURL = '';
  if (serviceName in config.Servicies) {
    swaggerURL = config.Servicies[serviceName].path
  }


  useEffect(() => {
    SwaggerUi({
      dom_id: '#swaggerContainer',
      url: swaggerURL,
      spec: props.spec,
      presets: [presets.apis],
      requestInterceptor: (request) => {
        request.credentials = credentials;
        request.mode = mode;
      },
    });
  });

  return (<div>
    <div>
      <Header as='h3'>Request Settings</Header>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            credentials
            <Dropdown 
              placeholder='Credentials'
              selection options={credentialOptions}
              defaultValue={credentials}
              onChange={(_, { value }) => { setCredentials(value); lsCache.put('credentials', value); }}
            />
          </Grid.Column>
          <Grid.Column>
            mode
            <Dropdown
              placeholder='Mode'
              selection options={modeOptions}
              defaultValue={mode}
              onChange={(_, { value }) => { setMode(value); lsCache.put('mode', value);}}
          />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
    <div id="swaggerContainer" />
  </div>);

}

export default withRouter(SwaggerView);
import React from 'react';
import remark  from 'remark';
import reactRenderer from 'remark-react';


const homeDoc=`
# Swagger Viewer

## Add Service
1. modify config.yml
    - servicename
    - path
2. add openapi.yml
`


function Home(props) {
  return <div>
    {remark().use(reactRenderer).processSync(homeDoc).contents}
  </div>;
}

export default Home;
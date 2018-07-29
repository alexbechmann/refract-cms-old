import * as React from 'react';
import { Admin } from '@headless-cms/admin-ui';


class App extends React.Component {

  render() {
    return (
      <div>
        <Admin serverUrl="http://localhost:3300" />
      </div>
    );
  }
}

export default App;

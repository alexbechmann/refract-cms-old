# Render Admin dashboard in existing app (Option B)
Use this if you would like to host the CMS dashboard on the same app as your frontend, mostly for convenience. For larger apps, we recommend hosting this seperately.

NB:
* It is entirely possible to start with option B, and move to option A at a later date, or even both.
* Currently only supports use with `react-router-dom` package for routing.

`Edit index.tsx`
```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Root = () => (
  <BrowserRouter>
    <Switch>
      <Route path={`/`} exact component={App} />
      <Route path={`/admin`} component={Admin} />
    </Switch>
  </BrowserRouter>
)
ReactDOM.render(<Root />, document.getElementById('root') as HTMLElement);
```
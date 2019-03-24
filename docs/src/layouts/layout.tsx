import * as React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

interface LayoutProps {
  title: string;
}

interface Props extends LayoutProps {}

const Layout: React.ComponentType<Props> = ({ title, children }) => (
  <>
    <AppBar>
      <Toolbar>
        <Typography color="inherit" variant="h6">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
    <Helmet
      title={title}
      meta={[{ name: 'description', content: 'Sample' }, { name: 'keywords', content: 'sample, something' }]}
    />
    {children}
  </>
);

export default Layout as React.ComponentType<LayoutProps>;

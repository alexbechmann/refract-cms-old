import React from 'react';
import GatsbyLink, { navigate } from 'gatsby-link';
import Layout from '../layouts/layout';
import { graphql } from 'gatsby';
import {
  Button,
  Typography,
  Divider,
  ListItem,
  ListItemText,
  List,
  Avatar,
  ListItemAvatar,
  Grid,
  Menu,
  MenuItem,
  MenuList,
  Paper
} from '@material-ui/core';
import DocsMenu from '../menu/docs-menu';

interface DocsPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
    [key: string]: any;
  };
}

export default class extends React.Component<DocsPageProps, {}> {
  constructor(props: DocsPageProps, context: any) {
    super(props, context);
  }
  public render() {
    return (
      <Layout title="Docs">
        <Typography paragraph>Welcome to the Refract Cms docs</Typography>
        <Paper>
          <DocsMenu />
        </Paper>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query DocsQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

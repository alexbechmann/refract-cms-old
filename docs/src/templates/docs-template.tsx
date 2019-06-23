import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Layout from '../layouts/layout';
import { graphql } from 'gatsby';
import { Grid, Paper } from '@material-ui/core';
import DocsMenu from '../menu/docs-menu';

class DocsTemplate extends Component<any> {
  render() {
    const { markdownRemark: page } = this.props.data;
    return (
      <Layout title={page.frontmatter.title}>
        <Helmet title={page.frontmatter.title} />
        <Grid container spacing={16}>
          <Grid item xs={12} sm={9}>
            <div dangerouslySetInnerHTML={{ __html: page.html }} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Paper>
              <DocsMenu />
            </Paper>
          </Grid>
        </Grid>
      </Layout>
    );
  }
}
export default DocsTemplate;

export const pageQuery = graphql`
  query DocsByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`;

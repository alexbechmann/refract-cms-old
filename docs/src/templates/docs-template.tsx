import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Layout from '../layouts/layout';
import { Typography, Divider } from '@material-ui/core';

class DocsTemplate extends Component<any> {
  render() {
    const { markdownRemark: page } = this.props.data;
    return (
      <Layout title={page.frontmatter.title}>
        <Helmet title={page.frontmatter.title} />
        <Typography gutterBottom variant="h4">
          {page.frontmatter.title}
        </Typography>
        <Divider />
        <div dangerouslySetInnerHTML={{ __html: page.html }} />
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

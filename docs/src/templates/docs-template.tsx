import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Layout from '../layouts/layout';
import { graphql } from 'gatsby';

class DocsTemplate extends Component<any> {
  render() {
    const { markdownRemark: page } = this.props.data;
    return (
      <Layout title={page.frontmatter.title}>
        <Helmet title={page.frontmatter.title} />
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

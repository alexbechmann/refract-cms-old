import React from 'react';
import GatsbyLink, { navigate } from 'gatsby-link';
import Layout from '../layouts/layout';
import { graphql } from 'gatsby';
import {
  Link,
  Button,
  Typography,
  Divider,
  ListItem,
  ListItemText,
  List,
  Avatar,
  ListItemAvatar
} from '@material-ui/core';
import Img from 'gatsby-image';

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface ScreenshotsPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
    [key: string]: any;
  };
}

export default class extends React.Component<ScreenshotsPageProps, {}> {
  constructor(props: ScreenshotsPageProps, context: any) {
    super(props, context);
  }
  public render() {
    return (
      <Layout title="Screenshots">
        <Typography variant="h5" gutterBottom>
          Screenshots
        </Typography>
        <Img fluid={this.props.data.img1.childImageSharp.fluid} />
        <br />
        <Img fluid={this.props.data.img2.childImageSharp.fluid} />
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query ScreenshotPageQuery {
    site {
      siteMetadata {
        title
      }
    }
    img1: file(relativePath: { eq: "blog-post-editor.png" }) {
      childImageSharp {
        fluid(maxWidth: 1280) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    img2: file(relativePath: { eq: "graphql-playground.png" }) {
      childImageSharp {
        fluid(maxWidth: 1280) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

import React from 'react';
import GatsbyLink, { navigate } from 'gatsby-link';
import Layout from '../layouts/layout';
import { graphql, StaticQuery } from 'gatsby';
import { MenuItem, MenuList, Paper } from '@material-ui/core';

const QUERY = graphql`
  {
    allMarkdownRemark(sort: { fields: [frontmatter___order], order: ASC }) {
      nodes {
        frontmatter {
          title
          path
        }
      }
    }
  }
`;

export default () => {
  return (
    <StaticQuery
      query={QUERY}
      render={data => {
        return (
          <MenuList>
            {data.allMarkdownRemark.nodes.map(node => {
              return (
                <MenuItem button component={(props: any) => <GatsbyLink {...props} to={node.frontmatter.path} />}>
                  {node.frontmatter.title}
                </MenuItem>
              );
            })}
          </MenuList>
        );
      }}
    />
  );
};

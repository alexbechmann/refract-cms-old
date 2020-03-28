import React from 'react';
import GatsbyLink, { navigate } from 'gatsby-link';
import Layout from '../layouts/layout';
import { graphql, StaticQuery } from 'gatsby';
import { MenuItem, MenuList, Paper, ListItem, List, ListSubheader, ListItemText } from '@material-ui/core';

const QUERY = graphql`
  {
    allMarkdownRemark(sort: { fields: [frontmatter___order], order: ASC }) {
      nodes {
        frontmatter {
          title
          path
          section
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
        let sections = data.allMarkdownRemark.nodes.map(node => node.frontmatter.section);
        sections = Array.from(new Set(sections));
        console.log(sections);
        return (
          <List>
            {sections.map(section => {
              return (
                <>
                  <ListSubheader>{section}</ListSubheader>
                  {data.allMarkdownRemark.nodes
                    .filter(node => node.frontmatter.section === section)
                    .map(node => {
                      return (
                        <ListItem
                          button
                          component={(props: any) => <GatsbyLink {...props} to={node.frontmatter.path} />}
                        >
                          <ListItemText primary={node.frontmatter.title} />
                        </ListItem>
                      );
                    })}
                </>
              );
            })}
          </List>
        );
      }}
    />
  );
};

import * as React from 'react';
import { withStyles, WithStyles, Theme, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import classNames from 'classnames';
import CardMedia from '@material-ui/core/CardMedia';
import { Link } from 'react-router-dom';

const styles = (theme: Theme) => ({
  heroUnit: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    minHeight: 370
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6
  },
  cardContent: {
    minHeight: '163px'
  }
});

interface Props extends WithStyles<typeof styles> {}

const packages = [
  {
    name: '@refract-cms/core',
    description:
      'Define your schema using built-in or your custom react components & render your CMS dashboard to a react app.',
    image: '/npm.png',
    docsLink: '/core'
  },
  {
    name: '@refract-cms/server',
    description: 'Hosts API endpoints that the CMS dashboard communicates with, add this to your express app.',
    image: '/npm.png',
    docsLink: '/server'
  }
];

const Home = (props: Props) => {
  const { classes } = props;
  return (
    <main>
      {/* Hero unit */}
      <div className={classes.heroUnit}>
        <div className={classes.heroContent}>
          <Typography variant="display2" align="center" color="inherit" gutterBottom>
            Refract CMS Docs
          </Typography>
          <Typography variant="subheading" align="center" color="inherit" paragraph>
            Refract-CMS allows you to build a frontend first, code first, headless CMS using React, Express & MongoDB.
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={16} justify="center">
              <Grid item>
                <Button target="_blank" href="https://github.com/alexbechmann/refract-cms" variant="contained">
                  View on Github
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
      <div className={classNames(classes.layout, classes.cardGrid)}>
        {/* End hero unit */}
        <Grid container spacing={40}>
          {packages.map((pkg, index) => (
            <Grid key={index} item sm={4} md={3} lg={3}>
              <Card>
                <CardMedia className={classes.cardMedia} image={pkg.image} title="NPM" />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="title" component="h2">
                    {pkg.name}
                  </Typography>
                  <Typography>{pkg.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    target="_blank"
                    href={`https://www.npmjs.com/package/${pkg.name}`}
                    size="small"
                    color="primary"
                  >
                    View on npm
                  </Button>
                  <Button component={(buttonProps: any) => <Link to={pkg.docsLink} {...buttonProps} />}>Docs</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </main>
  );
};

export default withStyles(styles)(Home) as React.ComponentType<{}>;

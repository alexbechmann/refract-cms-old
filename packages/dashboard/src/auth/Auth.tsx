import React, { Component, ChangeEvent } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { RouteComponentProps } from '@reach/router';
import { createStyles, Theme } from '@material-ui/core';
import gql from 'graphql-tag';
import { Mutation, withApollo, WithApolloClient } from 'react-apollo';
import { connect } from 'react-redux';
import { combineContainers } from 'combine-containers';
import { setActiveUserToken } from './state/auth.actions';
import { AppState } from '../state/app.state';

interface AuthProps extends RouteComponentProps {}

interface DispatchProps {
  setAccessToken: (token: string) => void;
}

interface Props extends AuthProps, WithStyles<typeof styles>, DispatchProps, WithApolloClient<any> {}

const generateAccessTokenMutation = gql(`
  mutation generateAccessToken($username: String!, $password: String!) {
    generateAccessToken(username: $username, password: $password)
  }
`);

const styles = (theme: Theme) =>
  createStyles({
    layout: {
      width: 'auto',
      display: 'block', // Fix IE11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: '100%', // Fix IE11 issue.
      marginTop: theme.spacing.unit
    },
    submit: {
      marginTop: theme.spacing.unit * 3
    },
    button: {
      marginTop: theme.spacing.unit
    }
  });

interface State {
  username: string;
  password: string;
}

class Auth extends Component<Props, any> {
  state: State = {
    username: '',
    password: ''
  };

  onChange = (name: string) => (e: ChangeEvent<HTMLInputElement>) => this.setState({ [name]: e.target.value });

  render() {
    const { classes } = this.props;
    return (
      <Mutation mutation={generateAccessTokenMutation}>
        {(generateAccessToken, { data, error }) => {
          return (
            <React.Fragment>
              <CssBaseline />
              <main className={classes.layout}>
                <Paper className={classes.paper}>
                  <Avatar className={classes.avatar}>
                    <LockIcon />
                  </Avatar>
                  <Typography variant="headline">Sign in</Typography>
                  <form
                    className={classes.form}
                    onSubmit={e => {
                      e.preventDefault();
                      const { username, password } = this.state;
                      generateAccessToken({
                        variables: {
                          username,
                          password
                        }
                      }).then((response: any) => {
                        const token = response.data.generateAccessToken;
                        this.props.setAccessToken(token);
                        this.props.client.resetStore();
                      });
                    }}
                  >
                    {error && <p>{error.message}</p>}
                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="username">Username</InputLabel>
                      <Input
                        value={this.state.username}
                        onChange={this.onChange('username')}
                        id="username"
                        name="username"
                        autoFocus
                      />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="password">Password</InputLabel>
                      <Input
                        value={this.state.password}
                        onChange={this.onChange('password')}
                        name="password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                      />
                    </FormControl>

                    <Button type="submit" fullWidth variant="raised" color="primary" className={classes.submit}>
                      Sign in
                    </Button>
                  </form>
                </Paper>
              </main>
            </React.Fragment>
          );
        }}
      </Mutation>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {};
}

function mapDispatchToProps(dispatch): DispatchProps {
  return {
    setAccessToken: token => dispatch(setActiveUserToken(token))
  };
}

export default combineContainers(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles),
  withApollo
)(Auth) as React.ComponentType<AuthProps>;

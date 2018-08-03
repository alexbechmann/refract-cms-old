import * as React from 'react';
import { EntitySchema } from './entity-schema';
import { withRouter, RouteComponentProps } from 'react-router';
import { AppState } from '../state/app.state';
import { connect } from 'react-redux';
import { combineContainers } from 'combine-containers';
import { Routes } from '../router/routes';
import { Button, List, ListItem, ListItemText, CircularProgress, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

export interface EntityListProps {
  routes: Routes;
}

interface State {
  docs: firebase.firestore.QueryDocumentSnapshot[];
  loading: boolean;
}

interface Props extends EntityListProps, RouteComponentProps<{}>, EntityListPropsExtended {}

class EntityList extends React.Component<Props> {
  unsubscribe?: Function;
  state: State = {
    docs: [],
    loading: true
  };

  componentDidMount() {
    this.unsubscribe = firebase
      .firestore()
      .collection(this.props.entity.options.alias)
      .limit(this.props.entity.options.maxOne ? 1 : 10)
      .onSnapshot(snapshot => {
        this.setState({
          docs: snapshot.docs
        });
        this.setState({
          loading: false
        });
      });
  }

  render() {
    return this.state.loading ? (
      <CircularProgress />
    ) : (
      <div>
        <Typography variant="title" gutterBottom>
          {this.props.entity.options.displayName || this.props.entity.options.alias}
        </Typography>
        {this.props.entity.options.maxOne && this.state.docs.length >= 1 ? <React.Fragment /> : this.renderNewButton()}
        <List>
          {this.state.docs.map(doc => {
            return (
              <ListItem
                key={doc.id}
                button
                component={(props: any) => (
                  <Link
                    {...props}
                    to={this.props.routes.entityEditById.url({
                      id: doc.id,
                      entityAlias: this.props.entity.options.alias
                    })}
                  />
                )}
              >
                <ListItemText primary={doc.id} />
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }

  renderNewButton() {
    return (
      <Button
        component={(props: any) => (
          <Link
            {...props}
            to={this.props.routes.entityEditById.url({
              id: undefined,
              entityAlias: this.props.entity.options.alias
            })}
          />
        )}
      >
        New
      </Button>
    );
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}

export interface EntityListPropsExtended {
  entity: EntitySchema;
}

function mapStateToProps(state: AppState): EntityListProps {
  return {
    routes: state.router.routes
  };
}

export default combineContainers(withRouter, connect(mapStateToProps))(EntityList) as React.ComponentType<
  EntityListPropsExtended
>;

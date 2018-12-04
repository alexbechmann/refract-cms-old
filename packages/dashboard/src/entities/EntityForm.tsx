import React, { Component } from 'react';
import { EntitySchema, graphqlQueryHelper, Entity } from '@refract-cms/core';
import RenderEditor from './RenderEditor';
import { navigate } from '@reach/router';
import {
  Button,
  LinearProgress,
  Typography,
  WithStyles,
  withStyles,
  createStyles,
  Theme,
  Toolbar,
  AppBar,
  Grid
} from '@material-ui/core';
import { connect } from 'react-redux';
import { combineContainers } from 'combine-containers';
import { AppState } from '../state/app.state';
import { Routes } from '../router/routes';
import { RouteComponentProps } from '@reach/router';
import { WithApolloClient, withApollo } from 'react-apollo';
import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';
import Page from '../pages/Page';

interface State {
  updateValues: any;
  loading: boolean;
}

const styles = (theme: Theme) =>
  createStyles({
    card: {
      margin: theme.spacing.unit
    },
    propertyEditor: {
      marginBottom: theme.spacing.unit * 4
    },
    appBar: {}
  });

interface Props
  extends EntityFormProps,
    WithStyles<typeof styles>,
    ReturnType<typeof mapStateToProps>,
    WithApolloClient<EntityFormProps> {}

class EntityForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const updateValues: any = {};
    if (props.newEntity) {
      Object.keys(props.schema.properties).forEach(propertyKey => {
        const propertyOptions = props.schema.properties[propertyKey];
        updateValues[propertyKey] = propertyOptions.defaultValue;
      });
      this.state = {
        updateValues,
        loading: false
      };
    } else {
      this.state = {
        updateValues,
        loading: true
      };
    }

    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.back = this.back.bind(this);
  }

  componentDidMount() {
    const { schema, id, newEntity, client } = this.props;
    if (!newEntity) {
      client
        .query<{ item: Entity }>({
          query: graphqlQueryHelper.getByIdQueryWithAllFields(schema, id!)
        })
        .then(({ data, errors }) => {
          if (!errors) {
            this.setState({
              loading: false,
              updateValues: data.item
            });
          }
        });
    }
  }

  render() {
    const { schema, classes } = this.props;
    return this.state.loading ? (
      <LinearProgress />
    ) : (
      <Page title={schema.options.displayName || schema.options.alias}>
        <Grid justify="center" container>
          <Grid item xs={12} sm={12} md={10} lg={8} xl={7}>
            <div className={classes.card}>
              {Object.keys(schema.properties).map((propertyKey: string, index: number) => {
                const propertyOptions = schema.properties[propertyKey];
                return (
                  <div key={index} className={classes.propertyEditor}>
                    <Grid container spacing={16}>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                        <Typography variant="subheading" gutterBottom>
                          {propertyOptions.displayName || propertyKey}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                        <RenderEditor
                          setValue={value => {
                            this.setState({
                              updateValues: {
                                ...this.state.updateValues,
                                [propertyKey]: value
                              }
                            });
                          }}
                          value={this.state.updateValues[propertyKey]}
                          propertyKey={propertyKey}
                          propertyOptions={propertyOptions}
                        />
                      </Grid>
                    </Grid>
                  </div>
                );
              })}
              <Button onClick={this.back}>Back</Button>
              <Button onClick={this.delete}>Delete</Button>
              <Button color="primary" onClick={this.save}>
                Save
              </Button>
            </div>
          </Grid>
        </Grid>
      </Page>
    );
  }

  save() {
    this.props.saveEntity(this.state.updateValues).then(() => {
      this.props.client.resetStore();
      this.back();
    });
  }

  delete() {
    if (window.confirm('Are you sure you want to delete?')) {
      const client: ApolloClient<any> = this.props.client;
      client
        .mutate({
          mutation: gql(`
      mutation {
        ${this.props.alias}Delete(id: "${this.props.id!}")
      }`)
        })
        .then(() => {
          client.resetStore();
          this.back();
        });
    }
  }

  back() {
    navigate(this.props.routes.entity.list.createUrl(this.props.schema));
  }
}

export interface EntityFormProps {
  newEntity?: boolean;
  alias: string;
  saveEntity: (item: any) => Promise<void>;
  id?: string;
}

function mapStateToProps(state: AppState, ownProps: EntityFormProps) {
  return {
    routes: state.router.routes!,
    schema: state.config.schema.find(s => s.options.alias === ownProps.alias)!
  };
}

export default combineContainers(withApollo, connect(mapStateToProps), withStyles(styles))(
  EntityForm
) as React.ComponentType<EntityFormProps>;

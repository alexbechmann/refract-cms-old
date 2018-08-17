import * as React from 'react';
import { EntitySchema } from './entity-schema';
import RenderEditor from '../property-editors/RenderEditor';
import {
  Button,
  CircularProgress,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  WithStyles,
  withStyles
} from '@material-ui/core';
import { RouteComponentProps, withRouter } from 'react-router';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { combineContainers } from 'combine-containers';
import { AppState } from '../state/app.state';
import { Routes } from '../router/routes';
import entityService from './entity.service';

interface EntityFormProps {
  entity: EntitySchema;
  routes: Routes;
}

interface State {
  updateValues: any;
  loading: boolean;
}

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit
  },
  propertyEditor: {
    marginBottom: '50px'
  }
});

interface Props extends EntityFormProps, WithStyles<typeof styles>, RouteComponentProps<{ id?: string }> {}

class EntityForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const updateValues: any = {};
    if (!props.match.params.id) {
      Object.keys(props.entity.properties).forEach(propertyKey => {
        const propertyOptions = props.entity.properties[propertyKey];
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
      entityService
        .getById({
          alias: this.props.entity.options.alias,
          id: this.props.match.params.id
        })
        .then(entity => {
          this.setState({
            loading: false,
            updateValues: entity
          });
        });
    }

    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.back = this.back.bind(this);
  }

  render() {
    const { entity, classes } = this.props;
    return this.state.loading ? (
      <CircularProgress />
    ) : (
      <Grid justify="center" container>
        <Grid item xs={12} sm={12} md={7} lg={5} xl={4}>
          <Card className={classes.card}>
            <CardHeader title={entity.options.displayName || entity.options.alias} />
            <CardContent>
              {Object.keys(entity.properties).map((propertyKey: string, index: number) => {
                const propertyOptions = entity.properties[propertyKey];
                return (
                  <div key={index} className={classes.propertyEditor}>
                    <Typography variant="subheading" gutterBottom>
                      {propertyOptions.displayName || propertyKey}
                    </Typography>
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
                  </div>
                );
              })}
            </CardContent>
            <CardActions>
              <Button onClick={this.back}>Back</Button>
              <Button onClick={this.delete}>Delete</Button>
              <Button color="primary" onClick={this.save}>
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    );
  }

  save() {
    if (!this.props.match.params.id) {
      this.setState({
        loading: true
      });
      this.insert();
    } else {
      this.setState({
        loading: true
      });
      this.update();
    }
  }

  delete() {
    entityService
      .delete({
        id: this.props.match.params.id,
        alias: this.props.entity.options.alias
      })
      .then(() => {
        this.back();
      });
  }

  update() {
    entityService
      .update({
        id: this.props.match.params.id,
        entity: this.state.updateValues,
        alias: this.props.entity.options.alias
      })
      .then(() => this.back());
  }

  insert() {
    entityService
      .insert({
        entity: this.state.updateValues,
        alias: this.props.entity.options.alias
      })
      .then(() => {
        this.back();
        this.setState({
          loading: false
        });
      });
  }

  back() {
    this.props.history.push(this.props.routes.entityRoot.url(this.props.entity.options.alias));
  }
}

export interface EntityFormPropsExtended {
  entity: EntitySchema;
}

function mapStateToProps(state: AppState, ownProps: EntityFormPropsExtended): EntityFormProps {
  return {
    routes: state.router.routes,
    entity: ownProps.entity
  };
}

export default combineContainers(connect(mapStateToProps), withStyles(styles), withRouter)(
  EntityForm
) as React.ComponentType<EntityFormPropsExtended>;

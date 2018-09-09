import * as React from 'react';
import { EntitySchema } from './entity-schema';
import RenderEditor from '../property-editors/RenderEditor';
import {
  Button,
  LinearProgress,
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
import { EntityService } from './entity.service';

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
    margin: theme.spacing.unit
  },
  propertyEditor: {
    marginBottom: theme.spacing.unit * 4
  }
});

interface Props extends EntityFormProps, WithStyles<typeof styles>, RouteComponentProps<{ id?: string }> {}

class EntityForm extends React.Component<Props, State> {
  entityService = new EntityService({
    alias: this.props.entity.options.alias
  });

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
      this.entityService.getById(this.props.match.params.id).then(entity => {
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
      <LinearProgress />
    ) : (
      <Grid justify="center" container>
        <Grid item xs={12} sm={12} md={10} lg={8} xl={7}>
          <Card className={classes.card}>
            <CardHeader title={entity.options.displayName || entity.options.alias} />
            <CardContent>
              {Object.keys(entity.properties).map((propertyKey: string, index: number) => {
                const propertyOptions = entity.properties[propertyKey];
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
            </CardContent>
            <CardActions>
              <Button variant="raised" onClick={this.back}>
                Back
              </Button>
              <Button variant="raised" onClick={this.delete}>
                Delete
              </Button>
              <Button variant="raised" color="primary" onClick={this.save}>
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
    this.entityService.delete(this.props.match.params.id).then(() => {
      this.back();
    });
  }

  update() {
    this.entityService.update(this.props.match.params.id, this.state.updateValues).then(() => this.back());
  }

  insert() {
    this.entityService.insert(this.state.updateValues).then(() => {
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

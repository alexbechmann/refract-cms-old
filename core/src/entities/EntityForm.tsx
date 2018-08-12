import * as React from 'react';
import { EntitySchema } from '../entities/entity-schema';
import RenderEditor from '../property-editors/RenderEditor';
import { Button, CircularProgress, Typography, Table, TableBody, TableRow, TableCell, Grid } from '@material-ui/core';
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

interface Props extends EntityFormProps, RouteComponentProps<{ id?: string }> {}

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
      firebase
        .firestore()
        .collection(this.props.entity.options.alias)
        .doc(this.props.match.params.id)
        .get()
        .then(doc => {
          this.setState({
            updateValues: doc.data(),
            loading: false
          });
        });
    }

    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.back = this.back.bind(this);
  }

  render() {
    const { entity } = this.props;
    return this.state.loading ? (
      <CircularProgress />
    ) : (
      <Grid justify="center" container>
        <Grid xs={12} sm={12} md={10} lg={8} xl={6}>
          <br />
          <Button onClick={this.back}>Back</Button>
          <br />
          <br />
          <Typography variant="title" gutterBottom>
            {entity.options.displayName || entity.options.alias}
          </Typography>
          <Table>
            <TableBody>
              {Object.keys(entity.properties).map((propertyKey: string, index: number) => {
                const propertyOptions = entity.properties[propertyKey];
                return (
                  <TableRow key={index}>
                    <TableCell numeric>{propertyOptions.displayName || propertyKey}</TableCell>
                    <TableCell>
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
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Button color="primary" onClick={this.save}>
            Save
          </Button>
          <Button onClick={this.delete}>Delete</Button>
        </Grid>
      </Grid>
    );
  }

  save() {
    if (!this.props.match.params.id) {
      this.setState(
        {
          loading: true
        },
        () => {
          this.insert();
        }
      );
    } else {
      this.setState(
        {
          loading: true
        },
        () => {
          this.update();
        }
      );
    }
  }

  delete() {
    // this.setState({
    //   loading: true
    // });
    // firebase
    //   .firestore()
    //   .collection(this.props.entity.options.alias)
    //   .doc(this.props.match.params.id)
    //   .delete()
    //   .then(() => {
    //     this.back();
    //   });
  }

  update() {
    // firebase
    //   .firestore()
    //   .collection(this.props.entity.options.alias)
    //   .doc(this.props.match.params.id)
    //   .set(this.state.updateValues, { merge: true })
    //   .then(() => this.back())
    //   .catch(console.log);
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
    // firebase
    //   .firestore()
    //   .collection(this.props.entity.options.alias)
    //   .doc()
    //   .set(this.state.updateValues)
    //   .then(() => {
    //     this.back();
    //     this.setState({
    //       loading: false
    //     });
    //   })
    //   .catch(console.log);
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

export default combineContainers(connect(mapStateToProps), withRouter)(EntityForm) as React.ComponentType<
  EntityFormPropsExtended
>;

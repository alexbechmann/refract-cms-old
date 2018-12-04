import React from 'react';
import { RouteComponentProps } from '@reach/router';
import gql from 'graphql-tag';
import { Mutation, WithApolloClient, withApollo } from 'react-apollo';
import EntityForm from './EntityForm';
import { graphqlQueryHelper } from '@refract-cms/core';
import { combineContainers } from 'combine-containers';
import { connect } from 'react-redux';
import { AppState } from '../state/app.state';

export interface EditEntityProps extends RouteComponentProps<{ alias: string; id: string | 'new' }> {}

export interface Props extends EditEntityProps, WithApolloClient<any>, ReturnType<typeof mapStateToProps> {}

const EditEntity = ({ alias, id, client, schema }: Props) => {
  const createMutation = gql(
    `
  mutation save($item: Input${graphqlQueryHelper.schemaName(alias!)}){
    ${alias}Create(item: $item) {
      _id
    }
  }
  `
  );
  const updateMutation = gql(
    `
  mutation save($id: String!, $item: Input${graphqlQueryHelper.schemaName(alias!)}){
    ${alias}Update(id: $id, item: $item) {
      _id
    }
  }
  `
  );
  const newEntity = !id || id === 'new';
  const mutation = newEntity ? createMutation : updateMutation;
  return (
    <Mutation mutation={mutation}>
      {(save, mutationResult) => {
        return (
          <EntityForm
            alias={alias!}
            newEntity={newEntity}
            id={id}
            saveEntity={updateValues => {
              return new Promise((resolve, reject) => {
                const item = Object.keys(schema.properties).reduce((value, propertyKey) => {
                  value[propertyKey] = updateValues[propertyKey];
                  return value;
                }, {});
                save({
                  variables: newEntity
                    ? {
                        item
                      }
                    : {
                        id,
                        item
                      },
                  update: (proxy, updateResult) => {
                    client.resetStore();
                    resolve();
                  }
                });
              });
            }}
          />
        );
      }}
    </Mutation>
  );
};

function mapStateToProps(state: AppState, ownProps: EditEntityProps) {
  return {
    routes: state.router.routes!,
    schema: state.config.schema.find(s => s.options.alias === ownProps.alias)!
  };
}

export default combineContainers(connect(mapStateToProps), withApollo)(EditEntity) as React.ComponentType<
  EditEntityProps
>;

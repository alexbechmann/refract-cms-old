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
  mutation save($record: CreateOne${schema.options.alias}Input!){
    ${alias}CreateOne(record: $record) {
      recordId
    }
  }
  `
  );
  const updateMutation = gql(
    `
  mutation save($record: UpdateById${schema.options.alias}Input!){
    ${alias}UpdateById(record: $record) {
      recordId
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
                save({
                  variables: {
                    record: updateValues
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

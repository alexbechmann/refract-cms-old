import * as React from 'react';
import { EntityMetadata } from '../entities/entity-metadata';
import RenderEditor from '../properties/property-editors/RenderEditor';
import { Button } from '@material-ui/core';

export interface EntityFormProps {
  entity: EntityMetadata;
}

interface State {
  values: any;
}

class EntityForm extends React.Component<EntityFormProps, State> {
  constructor(props: EntityFormProps) {
    super(props);
    const values: any = {};
    Object.keys(props.entity.properties).forEach(propertyKey => {
      values[propertyKey] = undefined;
    });
    this.state = {
      values
    };
  }

  render() {
    const { entity } = this.props;
    return (
      <div>
        <div> {entity.options.displayName || entity.options.alias}</div>
        <table>
          <tbody>
            {Object.keys(entity.properties).map((propertyKey: string, index: number) => {
              const propertyOptions = entity.properties[propertyKey];
              return (
                <tr key={index}>
                  <td>{propertyOptions.displayName || propertyKey}</td>
                  <td>
                    <RenderEditor
                      setValue={value => {
                        this.setState({
                          values: {
                            ...this.state.values,
                            [propertyKey]: value
                          }
                        });
                      }}
                      value={this.state.values[propertyKey] || propertyOptions.defaultValue}
                      propertyKey={propertyKey}
                      propertyOptions={propertyOptions}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Button onClick={() => console.log(this.state.values)}>Save</Button>
      </div>
    );
  }
}

export default EntityForm as React.ComponentType<EntityFormProps>;

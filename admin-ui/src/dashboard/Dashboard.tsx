import * as React from 'react';
import { getSchemaMetadata } from '../schema/get-schema-metadata';
import { PropertyOptions } from '../schema/property-options';

class Dashboard extends React.Component<any> {
  render() {
    return (
      <div>
        {getSchemaMetadata(this.props.schemas).map(entity => (
          <div key={entity.options.alias}>
            <div> {entity.options.displayName || entity.options.alias}</div>
            <span>allowMultiple: {JSON.stringify(entity.options.allowMultiple)}</span>
            <table>
              <tbody>
                {Object.keys(entity.properties).map((key: string, index: number) => {
                  const propertyOptions = entity.properties[key];
                  return (
                    <tr key={index}>
                      <td>{propertyOptions.displayName || key}</td>
                      <td>{this.renderEditor(key, propertyOptions)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
  }

  renderEditor(propertyKey: string, propertyOptions: PropertyOptions<any>) {
    if (propertyOptions.editorComponent) {
      return <propertyOptions.editorComponent propertyKey={propertyKey} value={''} setValue={console.log} />;
    } else {
      return <React.Fragment />;
    }
  }
}

export default Dashboard;

import * as React from 'react';
import { getSchemaMetadata } from './schema/get-schema-metadata';

export interface AdminProps {
  serverUrl: string;
  schemas: any[];
}

class Admin extends React.Component<AdminProps> {
  render() {
    return (
      <div>
        <h1>Admin</h1>
        {getSchemaMetadata(this.props.schemas).map(item => (
          <div key={item.alias}>
            <div> {item.alias}</div>
            <table>
              <tbody>
                {Object.keys(item.properties).map((key: string, index: number) => {
                  const prop = item.properties[key];
                  return (
                    <tr key={index}>
                      <td>{prop.displayName || key}</td>
                      <td>{this.renderEditor(prop)}</td>
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

  renderEditor(prop: any) {
    if (prop.editorComponent) {
      return <prop.editorComponent setValue={console.log} />;
    } else {
      return <React.Fragment />;
    }
  }
}

export default Admin;

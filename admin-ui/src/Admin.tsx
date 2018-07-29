import * as React from 'react';
import { getAllEntities } from './schema/register';

export interface AdminProps {
  serverUrl: string;
}

class Admin extends React.Component<AdminProps> {
  render() {
    return (
      <div>
        <h1>Admin</h1>
        {getAllEntities().map(item => (
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
    switch (prop.editorAlias) {
      case 'text': {
        return <input />;
      }
      case 'custom': {
        return <prop.editorComponent />;
      }
      default: {
        return <React.Fragment />;
      }
    }
  }
}

export default Admin;

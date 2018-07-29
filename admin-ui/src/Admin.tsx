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
            <div>
              {Object.keys(item.properties)
                .map(key => item.properties[key])
                .map((prop: any, index: number) => {
                  return <div key={index}>{this.renderEditor(prop)}</div>;
                })}
            </div>
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
      default: {
        return <React.Fragment />;
      }
    }
  }
}

export default Admin;

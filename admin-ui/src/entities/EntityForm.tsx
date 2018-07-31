import * as React from 'react';
import { EntityMetadata } from '../entities/entity-metadata';
import RenderEditor from '../properties/property-editors/RenderEditor';

export interface EntityFormProps {
  entity: EntityMetadata;
}

export default (props: EntityFormProps) => {
  const { entity } = props;
  return (
    <div>
      <div> {entity.options.displayName || entity.options.alias}</div>
      <span>allowMultiple: {JSON.stringify(entity.options.allowMultiple)}</span>
      <table>
        <tbody>
          {Object.keys(entity.properties).map((key: string, index: number) => {
            const propertyOptions = entity.properties[key];
            return (
              <tr key={index}>
                <td>{propertyOptions.displayName || key}</td>
                <td>
                  <RenderEditor propertyKey={key} propertyOptions={propertyOptions} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

import * as React from 'react';
import { PropertyOptions } from '../schema/property-options';

export interface RenderEditorProps {
  propertyKey: string;
  propertyOptions: PropertyOptions;
}

const RenderEditor = (props: RenderEditorProps) => {
  const { propertyOptions, propertyKey } = props;
  if (propertyOptions.editorComponent) {
    return <propertyOptions.editorComponent propertyKey={propertyKey} value={''} setValue={console.log} />;
  } else {
    return <React.Fragment />;
  }
};

export default RenderEditor;

import * as React from 'react';
import { PropertyOptions, EditablePropertyOptions } from '../properties/property-options';
import { PropertyEditorProps } from '../properties/property-editor-props';

export interface RenderEditorProps extends PropertyEditorProps<any> {
  propertyOptions: EditablePropertyOptions<any, any>;
}

interface Props extends RenderEditorProps {}

class RenderEditor extends React.Component<Props> {
  render() {
    const { propertyOptions, propertyKey, serverUrl } = this.props;
    if (propertyOptions.editorComponent) {
      return (
        <propertyOptions.editorComponent
          serverUrl={serverUrl}
          propertyOptions={propertyOptions}
          propertyKey={propertyKey}
          value={this.props.value}
          setValue={this.props.setValue}
        />
      );
    } else {
      return <React.Fragment />;
    }
  }
}

export default RenderEditor as React.ComponentType<RenderEditorProps>;

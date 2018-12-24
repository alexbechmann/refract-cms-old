// import React from 'react';
// import { PropertyOptions, PropertyEditorProps, CoreContext } from '@refract-cms/core';

// export interface RenderEditorProps extends PropertyEditorProps<any> {
//   propertyOptions: PropertyOptions;
// }

// interface Props extends RenderEditorProps {}

// class RenderEditor extends React.Component<Props> {
//   render() {
//     const { propertyOptions, propertyKey } = this.props;
//     if (propertyOptions.editorComponent) {
//       return (
//         <CoreContext.Consumer>
//           {({ serverUrl }) => (
//             <propertyOptions.editorComponent
//               propertyOptions={propertyOptions}
//               propertyKey={propertyKey}
//               value={this.props.value}
//               setValue={this.props.setValue}
//               serverUrl={serverUrl}
//             />
//           )}
//         </CoreContext.Consumer>
//       );
//     } else {
//       return <React.Fragment />;
//     }
//   }
// }

// export default RenderEditor as React.ComponentType<RenderEditorProps>;

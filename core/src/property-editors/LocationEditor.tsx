import * as React from 'react';
import * as firebase from 'firebase';
import { PropertyEditorProps } from '../properties/property-editor-props';

export default (props: PropertyEditorProps<firebase.firestore.GeoPoint>) => {
  const { value } = props;
  return (
    <div>
      <input
        value={value ? value.longitude : ''}
        onChange={e =>
          props.setValue(new firebase.firestore.GeoPoint(value ? value.latitude : 0, parseInt(e.target.value, 10) || 0))
        }
      />
      <input
        value={value ? value.latitude : ''}
        onChange={e =>
          props.setValue(new firebase.firestore.GeoPoint(parseInt(e.target.value, 10) || 0, value ? value.latitude : 0))
        }
      />
    </div>
  );
};

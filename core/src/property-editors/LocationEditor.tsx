import * as React from 'react';
import * as firebase from 'firebase';
import { PropertyEditorProps } from '../properties/property-editor-props';
import { Location } from '../location/location.model';

export default (props: PropertyEditorProps<Location>) => {
  const value: Location = props.value || {
    latitude: 0,
    longitude: 0
  };
  const { latitude, longitude } = value;
  return (
    <div>
      <input
        value={value.longitude}
        onChange={e =>
          props.setValue({
            latitude,
            longitude: parseInt(e.target.value, 10) || 0
          })
        }
      />
      <input
        value={value.latitude}
        onChange={e =>
          props.setValue({
            longitude,
            latitude: parseInt(e.target.value, 10) || 0
          })
        }
      />
    </div>
  );
};

import * as React from 'react';
import { PropertyEditorProps } from '@firestore-cms/core';
import { Location } from '../shared/models/location.model';

export default (props: PropertyEditorProps<Location>) => {
  const { value } = props;
  return (
    <div>
      <input value={value ? value.lng : ''} onChange={(e) => props.setValue({
        lat: value ? value.lat : 0,
        lng: parseInt(e.target.value, 10)
      })} />
      <input value={value ? value.lat : ''} onChange={(e) => props.setValue({
        lat: parseInt(e.target.value, 10),
        lng: value ? value.lng : 0
      })} />
    </div>
    
  )
}
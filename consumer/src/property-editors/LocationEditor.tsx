import * as React from 'react';
import { PropertyEditorProps } from '@firestore-cms/core';
import { Location } from '../shared/models/location.model';

export default (props: PropertyEditorProps<Location>) => {
  const { value } = props;
  return (
    <div>{JSON.stringify(props.value)}
      <input value={value ? value.lng : ''} onChange={(e) => props.setValue({
        ...props.value,
        lng: parseInt(e.target.value, 10)
      })} />
      <input value={value ? value.lng : ''} onChange={(e) => props.setValue({
        ...props.value,
        lat: parseInt(e.target.value, 10)
      })} />
    </div>
    
  )
}
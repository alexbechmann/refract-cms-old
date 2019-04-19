import React from 'react';
import { PropertyEditorProps } from '@refract-cms/core';

export default (props: PropertyEditorProps<number>) => {
  return (
    <select value={props.value} onChange={e => props.setValue(parseInt(e.target.value, 10))}>
      <option>1</option>
      <option>2</option>
      <option>3</option>
    </select>
  );
};

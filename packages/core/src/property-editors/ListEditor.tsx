import * as React from 'react';
import { PropertyEditorProps } from '../properties/property-editor-props';
import { IconButton } from '@material-ui/core';
import * as Icons from '@material-ui/icons';

export interface ListEditorOptions<T> {
  ItemComponent: React.ComponentType<PropertyEditorProps<T>>;
  max: number;
}

interface Props<T> extends ListEditorOptions<T>, PropertyEditorProps<T[]> {}

class ListEditor<T> extends React.Component<Props<T>> {
  render() {
    const { setValue, ItemComponent, propertyOptions, propertyKey } = this.props;
    const value = this.props.value || [];
    return (
      <div>
        {value.map((v, index) => (
          <div>
            <ItemComponent
              propertyOptions={propertyOptions}
              propertyKey={propertyKey}
              value={v}
              setValue={newValue => {
                const newValues = [...value];
                newValues[index] = newValue;
                setValue(newValues);
              }}
            />
            <IconButton onClick={() => setValue(value.filter((_, i) => index !== i))}>
              <Icons.Remove />
            </IconButton>
          </div>
        ))}
        <IconButton onClick={() => setValue([...value, propertyOptions.defaultValue])}>
          <Icons.Add />
        </IconButton>
      </div>
    );
  }
}

export default function<T>(options: ListEditorOptions<T>) {
  return (props: Props<T>) => <ListEditor {...props} {...options} />;
}

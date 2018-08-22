import * as React from 'react';
import { PropertyEditorProps } from '../properties/property-editor-props';
import { IconButton, Typography, Button, Divider } from '@material-ui/core';

export interface ListEditorOptions<T> {
  ItemComponent: React.ComponentType<PropertyEditorProps<T>>;
  max: number;
}

interface Props<T> extends ListEditorOptions<T>, PropertyEditorProps<T[]> {}

interface State<T> {
  stagedValue: T | undefined;
}

class ListEditor<T> extends React.Component<Props<T>, State<T>> {
  state: State<T> = {
    stagedValue: undefined
  };

  render() {
    const { setValue, ItemComponent, propertyOptions, propertyKey } = this.props;
    const value = this.props.value || [];
    return (
      <div>
        <Typography>Current values:</Typography>
        {value.map((v, index) => (
          <div key={index}>
            <ItemComponent
              propertyOptions={propertyOptions}
              propertyKey={propertyKey}
              value={v}
              setValue={newValue => {
                if (newValue) {
                  const newValues = [...value];
                  newValues[index] = newValue;
                  setValue(newValues);
                } else {
                  setValue(value.filter((_, i) => index !== i));
                }
              }}
            />
            <Button onClick={() => setValue(value.filter((_, i) => index !== i))}>Remove</Button>
          </div>
        ))}
        <Divider />
        <Typography>Add new value</Typography>
        <ItemComponent
          propertyOptions={propertyOptions}
          propertyKey={propertyKey}
          value={this.state.stagedValue}
          setValue={newValue => {
            this.setState({
              stagedValue: newValue
            });
          }}
        />
        {this.state.stagedValue && (
          <Button
            onClick={() => {
              const { stagedValue } = this.state;
              const newValues = [...value, stagedValue];
              setValue(newValues);
              this.setState({
                stagedValue: undefined
              });
            }}
          >
            Add item
          </Button>
        )}
      </div>
    );
  }
}

export default function<T>(options: ListEditorOptions<T>) {
  return (props: Props<T>) => <ListEditor {...props} {...options} />;
}

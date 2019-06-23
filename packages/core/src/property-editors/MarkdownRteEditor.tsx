import React, { useState } from 'react';
import { PropertyEditorProps } from '@refract-cms/core';
import { Typography, Theme, NoSsr } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const RichTextEditor = process.env.BUILD_TARGET !== 'server' ? require('react-rte').default : undefined;

console.log(RichTextEditor);

export interface MarkdownRteEditorOptions {}

const useStyles = makeStyles((theme: Theme) => ({
  '@global .DraftEditor-root': {
    // color: theme.palette.getContrastText(theme.palette.background.default)
    color: '#333'
  }
}));

export default (options: MarkdownRteEditorOptions = {}) => ({ value, setValue }: PropertyEditorProps<string>) => {
  const rteValue = value ? RichTextEditor.createValueFromString(value, 'markdown') : RichTextEditor.createEmptyValue();
  const classes = useStyles({});
  const [rteState, setRteState] = useState(rteValue);

  return RichTextEditor ? (
    <RichTextEditor
      value={rteState}
      // blockStyleFn={contentBlock => {
      //   var type = contentBlock.getType();
      //   console.log(type);
      //   return classes.test;
      // }}
      onChange={newValue => {
        setRteState(newValue);
        setValue(newValue.toString('markdown'));
      }}
    />
  ) : (
    <span />
  );
};

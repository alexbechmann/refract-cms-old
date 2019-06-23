import React, { useState } from 'react';
import { PropertyEditorProps } from '@refract-cms/core';
import { Typography, Theme, NoSsr } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Editor, EditorState } from 'draft-js';
import { stateFromMarkdown } from 'draft-js-import-markdown';
import { stateToMarkdown } from 'draft-js-export-markdown';
// import 'draft-js/dist/Draft.css'
import draftStyles from './draft-styles';

// const RichTextEditor = process.env.BUILD_TARGET !== 'server' ? require('react-rte').default : undefined;

export interface MarkdownRteEditorOptions {}

const useStyles = makeStyles((theme: Theme) => ({
  // ...draftStyles,
  // '@global .DraftEditor-root': {
  //   // color: theme.palette.getContrastText(theme.palette.background.default)
  //   color: '#333'
  // }
  '@global': {
    '.DraftEditor-editorContainer, .DraftEditor-root, .public-DraftEditor-content': {
      height: 'inherit',
      textAlign: 'initial'
    },
    ".public-DraftEditor-content[contenteditable='true']": {
      W: 'read-write-plaintext-only'
    },
    '.DraftEditor-root': {
      position: 'relative'
    },
    '.DraftEditor-editorContainer': {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      borderLeft: '0.1px solid transparent',
      position: 'relative',
      zIndex: 1
    },
    '.public-DraftEditor-block': {
      position: 'relative'
    },
    '.DraftEditor-alignLeft .public-DraftStyleDefault-block': {
      textAlign: 'left'
    },
    '.DraftEditor-alignLeft .public-DraftEditorPlaceholder-root': {
      left: '0',
      textAlign: 'left'
    },
    '.DraftEditor-alignCenter .public-DraftStyleDefault-block': {
      textAlign: 'center'
    },
    '.DraftEditor-alignCenter .public-DraftEditorPlaceholder-root': {
      margin: '0 auto',
      textAlign: 'center',
      width: '100%'
    },
    '.DraftEditor-alignRight .public-DraftStyleDefault-block': {
      textAlign: 'right'
    },
    '.DraftEditor-alignRight .public-DraftEditorPlaceholder-root': {
      right: '0',
      textAlign: 'right'
    },
    '.public-DraftEditorPlaceholder-root': {
      color: '#9197a3',
      position: 'absolute',
      zIndex: 1
    },
    '.public-DraftEditorPlaceholder-hasFocus': {
      color: '#bdc1c9'
    },
    '.DraftEditorPlaceholder-hidden': {
      display: 'none'
    },
    '.public-DraftStyleDefault-block': {
      position: 'relative',
      whiteSpace: 'pre-wrap'
    },
    '.public-DraftStyleDefault-ltr': {
      direction: 'ltr',
      textAlign: 'left'
    },
    '.public-DraftStyleDefault-rtl': {
      direction: 'rtl',
      textAlign: 'right'
    },
    '.public-DraftStyleDefault-listLTR': {
      direction: 'ltr'
    },
    '.public-DraftStyleDefault-listRTL': {
      direction: 'rtl'
    },
    '.public-DraftStyleDefault-ol, .public-DraftStyleDefault-ul': {
      margin: '16px 0',
      padding: '0'
    },
    '.public-DraftStyleDefault-depth0.public-DraftStyleDefault-listLTR': {
      marginLeft: '1.5em'
    },
    '.public-DraftStyleDefault-depth0.public-DraftStyleDefault-listRTL': {
      marginRight: '1.5em'
    },
    '.public-DraftStyleDefault-depth1.public-DraftStyleDefault-listLTR': {
      marginLeft: '3em'
    },
    '.public-DraftStyleDefault-depth1.public-DraftStyleDefault-listRTL': {
      marginRight: '3em'
    },
    '.public-DraftStyleDefault-depth2.public-DraftStyleDefault-listLTR': {
      marginLeft: '4.5em'
    },
    '.public-DraftStyleDefault-depth2.public-DraftStyleDefault-listRTL': {
      marginRight: '4.5em'
    },
    '.public-DraftStyleDefault-depth3.public-DraftStyleDefault-listLTR': {
      marginLeft: '6em'
    },
    '.public-DraftStyleDefault-depth3.public-DraftStyleDefault-listRTL': {
      marginRight: '6em'
    },
    '.public-DraftStyleDefault-depth4.public-DraftStyleDefault-listLTR': {
      marginLeft: '7.5em'
    },
    '.public-DraftStyleDefault-depth4.public-DraftStyleDefault-listRTL': {
      marginRight: '7.5em'
    },
    '.public-DraftStyleDefault-unorderedListItem': {
      listStyleType: 'square',
      position: 'relative'
    },
    '.public-DraftStyleDefault-unorderedListItem.public-DraftStyleDefault-depth0': {
      listStyleType: 'disc'
    },
    '.public-DraftStyleDefault-unorderedListItem.public-DraftStyleDefault-depth1': {
      listStyleType: 'circle'
    },
    '.public-DraftStyleDefault-orderedListItem': {
      listStyleType: 'none',
      position: 'relative'
    },
    '.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-listLTR:before': {
      left: -36,
      position: 'absolute',
      textAlign: 'right',
      width: 30
    },
    '.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-listRTL:before': {
      position: 'absolute',
      right: -36,
      textAlign: 'left',
      width: 30
    },
    '.public-DraftStyleDefault-orderedListItem:before': {
      content: "counter(ol0) '. '",
      counterIncrement: 'ol0'
    },
    '.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth1:before': {
      content: "counter(ol1) '. '",
      counterIncrement: 'ol1'
    },
    '.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth2:before': {
      content: "counter(ol2) '. '",
      counterIncrement: 'ol2'
    },
    '.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth3:before': {
      content: "counter(ol3) '. '",
      counterIncrement: 'ol3'
    },
    '.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth4:before': {
      content: "counter(ol4) '. '",
      counterIncrement: 'ol4'
    },
    '.public-DraftStyleDefault-depth0.public-DraftStyleDefault-reset': {
      counterReset: 'ol0'
    },
    '.public-DraftStyleDefault-depth1.public-DraftStyleDefault-reset': {
      counterReset: 'ol1'
    },
    '.public-DraftStyleDefault-depth2.public-DraftStyleDefault-reset': {
      counterReset: 'ol2'
    },
    '.public-DraftStyleDefault-depth3.public-DraftStyleDefault-reset': {
      counterReset: 'ol3'
    },
    '.public-DraftStyleDefault-depth4.public-DraftStyleDefault-reset': {
      counterReset: 'ol4'
    }
  }
}));

export default (options: MarkdownRteEditorOptions = {}) => ({ value, setValue }: PropertyEditorProps<string>) => {
  const rteValue = value ? EditorState.createWithContent(stateFromMarkdown(value)) : EditorState.createEmpty();
  console.log(rteValue);
  const classes = useStyles({});
  // const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
  const [editorState, setEditorState] = React.useState<EditorState>(rteValue);

  return (
    <Editor
      editorState={editorState}
      onChange={editorState => {
        setEditorState(editorState);
        console.log(editorState);
        const newValue = stateToMarkdown(editorState.getCurrentContent());
        setValue(newValue);
      }}
      // blockStyleFn={contentBlock => {
      //   var type = contentBlock.getType();
      //   console.log(type);
      //   return classes.test;
      // }}
      // onChange={newState => {
      //   setEditorState(newState);
      //   var newValue = stateToMarkdown(newState);
      //   // setValue(newValue);
      // }}
    />
  );
};

import React, { ComponentType } from 'react';
import { Theme, createStyles, WithStyles, withStyles, ButtonGroup, Button } from '@material-ui/core';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { EditorState, RichUtils } from 'draft-js';
import classNames from 'classnames';

export interface RteToolbarProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing()
    },
    active: {
      backgroundColor: theme.palette.secondary.main
    },
    buttonGroup: {
      marginRight: theme.spacing()
    }
  });

interface Props extends RteToolbarProps, WithStyles<typeof styles> {}

const RteToolbar: ComponentType<Props> = props => {
  const { classes, setEditorState, editorState } = props;
  function createBlockButtonProps({ blockType }: { blockType: string }) {
    return {
      className: classNames({
        [classes.active]: RichUtils.getCurrentBlockType(editorState) === blockType
      }),
      onClick: () => setEditorState(RichUtils.toggleBlockType(editorState, blockType))
    };
  }
  function createStyleButtonProps({ inlineStyle }: { inlineStyle: string }) {
    // console.log(RichUtils.)
    const currentStyle = props.editorState.getCurrentInlineStyle();
    return {
      className: classNames({
        [classes.active]: currentStyle.has(inlineStyle)
      }),
      onClick: () => setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle))
    };
  }
  return (
    <div className={classes.root}>
      <ButtonGroup className={classes.buttonGroup} size="small" aria-label="Small outlined button group">
        <Button {...createBlockButtonProps({ blockType: 'header-one' })}>H1</Button>
        <Button {...createBlockButtonProps({ blockType: 'header-two' })}>H2</Button>
        <Button {...createBlockButtonProps({ blockType: 'header-three' })}>H3</Button>
        <Button {...createBlockButtonProps({ blockType: 'header-four' })}>H4</Button>
      </ButtonGroup>
      <ButtonGroup size="small" aria-label="Small outlined button group">
        <Button {...createStyleButtonProps({ inlineStyle: 'BOLD' })}>Bold</Button>
      </ButtonGroup>
    </div>
  );
};

export default compose(withStyles(styles))(RteToolbar) as ComponentType<RteToolbarProps>;

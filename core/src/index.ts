export { configureFirestoreCms } from './config/configure-firestore-cms';
export { default as Admin } from './Admin';
export { default as defineEntity } from './entities/define-entity';
export { PropertyEditorProps } from './properties/property-editor-props';
export { default as TextEditor } from './property-editors/TextEditor';
export { default as EntityPickerEditor } from './property-editors/EntityPickerEditor';
export { default as MediaPickerEditor } from './property-editors/MediaPickerEditor';
export { default as LocationEditor } from './property-editors/LocationEditor';
export { default as SingleDropdownEditor } from './property-editors/SingleDropdownEditor';
export { default as MultipleDropdownEditor } from './property-editors/MultipleDropdownEditor';
export { MediaItem } from './media/media-item.model';
export { Location } from './location/location.model';

// for local dev
import * as firebase from 'firebase';
export { firebase };

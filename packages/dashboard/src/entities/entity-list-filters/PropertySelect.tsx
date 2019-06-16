// import React, { ComponentType } from 'react';
// import {
//   Theme,
//   createStyles,
//   WithStyles,
//   withStyles,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem
// } from '@material-ui/core';
// import { compose } from 'recompose';
// import { AppState } from '../../state/app.state';
// import { connect } from 'react-redux';
// import { EntitySchema } from '@refract-cms/core';

// export interface PropertySelectProps {
//   schema: EntitySchema<any>;
// }

// const styles = (theme: Theme) =>
//   createStyles({
//     formControl: {
//       marginBottom: theme.spacing()
//     }
//   });

// interface Props
//   extends PropertySelectProps,
//     WithStyles<typeof styles>,
//     ReturnType<typeof mapStateToProps>,
//     Readonly<typeof mapDispatchToProps> {}

// const PropertySelect: ComponentType<Props> = ({ classes, schema }) => {
//   return (
//     <FormControl className={classes.formControl} fullWidth>
//       <InputLabel>Direction</InputLabel>
//       <Select
//         //value={filters.orderByDirection}
//         onChange={e => console.log(e)}
//       >
//         {Object.keys(schema.properties).map(propertyKey => (
//           <MenuItem value={propertyKey}>{schema.properties[propertyKey].displayName || propertyKey}</MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   );
// };

// function mapStateToProps(state: AppState, ownProps: PropertySelectProps) {
//   return {};
// }

// const mapDispatchToProps = {};

// export default compose(
//   withStyles(styles),
//   connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )
// )(PropertySelect) as ComponentType<PropertySelectProps>;

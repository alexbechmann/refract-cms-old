import { SvgIconProps } from "@material-ui/core/SvgIcon";

export interface EntityOptions<T = {}> { 
  alias: string;
  displayName?: string;
  maxOne?: boolean;
  instanceDisplayName?: (item: T) => string;
  icon?: React.ComponentType<SvgIconProps>;
}
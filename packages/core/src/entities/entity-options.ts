import { SvgIconProps } from "@material-ui/core/SvgIcon";

export interface EntityOptions<T = {}> { 
  alias: string;
  displayName?: string;
  maxOne?: boolean;
  instanceDisplayProps?: (item: T) => {
    primaryText: string;
    secondaryText?: string | undefined;
    imageUrl?: string | undefined
  };
  icon?: React.ComponentType<SvgIconProps>;

}
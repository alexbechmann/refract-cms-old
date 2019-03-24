import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { CoreContextModel } from '../context/core-context.model';

export interface EntityOptions<T = {}> {
  alias: string;
  displayName?: string;
  maxOne?: boolean;
  instanceDisplayProps?: ((
    item: T,
    { context }: { context: CoreContextModel }
  ) => {
    primaryText: string;
    secondaryText?: string | undefined;
    imageUrl?: string | undefined;
  });
  icon?: React.ComponentType<SvgIconProps>;
  defaultSort?: {
    orderByDirection: 'DESC' | 'ASC';
    orderByField: keyof T;
  };
}

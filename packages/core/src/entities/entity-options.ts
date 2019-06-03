import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { CoreContextModel } from '../context/core-context.model';
import { ActualType } from '../properties/property-types';

export interface EntityOptions<TEntity = any> {
  alias: string;
  displayName?: string;
  mongoCollectionName?: string;
  maxOne?: boolean;
  instanceDisplayProps?: ((
    item: ActualType<TEntity>,
    { context }: { context: CoreContextModel }
  ) => {
    primaryText: string;
    secondaryText?: string | undefined;
    imageUrl?: string | undefined;
  });
  icon?: React.ComponentType<SvgIconProps>;
  defaultSort?: {
    orderByDirection: 'DESC' | 'ASC';
    orderByField: keyof TEntity;
  };
}

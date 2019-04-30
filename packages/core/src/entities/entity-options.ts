import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { CoreContextModel } from '../context/core-context.model';

export interface EntityOptions<TEntity = {}, TModel = any> {
  alias: string;
  displayName?: string;
  mongoCollectionName?: string;
  maxOne?: boolean;
  instanceDisplayProps?: ((
    item: TEntity,
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

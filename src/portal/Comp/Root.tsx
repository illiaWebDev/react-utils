import React from 'react';
import type { State } from '../EECtx';


export type Props = {
  usePortals: () => State[ 'portals' ];
  className?: string;
};

export const cName = '__illia-web-dev_react-utils_portal_Comp_Root';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const _: React.FC< Props > = React.memo( ( { usePortals, className } ) => {
  const portals = usePortals();
  const cNameInner = React.useMemo( () => (
    [className, cName].filter( Boolean ).join( ' ' )
  ), [className] );


  return (
    <div className={ cNameInner }>
      {portals.map( ( { Comp, props }, i ) => (
        // eslint-disable-next-line react/no-array-index-key,react/jsx-props-no-spreading
        <Comp key={ i } { ...props && props[ props.length - 1 ] } />
      ) )}
    </div>
  );
} );
_.displayName = '__illia-web-dev__/react-utils/portal/Comp/Root';

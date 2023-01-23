import React from 'react';
import type { State } from '../EECtx';


export type Props = {
  useModals: () => State[ 'modals' ];
  className?: string;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const _: React.FC< Props > = React.memo( ( { useModals, className } ) => {
  const modals = useModals();
  const cName = React.useMemo( () => (
    [className, '__illia-web-dev_react-utils_modal_Comp_Root'].filter( Boolean ).join( ' ' )
  ), [className] );


  return (
    <div className={ cName }>
      {modals.map( ( { Comp, props }, i ) => (
        // eslint-disable-next-line react/no-array-index-key,react/jsx-props-no-spreading
        <Comp key={ i } { ...props && props[ props.length - 1 ] } />
      ) )}
    </div>
  );
} );
_.displayName = '__illia-web-dev__/react-utils/modal/Comp/Root';

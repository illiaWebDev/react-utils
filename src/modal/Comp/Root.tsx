import React from 'react';
import type { State } from '../EECtx';


export type Props = {
  useModals: () => State[ 'modals' ];
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const _: React.FC< Props > = React.memo( ( { useModals } ) => {
  const modals = useModals();

  return (
    <>
      {modals.map( ( { Comp, props }, i ) => (
        // eslint-disable-next-line react/no-array-index-key,react/jsx-props-no-spreading
        <Comp key={ i } { ...props && props[ props.length - 1 ] } />
      ) )}
    </>
  );
} );
_.displayName = '__illia-web-dev__/react-utils/modal/Comp/Root';

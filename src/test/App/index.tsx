/* eslint-disable import/no-extraneous-dependencies,import/no-import-module-exports */
import React from 'react';
import { WithCtx, useSelector } from './EECtxSetup';
import { CompA } from './a/Comp';
import { CompB } from './b/Comp';


const CompC = React.memo( () => {
  const s = useSelector( v => v );

  return (
    <div>
      <pre>{JSON.stringify( s, null, 2 )}</pre>
    </div>
  );
} );
CompC.displayName = 'CompC';


export function App() {
  const [hidden, setHidden] = React.useState( false );
  const toggleHide = React.useCallback( () => setHidden( s => !s ), [] );

  return (
    <WithCtx>
      <button type='button' onClick={ toggleHide }>toggle hide</button>
      <br />
      <br />
      { hidden ? null : (
        <div>
          <CompA />
          <CompB />
          <CompC />
        </div>
      )}
    </WithCtx>
  );
}

/* eslint-disable import/no-extraneous-dependencies,import/no-import-module-exports */
import React from 'react';
import { WithCtx, useSelector } from './EECtxSetup';
import { CompA } from './a/Comp';
import { CompB } from './b/Comp';
import * as ModalNS from '../../modal';
import { ShowModalBtn } from './modal';


const CompC = React.memo( () => {
  const s = useSelector( v => ( { a: v.a, b: v.b } ) );

  return (
    <div>
      <pre>{JSON.stringify( s, null, 2 )}</pre>
    </div>
  );
} );
CompC.displayName = 'CompC';


const useModals: ModalNS.CompNS.RootNS.Props[ 'useModals' ] = () => useSelector( s => s.modal.modals );

export function App() {
  const [hidden, setHidden] = React.useState( false );
  const toggleHide = React.useCallback( () => setHidden( s => !s ), [] );

  return (
    <WithCtx>
      <div style={ { height: '100%', display: 'flex', flexDirection: 'column' } }>
        <div style={ { padding: 16, backgroundColor: 'hsl(50, 100%, 50%)' } }>Heading</div>
        <div style={ { flexGrow: 1, display: 'flex', overflow: 'auto' } }>
          <div style={ {
            width: 300,
            backgroundColor: 'hsl(85, 100%, 50%)',
            overflow: 'auto',
            padding: 16,
          } }
          >
            Sidebar
            {/* eslint-disable-next-line react/no-array-index-key */}
            {Array( 100 ).fill( 0 ).map( ( _, i ) => <br key={ i } /> )}
            Sidebar end
          </div>
          <div style={ { padding: 16 } }>
            <button type='button' onClick={ toggleHide }>toggle hide</button>
            <br />
            <br />
            { hidden ? null : (
              <div>
                <CompA />
                <CompB />
                <CompC />

                <br />

                <ShowModalBtn />
              </div>
            )}
          </div>
        </div>
      </div>

      <ModalNS.CompNS.RootNS._ useModals={ useModals } />
    </WithCtx>
  );
}

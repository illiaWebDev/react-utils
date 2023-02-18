/* eslint-disable import/no-extraneous-dependencies,import/no-import-module-exports */
import React from 'react';
import { WithCtx, useSelector } from './EECtxSetup';
import { CompA } from './a/Comp';
import { CompB } from './b/Comp';
import * as PortalNS from '../../portal';
import { ShowModalBtn } from './modal';
// import * as PopperNS from '../../popper';
// import { ShowPopperBtn } from './Popper';


const CompC = React.memo( () => {
  const s = useSelector( v => ( { a: v.a, b: v.b } ) );

  return (
    <div>
      <pre>{JSON.stringify( s, null, 2 )}</pre>
    </div>
  );
} );
CompC.displayName = 'CompC';


const usePortals: PortalNS.CompNS.RootNS.Props[ 'usePortals' ] = () => useSelector( s => s.portal.portals );
// const usePopperState: PopperNS.CompNS.RootNS.Props[ 'usePopperState' ] = () => useSelector( s => s.popper );

export function App() {
  const [hidden, setHidden] = React.useState( false );
  const toggleHide = React.useCallback( () => setHidden( s => !s ), [] );
  // const dispatch = useDispatch();
  // const closePopper = React.useCallback( () => (
  //   dispatch( PopperNS.aCreators.hide() )
  // ), [dispatch] );


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

            <br />
            <br />

            {/* <ShowPopperBtn /> */}


            {/* eslint-disable-next-line react/no-array-index-key */}
            {Array( 100 ).fill( 0 ).map( ( _, i ) => <br key={ i } /> )}


            <br />
            <br />
            <br />
            <br />


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

      <PortalNS.CompNS.RootNS._ usePortals={ usePortals } />
      {/* <PopperNS.CompNS.RootNS._ usePopperState={ usePopperState } close={ closePopper } /> */}
    </WithCtx>
  );
}

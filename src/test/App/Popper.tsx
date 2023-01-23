import React from 'react';
import { useDispatch, useSelector } from './EECtxSetup';
import * as popperEECtxNS from '../../popper/EECtx';


export const ShowPopperBtn = React.memo( () => {
  const dispatch = useDispatch();
  const popperState = useSelector( s => s.popper );


  const show = React.useCallback< React.MouseEventHandler< HTMLButtonElement > >(
    e => dispatch( popperEECtxNS.aCreators.show( {
      // eslint-disable-next-line react/no-unstable-nested-components
      popperComp: () => (
        <div style={ { backgroundColor: '#fff', padding: 8 } }>
          <ul>
            <li>menu item 1</li>
            <li>menu item 2</li>
            <li>menu item 3</li>
          </ul>
        </div>
      ),
      referenceEl: e.currentTarget,
      // withOverlay: true,
      options: {
        modifiers: [],
        placement: 'bottom-start',
        strategy: 'fixed',
      },
    } ) ),
    [dispatch],
  );
  const hide = React.useCallback( () => dispatch( popperEECtxNS.aCreators.hide() ), [dispatch] );


  return (
    <button type='button' onClick={ popperState === popperEECtxNS.defaultState ? show : hide }>
      Show popper
    </button>
  );
} );
ShowPopperBtn.displayName = 'test/App/Popper/ShowPopperBtn';

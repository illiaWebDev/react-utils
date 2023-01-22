import React from 'react';
import { useSelector, useDispatch } from '../EECtxSetup';
import { aCreators } from './EECtx';


export const CompB = React.memo( () => {
  const value = useSelector( s => s.b.value );
  const dispatch = useDispatch();
  const inc = React.useCallback( () => {
    dispatch( aCreators.incrementB() );
  }, [dispatch] );

  return (
    <div>
      <span>{ value }</span>
      <br />
      <button onClick={ inc } type='button'>inc</button>
    </div>
  );
} );
CompB.displayName = 'CompB';

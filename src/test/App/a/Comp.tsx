import React from 'react';
import { useSelector, useDispatch } from '../EECtxSetup';
import { aCreators } from './EECtx';


export const CompA = React.memo( () => {
  const value = useSelector( s => s.a.value );
  const dispatch = useDispatch();
  const inc = React.useCallback( () => {
    dispatch( aCreators.incrementA() );
  }, [dispatch] );

  return (
    <div>
      <span>{ value }</span>
      <br />
      <button onClick={ inc } type='button'>inc</button>
    </div>
  );
} );
CompA.displayName = 'CompA';

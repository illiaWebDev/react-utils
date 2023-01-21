/* eslint-disable import/no-extraneous-dependencies,import/no-import-module-exports */
import React from 'react';
import { Counter } from './Counter';
import { HelloComp } from './Hello';
import {
  WithCtx, useSelector, useDispatch, aCreators,
} from './eeContext';


const CompA = React.memo( () => {
  const a = useSelector( s => s.a );
  const dispatch = useDispatch();
  const inc = React.useCallback( () => {
    dispatch( aCreators.incrementA() );
  }, [dispatch] );

  return (
    <div>
      <span>{a}</span>
      <br />
      <button onClick={inc} type='button'>inc A</button>
    </div>
  );
} );
CompA.displayName = 'CompA';


const CompB = React.memo( () => {
  const b = useSelector( s => s.b );
  const dispatch = useDispatch();
  const inc = React.useCallback( () => {
    dispatch( aCreators.incrementB() );
  }, [dispatch] );

  return (
    <div>
      <span>{b}</span>
      <br />
      <button onClick={inc} type='button'>inc B</button>
    </div>
  );
} );
CompB.displayName = 'CompB';


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
  return (
    <WithCtx>
      <div>
        <CompA />
        <CompB />
        <CompC />
      </div>
    </WithCtx>
  );
}

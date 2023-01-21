/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

export const Counter = React.memo( () => {
  const [count, setCount] = React.useState( 0 );
  const inc = React.useCallback( () => setCount( s => s + 1 ), [] );

  return (
    <div>
      <span>{count}</span>
      <br />
      <button type='button' onClick={inc}>add</button>
    </div>
  );
} );

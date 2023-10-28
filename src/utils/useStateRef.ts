import React from 'react';


export const useStateRef = < T >(
  initialValue: T,
  compare: ( a: T, b: T ) => boolean = ( a, b ) => a === b,
): [T, React.Dispatch<React.SetStateAction<T>>, React.MutableRefObject< T >] => {
  const [ value, setValue ] = React.useState( initialValue );
  const valueRef = React.useRef( value );
  if ( compare( valueRef.current, value ) === false ) valueRef.current = value;

  return React.useMemo( () => [
    value,
    setValue,
    valueRef,
  ], [ value ] );
};

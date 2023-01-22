import React from 'react';
import * as StoreNS from './store';


export type Arg< T > = {
  rootReducer: StoreNS.Reducer< T, any >;
  /**
   * will be used in display name for WithCtx component to \
   * make locationg particular context easier (as there can\
   * be several EECtx). NOTE that it will be appended\
   * with common suffix
   *
   * @example
   * 'my-project-eeCtx' => 'my-project-eeCtx/react-utils/EECtx/WithCtx'
   */
  displayNamePrefix?: string;
};


export type Compare< V > = ( a: V, b: V ) => boolean;
export const defaultCompare: Compare< unknown > = ( a, b ) => a === b;


export type Rtrn< T > = {
  ctx: React.Context< StoreNS.Store< T > >;
  WithCtx: React.ComponentType< React.PropsWithChildren< Record< string, unknown > > >;
  useCtx: () => StoreNS.Store< T >;
  useDispatch: () => StoreNS.Store< T >[ 'dispatch' ];
  useGetState: () => StoreNS.Store< T >[ 'getState' ];
  useSubscribe: () => StoreNS.Store< T >[ 'subscribe' ];
  useSelector: < V >( f: ( state: T ) => V, cmp?: Compare< V > ) => V;
};


export function init< T >( { rootReducer, displayNamePrefix = '' }: Arg< T > ): Rtrn< T > {
  const store = new StoreNS.Store( rootReducer );
  const ctx = React.createContext( store );


  // eslint-disable-next-line react/prop-types
  const WithCtx: Rtrn< T >[ 'WithCtx' ] = React.memo( ( { children } ) => (
    <ctx.Provider value={ store }>
      { children }
    </ctx.Provider>
  ) );
  WithCtx.displayName = `${displayNamePrefix}/react-utils/EECtx/WithCtx`;

  const useCtx: Rtrn< T >[ 'useCtx' ] = () => React.useContext( ctx );


  return {
    ctx,
    WithCtx,
    useCtx,
    useDispatch: () => useCtx().dispatch,
    useGetState: () => useCtx().getState,
    useSubscribe: () => useCtx().subscribe,
    useSelector: ( f, cmp = defaultCompare ) => {
      const storeInner = useCtx();
      const [value, setValue] = React.useState( f( storeInner.getState() ) );


      const fRef = React.useRef< typeof f >( f );
      if ( fRef.current !== f ) fRef.current = f;


      const cmpRef = React.useRef< typeof cmp >( cmp );
      if ( cmpRef.current !== cmp ) cmpRef.current = cmp;


      const subscriber = React.useCallback< StoreNS.Subscriber< T > >(
        state => setValue( curValue => {
          const nextV = fRef.current( state );

          return cmpRef.current( curValue, nextV )
            ? curValue
            : nextV;
        } ),
        [],
      );
      const subscriberRef = React.useRef< typeof subscriber >( subscriber );
      if ( subscriberRef.current !== subscriber ) subscriberRef.current = subscriber;


      React.useEffect( () => {
        storeInner.subscribe( subscriberRef.current );

        return () => storeInner.unsubscribe( subscriberRef.current );
      }, [storeInner] );


      return value;
    },
  };
}


export * as StoreNS from './store';

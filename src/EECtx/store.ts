// eslint-disable-next-line import/no-extraneous-dependencies
import { ObjKeys } from '@illia-web-dev/types/dist/types/ObjKeys';
import EventEmitter from 'eventemitter3';


export type Subscriber< T > = ( nextState: T ) => unknown;

export type Action< T = string > = { type: T };
export const HYDRATE_ACTION: Action = { type: '__EECtx/Store/hydrate__' };
export type Reducer< T, A extends Action = Action > = ( arg: { s?: T; action: A } ) => T;


// ===================================================================================


// eslint-disable-next-line @typescript-eslint/naming-convention
export class Store< T > {
  __state: T;

  __rootReducer: Reducer< T >;

  __emitter = new EventEmitter< { update: Subscriber< T > } >();

  /**
   * cannot use correct typing for some reason, cause when\
   * used with properly typed Reducer, that specifies all\
   * possible Actions - it errors. But here our contract is\
   * basically "any valid Action type", so this should suffice
   */
  constructor( rootReducer: Reducer< T, Action > ) {
    this.__rootReducer = rootReducer;
    this.__state = this.__rootReducer( { action: HYDRATE_ACTION } );
  }

  dispatch = ( action: Action ): void => {
    this.__state = this.__rootReducer( { s: this.__state, action } );
    this.__emitter.emit( 'update', this.__state );
  };

  subscribe = ( f: Subscriber< T > ): void => {
    this.__emitter.on( 'update', f );
  };

  unsubscribe = ( f: Subscriber< T > ): void => {
    this.__emitter.removeListener( 'update', f );
  };

  getState = (): T => this.__state;
}


// ===================================================================================


export function combineReducers< S extends Record< string, unknown > >(
  reducerMap: { [ K in keyof S ]: Reducer< S[ K ], Action< any > > },
): Reducer< S > {
  return ( { action, s } ) => {
    const reducerKeys = ObjKeys( reducerMap );

    const { changeDetected, nextS } = reducerKeys.reduce< { nextS: S; changeDetected: boolean } >(
      ( a, key ) => {
        const { nextS } = a;
        const prevV = nextS[ key ];
        const nextV = reducerMap[ key ]( { s: prevV, action } );

        nextS[ key ] = nextV;

        // eslint-disable-next-line no-param-reassign
        a.nextS = nextS;
        // eslint-disable-next-line no-param-reassign
        a.changeDetected = a.changeDetected || nextV !== prevV;

        return a;
      },
      { nextS: s || {} as S, changeDetected: false },
    );

    return changeDetected || s === undefined ? nextS : s;
  };
}

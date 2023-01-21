// eslint-disable-next-line import/no-extraneous-dependencies
import EventEmitter from 'eventemitter3';


export type Subscriber< T > = ( nextState: T ) => unknown;

export type Action = { type: string };
export const HYDRATE_ACTION: Action = { type: '__EEContext/Store/hydrate__' };
export type Reducer< T, A extends Action = Action > = ( arg: { s?: T; action: A } ) => T;


// eslint-disable-next-line @typescript-eslint/naming-convention
export class Store< T > {
  __state: T;

  __rootReducer: Reducer< T >;

  __emitter = new EventEmitter< { update: Subscriber< T > } >();

  /**
   * we need to use any here because for some reason when\
   * used with properly typed Reducer, that specifies all\
   * possible Actions - it errors. But here our contract is\
   * basically "any valid Action type", so this should suffice
   */
  constructor( rootReducer: Reducer< T, any > ) {
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

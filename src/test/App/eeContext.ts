import * as EEContextNS from '../../EEContext';


export type State = {
  a: number;
  b: number;
};

export const defaultState: State = { a: 0, b: 0 };
export type Actions = {
  incrementA: { type: 'incrementA' };
  incrementB: { type: 'incrementB' };
};
export const aCreators: { [ K in keyof Actions ]: () => Actions[ K ] } = {
  incrementA: () => ( { type: 'incrementA' } ),
  incrementB: () => ( { type: 'incrementB' } ),
};
export type AllActions = Actions[ keyof Actions ];

export const rootReducer: EEContextNS.StoreNS.Reducer< State, AllActions > = ( { s = defaultState, action } ) => {
  switch ( action.type ) {
    case 'incrementA': return { ...s, a: s.a + 1 };
    case 'incrementB': return { ...s, b: s.b + 1 };
    default: return s;
  }
};

// ===================================================================================


export const { useDispatch, useSelector, WithCtx } = EEContextNS.init( {
  rootReducer,
  displayNamePrefix: 'illia-web-dev/react-utils',
} );

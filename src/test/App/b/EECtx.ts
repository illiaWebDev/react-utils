/* eslint-disable import/no-extraneous-dependencies */
import type { RecordValues } from '@illia-web-dev/types/dist/types/RecordValues';
import { EECtxNS } from '../../..';


export type State = {
  value: number;
};

export const defaultState: State = { value: 0 };
export type Actions = {
  incrementB: { type: 'incrementB' };
};
export const aCreators: { [ K in keyof Actions ]: () => Actions[ K ] } = {
  incrementB: () => ( { type: 'incrementB' } ),
};
export type AllActions = RecordValues< Actions >;

export const rootReducer: EECtxNS.StoreNS.Reducer< State, AllActions > = ( { s = defaultState, action } ) => {
  switch ( action.type ) {
    case 'incrementB': return { ...s, value: s.value + 1 };
    default: return s;
  }
};

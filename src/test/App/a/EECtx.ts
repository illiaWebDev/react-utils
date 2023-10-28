/* eslint-disable import/no-extraneous-dependencies */
import type { ACreators } from '@illia-web-dev/types/dist/types/ACreators';
import type { RecordValues } from '@illia-web-dev/types/dist/types/RecordValues';
import type * as EECtxNS from '../../../EECtx';


export type State = {
  value: number;
};

export const defaultState: State = { value: 0 };
export type Actions = {
  incrementA: { type: 'incrementA' };
};
export const aCreators: ACreators< Actions > = {
  incrementA: () => ( { type: 'incrementA' } ),
};
export type AllActions = RecordValues< Actions >;

export const rootReducer: EECtxNS.StoreNS.Reducer< State, AllActions > = ( { s = defaultState, action } ) => {
  switch ( action.type ) {
    case 'incrementA': return { ...s, value: s.value + 1 };
    default: return s;
  }
};

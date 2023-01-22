/* eslint-disable import/no-extraneous-dependencies */
import { EECtxNS } from '../..';
import * as aEECtxNS from './a/EECtx';
import * as bEECtxNS from './b/EECtx';


export type State = {
  a: aEECtxNS.State;
  b: bEECtxNS.State;
};

export const rootReducer = EECtxNS.StoreNS.combineReducers< State >( {
  a: aEECtxNS.rootReducer,
  b: bEECtxNS.rootReducer,
} );

export type AllActions = aEECtxNS.AllActions | bEECtxNS.AllActions;

// ===================================================================================


export const {
  useDispatch: useDispatchRaw,
  useSelector,
  WithCtx,
  ctx,
} = EECtxNS.init( {
  rootReducer,
  displayNamePrefix: 'illia-web-dev/react-utils',
} );
export const useDispatch: () => ( a: AllActions ) => void = useDispatchRaw;

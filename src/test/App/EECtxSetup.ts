/* eslint-disable import/no-extraneous-dependencies */
import { EECtxNS } from '../..';
import * as aEECtxNS from './a/EECtx';
import * as bEECtxNS from './b/EECtx';
import * as modalEECtx from '../../modal/EECtx';


export type State = {
  a: aEECtxNS.State;
  b: bEECtxNS.State;
  modal: modalEECtx.State;
};

export const rootReducer = EECtxNS.StoreNS.combineReducers< State >( {
  a: aEECtxNS.rootReducer,
  b: bEECtxNS.rootReducer,
  modal: modalEECtx.reducer,
} );

export type AllActions = aEECtxNS.AllActions | bEECtxNS.AllActions | modalEECtx.AllActions;

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

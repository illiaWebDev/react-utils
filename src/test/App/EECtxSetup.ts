/* eslint-disable import/no-extraneous-dependencies */
import { EECtxNS } from '../..';
import * as aEECtxNS from './a/EECtx';
import * as bEECtxNS from './b/EECtx';
import * as modalEECtx from '../../modal/EECtx';
import * as popperEECtx from '../../popper/EECtx';


export type State = {
  a: aEECtxNS.State;
  b: bEECtxNS.State;
  modal: modalEECtx.State;
  popper: popperEECtx.State;
};

export const rootReducer = EECtxNS.StoreNS.combineReducers< State >( {
  a: aEECtxNS.rootReducer,
  b: bEECtxNS.rootReducer,
  modal: modalEECtx.reducer,
  popper: popperEECtx.reducer,
} );

export type AllActions = (
  | aEECtxNS.AllActions
  | bEECtxNS.AllActions
  | modalEECtx.AllActions
  | popperEECtx.AllActions
);

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

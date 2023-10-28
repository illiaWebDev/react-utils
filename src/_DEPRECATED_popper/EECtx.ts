import React from 'react';
import type { Options } from '@popperjs/core';
import type { ACreators } from '@illia-web-dev/types/dist/types/ACreators';
import type { SafeOmit } from '@illia-web-dev/types/dist/types/Omit';
import type { RecordValues } from '@illia-web-dev/types/dist/types/RecordValues';
import type { Reducer } from '../EECtx/store';


export type State = {
  referenceEl: HTMLElement;
  popperComp: React.ComponentType< { close: () => unknown }>;
  options: Options;
  withOverlay: boolean;
};
export const defaultState: State = {
  referenceEl: document.createElement( 'div' ),
  popperComp: () => null,
  options: { placement: 'bottom', modifiers: [], strategy: 'fixed' },
  withOverlay: false,
};


export const aTypes = {
  show: '__illia-web-dev/react-utils/popper/show',
  hide: '__illia-web-dev/react-utils/popper/hide',
} as const;

export type Actions = {
  show: {
    type: typeof aTypes.show;
    payload: SafeOmit< State, 'options' | 'withOverlay' > & {
      options?: Options;
      withOverlay?: boolean;
    };
  };
  hide: { type: typeof aTypes.hide };
};
export type AllActions = RecordValues< Actions >;


export const aCreators: ACreators< Actions > = {
  hide: () => ( { type: aTypes.hide } ),
  show: p => ( { type: aTypes.show, payload: p } ),
};


export const reducer: Reducer< State, AllActions > = ( { action, s = defaultState } ) => {
  switch ( action.type ) {
    case aTypes.show: return {
      ...action.payload,
      options: action.payload.options || s.options,
      withOverlay: action.payload.withOverlay || false,
    };
    case aTypes.hide: return defaultState;
    default: return s;
  }
};

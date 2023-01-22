import type { RecordValues } from '@illia-web-dev/types/dist/types/RecordValues';
import type { ACreators } from '@illia-web-dev/types/dist/types/ACreators';
import React from 'react';
import type { SafeOmit } from '@illia-web-dev/types/dist/types/Omit';
import type { Reducer } from '../EECtx/store';


export type Props = Record< string, unknown >;
export type WithProps = {
  props: Props[];
};
export type ModalComp = React.ComponentType< Props >;


export type State = {
  modals: Array< WithProps & { Comp: ModalComp }>;
};
export const defaultState: State = { modals: [] };


export const aTypes = {
  pushModal: '__illia-web-dev__/react-utils/modal/push-modal',
  popModal: '__illia-web-dev__/react-utils/modal/pop-modal',
  popAllModals: '__illia-web-dev__/react-utils/modal/pop-all-modals',
  pushProps: '__illia-web-dev__/react-utils/modal/push-props',
  popProps: '__illia-web-dev__/react-utils/modal/pop-props',
} as const;


export type Actions = {
  pushModal: {
    type: typeof aTypes.pushModal;
    payload: SafeOmit< State[ 'modals' ][ 0 ], 'props' > & {
      props?: Props[];
    };
  };
  popModal: { type: typeof aTypes.popModal };
  popAllModals: { type: typeof aTypes.popAllModals };
  pushProps: { type: typeof aTypes.pushProps; payload: Props };
  popProps: { type: typeof aTypes.popProps };
};
export type AllActions = RecordValues< Actions >;


export const aCreators: ACreators< Actions > = {
  popModal: () => ( { type: aTypes.popModal } ),
  pushModal: p => ( { type: aTypes.pushModal, payload: p } ),
  popAllModals: () => ( { type: aTypes.popAllModals } ),
  pushProps: p => ( { type: aTypes.pushProps, payload: p } ),
  popProps: () => ( { type: aTypes.popProps } ),
};


export const reducer: Reducer< State, AllActions > = ( { s = defaultState, action } ) => {
  switch ( action.type ) {
    case aTypes.popModal:
      return { ...s, modals: s.modals.slice( 0, -1 ) };
    case aTypes.pushModal: {
      const fullModal: State[ 'modals' ][ 0 ] = {
        ...action.payload,
        props: action.payload.props || [],
      };

      return { ...s, modals: s.modals.concat( fullModal ) };
    }
    case aTypes.popAllModals:
      return { ...s, modals: defaultState.modals };
    case aTypes.pushProps: {
      const lastModalIndx = s.modals.length - 1;
      const lastModal = s.modals[ lastModalIndx ];
      if ( lastModalIndx === -1 || lastModal === undefined ) return s;

      const nextProps = lastModal.props.concat( action.payload );

      return {
        ...s,
        modals: s.modals.map(
          ( it, i ) => ( i === lastModalIndx ? { ...it, props: nextProps } : it ),
        ),
      };
    }
    case aTypes.popProps: {
      const lastModalIndx = s.modals.length - 1;
      const lastModal = s.modals[ lastModalIndx ];
      if ( lastModalIndx === -1 || lastModal === undefined ) return s;

      return {
        ...s,
        modals: s.modals.map(
          ( it, i ) => ( i === lastModalIndx ? { ...it, props: it.props.slice( 0, -1 ) } : it ),
        ),
      };
    }
    default:
      return s;
  }
};

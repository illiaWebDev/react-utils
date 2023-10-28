import type { RecordValues } from '@illia-web-dev/types/dist/types/RecordValues';
import type { ACreators } from '@illia-web-dev/types/dist/types/ACreators';
import type React from 'react';
import type { SafeOmit } from '@illia-web-dev/types/dist/types/Omit';
import type { Reducer } from '../EECtx/store';

/**
 * couple of design decisions here
 * - mainly, we operate with Component and arrays of its props \
 *   because we want full control over the portal-based structures\
 *   each and every time we push to those
 * - array of props serves to allow for horizontal scaling, e.g.\
 *   with modals we sometimes want to change content of already\
 *   opened modal instead of creating another one or replacing\
 *   current entirely
 * - types are pretty general because it's pretty complex to type\
 *   it correctly while staying generic. From the standpoint of \
 *   this code we are not really interesed in particular shape of\
 *   props, because we just pass them down to Component, however\
 *   when we call the pushPortal method we want to ensure that what\
 *   we do is correct and intended way to do that is to define props\
 *   in place typig it with exact Prps type that component would \
 *   expect
 * - for modals, sometimes we want deeper control over "close"\
 *   functionality (it's fairly often that we want to have some \
 *   transitions like fade-in/out or slide-in/out or whatnot).\
 *   But also oftentimes close will be specific to our Component \
 *   (resides in its local state) and no obvious way to pass the \
 *   "close" function to modal contents. This can be solved for \
 *   example with
 *   - contexts: we define close context together with Component
 *     and then any content components can bind to that
 *   - we override "close" function using props because those are \
 *     intended to be fed to Component by "Root portal component" (see\
 *     Root file nearby in ./Comp). This is exactly the strategy\
 *     to take if we want to prevent closing modals when there are \
 *     changes that might be lost
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Props = Record< string, any >;
export type WithProps = {
  props: Props[];
};
export type PortalComp = React.ComponentType< Props >;


export type State = {
  portals: Array< WithProps & { Comp: PortalComp } >;
};
export const defaultState: State = { portals: [] };


export const aTypes = {
  pushPortal: '__illia-web-dev__/react-utils/portal/push-portal',
  popPortal: '__illia-web-dev__/react-utils/portal/pop-portal',
  popAllPortals: '__illia-web-dev__/react-utils/portal/pop-all-portals',
  pushProps: '__illia-web-dev__/react-utils/portal/push-props',
  popProps: '__illia-web-dev__/react-utils/portal/pop-props',
  replaceProps: '__illia-web-dev__/react-utils/portal/replace-props',
} as const;


export type Actions = {
  pushPortal: {
    type: typeof aTypes.pushPortal;
    payload: SafeOmit< State[ 'portals' ][ 0 ], 'props' > & {
      props?: Props[];
    };
  };
  popPortal: { type: typeof aTypes.popPortal };
  popAllPortals: { type: typeof aTypes.popAllPortals };
  pushProps: { type: typeof aTypes.pushProps; payload: Props };
  popProps: { type: typeof aTypes.popProps };
  replaceProps: {
    type: typeof aTypes.replaceProps;
    payload: Props;
  };
};
export type AllActions = RecordValues< Actions >;


export const aCreators: ACreators< Actions > = {
  popPortal: () => ( { type: aTypes.popPortal } ),
  pushPortal: p => ( { type: aTypes.pushPortal, payload: p } ),
  popAllPortals: () => ( { type: aTypes.popAllPortals } ),
  pushProps: p => ( { type: aTypes.pushProps, payload: p } ),
  popProps: () => ( { type: aTypes.popProps } ),
  replaceProps: p => ( { type: aTypes.replaceProps, payload: p } ),
};


export const reducer: Reducer< State, AllActions > = ( { s = defaultState, action } ) => {
  switch ( action.type ) {
    case aTypes.popPortal:
      return { ...s, portals: s.portals.slice( 0, -1 ) };
    case aTypes.pushPortal: {
      const fullPortal: State[ 'portals' ][ 0 ] = {
        ...action.payload,
        props: action.payload.props || [],
      };

      return { ...s, portals: s.portals.concat( fullPortal ) };
    }
    case aTypes.popAllPortals:
      return { ...s, portals: defaultState.portals };
    case aTypes.pushProps: {
      const lastPortalIndx = s.portals.length - 1;
      const lastPortal = s.portals[ lastPortalIndx ];
      if ( lastPortal === undefined ) return s;

      const nextProps = lastPortal.props.concat( action.payload );

      return {
        ...s,
        portals: s.portals.map(
          ( it, i ) => ( i === lastPortalIndx ? { ...it, props: nextProps } : it ),
        ),
      };
    }
    case aTypes.popProps: {
      const lastPortalIndx = s.portals.length - 1;
      const lastPortal = s.portals[ lastPortalIndx ];
      if ( lastPortal === undefined ) return s;

      return {
        ...s,
        portals: s.portals.map(
          ( it, i ) => ( i === lastPortalIndx ? { ...it, props: it.props.slice( 0, -1 ) } : it ),
        ),
      };
    }
    case aTypes.replaceProps: {
      const lastPortalIndx = s.portals.length - 1;
      const lastPortal = s.portals[ lastPortalIndx ];
      if ( lastPortal === undefined ) return s;

      return {
        ...s,
        portals: s.portals.map(
          it => {
            if ( it !== lastPortal ) return it;

            const propsLength = it.props.length;
            const nextProps = propsLength === 0 ? [action.payload] : (
              it.props.slice( 0, -1 ).concat( action.payload )
            );

            return { ...it, props: nextProps };
          },
        ),
      };
    }
    default:
      return s;
  }
};

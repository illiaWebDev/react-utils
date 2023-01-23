import React from 'react';
import { createPopper, Instance } from '@popperjs/core';
import { popperElId } from '../__popperElId';
import { State, defaultState } from '../EECtx';


export type Props = {
  usePopperState: () => State;
  close: () => unknown;
  className?: string;
};


const dataShowAttr = 'data-show';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const _: React.FC< Props > = React.memo( ( { usePopperState, className, close } ) => {
  const [styleMounted, setStyleMounted] = React.useState( false );
  const popperState = usePopperState();
  const { withOverlay } = popperState;


  const popperElRef = React.useRef< HTMLDivElement >( null );
  const instanceRef = React.useRef< Instance | null >( null );
  const destroyInstance = React.useCallback( () => {
    const { current: maybeRoot } = popperElRef;
    const { current: maybeInstance } = instanceRef;

    if ( maybeInstance ) maybeInstance.destroy();
    if ( maybeRoot ) maybeRoot.removeAttribute( dataShowAttr );
  }, [] );


  React.useEffect( () => {
    document.head.insertAdjacentHTML( 'beforeend', `
        <style>
          #${popperElId} { display: none; }
          #${popperElId}[data-show] { display: block; }
        </style>
      ` );

    setStyleMounted( true );
  }, [] );


  React.useEffect( () => {
    if ( popperState !== defaultState ) {
      const { referenceEl } = popperState;
      const { current: maybeRoot } = popperElRef;

      if ( maybeRoot !== null ) {
        maybeRoot.setAttribute( dataShowAttr, 'true' );

        instanceRef.current = createPopper( referenceEl, maybeRoot, popperState.options );
      }
    }

    if ( popperState === defaultState ) {
      destroyInstance();
    }

    return destroyInstance;
  }, [popperState, destroyInstance] );


  const overlayDivProps = React.useMemo( () => {
    if ( withOverlay === false ) return {};

    const onOverlayClick: React.MouseEventHandler< HTMLDivElement > = e => (
      e.target === e.currentTarget && close()
    );
    const style: React.CSSProperties = {
      position: 'fixed',
      left: 0,
      top: 0,
      width: '100vw',
      height: '100vh',
    };

    return { style, onClick: onOverlayClick };
  }, [withOverlay, close] );


  return styleMounted === false ? null : (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className={ className } { ...overlayDivProps }>
      <div id={ popperElId } ref={ popperElRef }>
        <popperState.popperComp close={ close } />
      </div>
    </div>
  );
} );
_.displayName = '__illia-web-dev/react-utils/popper/Comp/Root';

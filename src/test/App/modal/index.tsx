import React from 'react';
import { useDispatch } from '../EECtxSetup';
import * as portalNS from '../../../portal';


type OnOverlayClick = NonNullable< portalNS.CompNS.ModalNS.Props[ 'onOverlayClick' ] >;
const useCloseModal = () => {
  const dispatch = useDispatch();

  return React.useCallback< OnOverlayClick >( e => {
    if ( e.target !== e.currentTarget ) return;

    dispatch( portalNS.aCreators.popPortal() );
  }, [dispatch] );
};


const Modal2: portalNS.PortalComp = React.memo( p => {
  const closeModal = useCloseModal();

  return (
    <portalNS.CompNS.ModalNS._ onOverlayClick={ closeModal }>
      { ( p.children || null ) as React.ReactNode }
    </portalNS.CompNS.ModalNS._>
  );
} );
Modal2.displayName = 'test/App/modal/Modal2';


const Modal: portalNS.PortalComp = React.memo( p => {
  const { children } = p;
  const dispatch = useDispatch();
  const pushModal = React.useCallback( () => (
    dispatch( portalNS.aCreators.pushPortal( {
      Comp: Modal2,
      props: [{ children: 'Modal 2' }],
    } ) )
  ), [dispatch] );
  const closeModal = useCloseModal();


  return (
    <portalNS.CompNS.ModalNS._ onOverlayClick={ closeModal }>
      <>
        { children }

        <br />

        <button type='button' onClick={ pushModal }>
          Show modal
        </button>
      </>
    </portalNS.CompNS.ModalNS._>
  );
} );
Modal.displayName = 'test/App/modal/Modal';


export const ShowModalBtn = React.memo( () => {
  const dispatch = useDispatch();

  const popProps = React.useCallback( () => (
    dispatch( portalNS.aCreators.popProps( ) )
  ), [dispatch] );

  const pushProps = React.useCallback( () => (
    dispatch( portalNS.aCreators.pushProps( {
      children: (
        <div>
          <span>Modal 1; Props 2;</span>
          <br />
          <button onClick={ popProps } type='button'>pop props</button>
        </div>
      ),
    } ) )
  ), [dispatch, popProps] );

  const pushModal = React.useCallback( () => (
    dispatch( portalNS.aCreators.pushPortal( {
      Comp: Modal,
      props: [{
        children: (
          <div>
            <span>Modal 1; Props 1;</span>
            <br />
            <button type='button' onClick={ pushProps }>push props</button>
          </div>
        ),
      }],
    } ) )
  ), [dispatch, pushProps] );


  return (
    <button type='button' onClick={ pushModal }>
      Show modal
    </button>
  );
} );
ShowModalBtn.displayName = 'test/App/modal/ShowModalBtn';

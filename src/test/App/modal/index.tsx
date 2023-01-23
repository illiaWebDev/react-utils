import React from 'react';
import { useDispatch } from '../EECtxSetup';
import * as modalEECtx from '../../../modal/EECtx';
import * as ModalCompNS from '../../../modal/Comp';


type OnOverlayClick = NonNullable< ModalCompNS.ModalNS.Props[ 'onOverlayClick' ] >;
const useCloseModal = () => {
  const dispatch = useDispatch();

  return React.useCallback< OnOverlayClick >( e => {
    if ( e.target !== e.currentTarget ) return;

    dispatch( modalEECtx.aCreators.popModal() );
  }, [dispatch] );
};


const Modal2: modalEECtx.ModalComp = React.memo( p => {
  const closeModal = useCloseModal();

  return (
    <ModalCompNS.ModalNS._ onOverlayClick={ closeModal }>
      { ( p.children || null ) as React.ReactNode }
    </ModalCompNS.ModalNS._>
  );
} );
Modal2.displayName = 'test/App/modal/Modal2';


const Modal: modalEECtx.ModalComp = React.memo( p => {
  const { children } = p;
  const dispatch = useDispatch();
  const pushModal = React.useCallback( () => (
    dispatch( modalEECtx.aCreators.pushModal( {
      Comp: Modal2,
      props: [{ children: 'Modal 2' }],
    } ) )
  ), [dispatch] );
  const closeModal = useCloseModal();


  return (
    <ModalCompNS.ModalNS._ onOverlayClick={ closeModal }>
      <>
        { children }

        <br />

        <button type='button' onClick={ pushModal }>
          Show modal
        </button>
      </>
    </ModalCompNS.ModalNS._>
  );
} );
Modal.displayName = 'test/App/modal/Modal';


export const ShowModalBtn = React.memo( () => {
  const dispatch = useDispatch();

  const popProps = React.useCallback( () => (
    dispatch( modalEECtx.aCreators.popProps( ) )
  ), [dispatch] );

  const pushProps = React.useCallback( () => (
    dispatch( modalEECtx.aCreators.pushProps( {
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
    dispatch( modalEECtx.aCreators.pushModal( {
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

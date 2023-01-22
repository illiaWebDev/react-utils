import React from 'react';
import { useDispatch } from '../EECtxSetup';
import * as modalEECtx from '../../../modal/EECtx';


const ModalRaw: React.FC< React.PropsWithChildren< Record< string, unknown > > > = React.memo( ( { children } ) => {
  const dispatch = useDispatch();
  const close = React.useCallback< React.MouseEventHandler< HTMLDivElement > >( e => {
    if ( e.target !== e.currentTarget ) return;

    dispatch( modalEECtx.aCreators.popModal() );
  }, [dispatch] );

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      style={ {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
      } }
      onClick={ close }
    >
      <div style={ { padding: 16, backgroundColor: '#fff' } }>
        { children }
      </div>
    </div>
  );
} );
ModalRaw.displayName = 'test/App/modal/ModalRaw';


const Modal2: modalEECtx.ModalComp = React.memo( p => (
  <ModalRaw>
    { p.children as React.ReactNode }
  </ModalRaw>
) );
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


  return (
    <ModalRaw>
      <>
        { children }

        <br />

        <button type='button' onClick={ pushModal }>
          Show modal
        </button>
      </>
    </ModalRaw>
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

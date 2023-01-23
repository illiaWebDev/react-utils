import React from 'react';


export type Props = {
  onOverlayClick?: React.MouseEventHandler< HTMLDivElement >;
  noInlineStyles?: true;
};

export const clss = {
  wrap: 'wrap',
  content: 'content',
};

const wrapInlineStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0,0,0,0.6)',
};
const contentInlineStyle: React.CSSProperties = {
  padding: 16,
  backgroundColor: '#fff',
};


// eslint-disable-next-line @typescript-eslint/naming-convention
export const _: React.FC< React.PropsWithChildren< Props > > = React.memo( p => {
  const { children, onOverlayClick } = p;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      style={ wrapInlineStyle }
      onClick={ onOverlayClick }
      className={ clss.wrap }
    >
      <div style={ contentInlineStyle } className={ clss.wrap }>
        { children }
      </div>
    </div>
  );
} );
_.displayName = '__illia-web-dev__/react-utils/modal/Comp/Modal';

/* eslint-disable import/no-extraneous-dependencies,import/no-import-module-exports */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';


if ( module.hot ) {
  module.hot.accept();
}


const app = document.getElementById( 'app' );
if ( !app ) { throw new Error( 'no #app in ./src/test/index' ); }


const root = createRoot( app );
root.render( <App /> );

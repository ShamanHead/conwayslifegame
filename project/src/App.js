import CanvasMenu from './modules/CanvasMenu';
import Router from './modules/Router';
import RouteError from './modules/RouteError';
import Root from './modules/Root';
import BrowserRouter from 'react-router-dom';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

import './css/index.css'
import './css/CanvasMenu.scss'
import './css/Router.scss'
import './css/Fonts.scss'
import './css/RouteError.scss'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <RouteError/>,
        children: 
            [
                {
                    path: "/",
                    element: <CanvasMenu/>
                }
            ]
  },
]);


function App() {
  return (
            <div className="flex flex-col w-full md:flex-row">
              <RouterProvider router={router}/> 
            </div>
          );
}

export default App;


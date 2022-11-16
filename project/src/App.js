import CanvasMenu from './modules/CanvasMenu';
import RouteError from './modules/RouteError';
import Root from './modules/Root';
import Page from './modules/Page';
import {pages} from './modules/Pages';
import PatternsSearch from './modules/Patterns/PatternsSearch'

import {
  createBrowserRouter,
  RouterProvider,
  useLocation
} from "react-router-dom";

import { TransitionGroup, CSSTransition } from 'react-transition-group'

import './css/index.css'
import './css/CanvasMenu.scss'
import './css/Router.scss'
import './css/Fonts.scss'
import './css/RouteError.scss'
import './css/Page.scss'
import './css/Patterns.scss'
import './css/Dialog.scss'

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
                },
                {
                    index: true,
                    path: "about",
                    element: <Page content={pages.about}/>,
                },
                {
                    index: true,
                    path: "patterns",
                    element: <PatternsSearch/>,
                }
            ]
    }
]);


function App() {

  return (
            <div className="flex flex-col w-full md:flex-row">
                <RouterProvider router={router}/> 
            </div>
          );
}

export default App;


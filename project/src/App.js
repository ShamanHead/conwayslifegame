import CanvasMenu from './modules/Canvas/CanvasMenu';
import RouteError from './modules/Router/RouteError';
import Root from './modules/Root';
import Page from './modules/Page';
import {pages} from './modules/Pages';
import PatternsSearch from './modules/Patterns/PatternsSearch'
import PatternAdd from './modules/Patterns/Add/PatternAdd'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './css/index.css'
import './css/Global.scss'
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
                    element: <CanvasMenu startPrompt="life"/>
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
                },
                {
                    index: true,
                    path: "patterns/add",
                    element: <PatternAdd/>
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


import CanvasMenu from './modules/CanvasMenu';
import Router from './modules/Router';
import './css/index.css'
import './css/CanvasMenu.scss'
import './css/Router.scss'
import './css/Fonts.scss'

function App() {
  return (
      <div className="flex flex-row w-full">
        <Router/>
        <CanvasMenu/>
      </div>
          );
}

export default App;


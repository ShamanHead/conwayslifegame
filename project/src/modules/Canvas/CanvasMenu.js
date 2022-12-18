import Menu from '../Menu';
import Canvas from './Canvas';
import {
    React,
    useState,
    useEffect,
    useRef
} from "react";
import {useLoaderData} from "react-router-dom";

/**
 * Main App class. 
 * @extends React.Component
 */

export default function CanvasMenu (props) {
    const returnCells = useRef(),
        data = useLoaderData();

    const [updateCanvas, setUpdateCanvas] = useState(""),
        [generationCount, setGenerationCount] = useState(0),
        [type, setType] = useState(props.type ? props.type : "relative"),
        [settingsCanvas, setSettingsCanvas] = useState({
            sizeSet: props.size ? props.size : {width: 6, height: 6},
            widthSet: props.width ? props.width : (window.innerWidth - (window.innerWidth / 100 * 30)), 
            heightSet: props.height ? props.height : (window.innerHeight - (window.innerHeight / 100 * 30)),
            colorSet: "rgba(245,221,221)",
            borderOnSet: props.borderOnSet ? props.borderOnSet : false,
            borderColorSet: props.colorSet ? props.colorSet : "gray",
            showGeneration: props.showGeneration !== undefined ? props.showGeneration : true,
            returnCells: (cells) => {getCells(cells)} 
        }),
        [menu, setMenu] = useState({
            icons: props.menuIcons ? props.menuIcons : ["start", "stop", "clear", "soup"]
        })

    useEffect(() => {
        if(type !== 'fixed') {
            window.addEventListener('resize', updateDimensions);
        }
        
        return () => {
            if(type !== 'fixed') {
                window.removeEventListener('resize', updateDimensions);
            } 
        }
    })

    const onReturnCells = props.returnCells,
        onUpdateCanvas = useRef(),
        onUpdateSettings = useRef();

    const updateGenerationCount = (count) => {
        setGenerationCount(count)
    }
   
    const getCells = (cells) => {
        returnCells.current = cells;


        if(typeof onReturnCells === "function") {
            onReturnCells(cells)
        }
    }

    const getDimensions = () => {
        return (
            [
                window.innerWidth - (window.innerWidth / 100 * 30),
                window.innerHeight - (window.innerHeight / 100 * 30)
            ]
        )
    }

    const updateDimensions = () => {
        let mutateSetting = settingsCanvas,
            [width, height] = getDimensions()

        mutateSetting.widthSet = width;
        mutateSetting.heightSet = height;

        console.log(onUpdateSettings)

        setSettingsState(mutateSetting)
    }

    const setCanvasState = (state) => {
        setUpdateCanvas(state)

        onUpdateCanvas.current(state);
    }

    const setOnUpdate = (onUpdateState, updateSettings) => {
        onUpdateCanvas.current = onUpdateState;
        onUpdateSettings.current = updateSettings;
    }

    const setSettingsState = (state) => {
        setSettingsCanvas(state)

        setType("relative");
        window.removeEventListener('resize', updateDimensions);

        onUpdateSettings.current(state);
    }

    return (
        <div className="canvas-menu flex mt-5 items-center flex-col">
            <Canvas 
                setOnUpdate={setOnUpdate}
                updateGenerationCount={updateGenerationCount}
                startupSettings={settingsCanvas}
                cells={data}
            />
            <Menu setCanvasState={setCanvasState}
                  generationCount={generationCount}
                  setSettingsState={setSettingsState}
                  startupSettings={settingsCanvas} 
                  icons={menu.icons}
            />
        </div>
    ) 
}

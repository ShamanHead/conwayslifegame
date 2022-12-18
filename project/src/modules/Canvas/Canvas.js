import {
    React,
    useState,
    useEffect,
    useRef,
} from "react";

import 
{
    onCell, 
    clearCells, 
    cycle, 
    getPosition, 
    draw, 
    clear, 
    soup, 
    startUpdating, 
    stopUpdating,
    normalize
} from './CanvasAPI'; 

export default function Canvas (props) {

    const intervalRef = useRef(),
        redrawRef = useRef(),
        modeRef = useRef(),
        contextRef = useRef(),
        cellsRef = useRef(),
        generationCountRef = useRef();

    const [settings, updateSettings] = useState(props.startupSettings),
        [screen, setScreen] = useState({
            width: 
                Math.round(
                    settings.widthSet / 
                    settings.sizeSet.width
                ), 
            height: 
                Math.round(
                    settings.heightSet / 
                    settings.sizeSet.height
                )
        }),
        [lastMouseCords, setLastMouseCords] = useState([0,0]),
        [drawGeneration, setDrawGeneration] = useState(false),
        root = useRef();

    const onUpdateState = (state) => {
        switch(state) {
            case "start" :
                startUpdating(settings, 
                    screen, 
                    props, 
                    contextRef, 
                    cellsRef, 
                    modeRef, 
                    generationCountRef, 
                    intervalRef, 
                    redrawRef);
                break;
            case "stop" :
                stopUpdating(modeRef, intervalRef, redrawRef);
                break;
            case "clear" :
                cellsRef.current = clearCells(screen);
                stopUpdating(modeRef, intervalRef, redrawRef);
                clear(contextRef, settings)
                draw(contextRef, cellsRef, settings);
                break;
            case "soup":
                clear(contextRef, settings);
                soup(cellsRef, screen);
                draw(contextRef, cellsRef, settings);
                break;
        }
    },
    onUpdateSettings = (newSettings) => {
        let screenNew = {
            width: 
                newSettings.widthSet / 
                newSettings.sizeSet.width, 
            height: 
                newSettings.heightSet / 
                newSettings.sizeSet.height
        }

        updateSettings(newSettings);

        cellsRef.current = clearCells(screenNew);
 
        contextRef.current = root.current.getContext("2d");
        
        clear(contextRef, settings)
        draw(contextRef, cellsRef, newSettings);

        setScreen({
            width: 
                newSettings.widthSet / 
                newSettings.sizeSet.width, 
            height: 
                newSettings.heightSet / 
                newSettings.sizeSet.height
        });
    } 

    const onMouseUp = (e) => {
        setDrawGeneration(false); 
        setLastMouseCords([0, 0]);
    },
    onMouseMove = (e) => {
        let x = e.nativeEvent.offsetX, y = e.nativeEvent.offsetY,
            pos = getPosition(x, y, settings);

        if(drawGeneration === true && (
            pos[0] !== lastMouseCords[0] || pos[1] !== lastMouseCords[1]) ) {
            setLastMouseCords(pos);
            clear(contextRef, settings);
            onCell(pos, cellsRef.current);  
            draw(contextRef, cellsRef, settings);
            settings.returnCells(cellsRef)
        }
    },
    onMouseDown = (e) => {
        let x = e.nativeEvent.offsetX, y = e.nativeEvent.offsetY,
            pos = getPosition(x, y, settings);

        setLastMouseCords(pos);
        setDrawGeneration(true); 
        clear(contextRef, settings); 
        onCell(pos, cellsRef.current);  
        draw(contextRef, cellsRef, settings);
        settings.returnCells(cellsRef)
    }

    useEffect(() => {
        clearCells(screen);
        contextRef.current = root.current.getContext("2d"); 

        if(props.cells !== null && props.cells !== undefined) {
            let cells = JSON.parse(JSON.parse(props.cells).data.content)
            cellsRef.current = normalize(cells, screen);
            clearCells(screen);
        } else {
            cellsRef.current = clearCells(screen); 
        }
        clear(contextRef, settings)
        draw(contextRef, cellsRef, settings);
        modeRef.current = 0;
        props.setOnUpdate(onUpdateState, onUpdateSettings);
    }, [settings]) 

    return (
        <canvas id="canvas" 
                width={settings.widthSet} 
                height={settings.heightSet}
                ref={root}
                onMouseUp = {onMouseUp}
                onMouseMove = {onMouseMove}
                onMouseDown = {onMouseDown}
            />
            );

}

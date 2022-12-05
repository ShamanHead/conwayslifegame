import {
    React,
    useState,
    useEffect,
    useRef,
} from "react";

import {onCell, clearCells, cycle, getPosition, draw, clear, soup} from './CanvasAPI'; 

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
                settings.widthSet / 
                settings.sizeSet.width, 
            height: 
                settings.heightSet / 
                settings.sizeSet.height
        }),
        [lastMouseCords, setLastMouseCords] = useState([0,0]),
        [drawGeneration, setDrawGeneration] = useState(false),
        [generationCount, setGenerationCount] = useState(0),
        root = useRef();

    const onUpdateState = (state) => {
        switch(state) {
            case "start" :
                startUpdating();
                break;
            case "stop" :
                stopUpdating();
                break;
            case "clear" :
                cellsRef.current = clearCells(screen);
                stopUpdating();
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
                settings.widthSet / 
                settings.sizeSet.width, 
            height: 
                settings.heightSet / 
                settings.sizeSet.height
        }
 
        cellsRef.current = clearCells(screenNew);

        contextRef.current = root.current.getContext("2d");

        setScreen({
            width: 
                settings.widthSet / 
                settings.sizeSet.width, 
            height: 
                settings.heightSet / 
                settings.sizeSet.height
        });
    }

    const startUpdating = () => {
        if(modeRef.current === 1) return 0;
        modeRef.current = 1;

        generationCountRef.current = 0;

        intervalRef.current = 
            setInterval(() => 
                {
                    generationCountRef.current = cycle(cellsRef.current, generationCountRef.current, screen, props)
                }, 32) 
        redrawRef.current = 
            setInterval(() => {
                clear(contextRef, settings);
                draw(contextRef, cellsRef, settings);
            }
            , 16)
    },
    stopUpdating = () => {
        if(modeRef.current === 0) return 0;
        modeRef.current = 0;

        clearInterval(intervalRef.current);
        clearInterval(redrawRef.current);
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
    }

    useEffect(() => {
        clearCells(screen);
        contextRef.current = root.current.getContext("2d"); 
        cellsRef.current = clearCells(screen); 
        modeRef.current = 0;
        props.setOnUpdate(onUpdateState, onUpdateSettings);
    }, settings) 

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

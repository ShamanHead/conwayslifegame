import {
    React,
    useState,
    useEffect,
    useRef
} from "react";

import 
{
    draw, 
} from './CanvasAPI'; 

export default function StaticCanvas (props) {
    const contextRef = useRef()

    const [settings, updateSettings] = useState({
        widthSet: 360, 
        heightSet: 250,
        colorSet: "rgba(245,221,221)",
        borderOnSet: false,
        borderColorSet: "#000",
        sizeSet: props.size ? props.size : {width: 6, height: 6},
        startPrompt: props.startPrompt,
        showGeneration: props.showGeneration !== undefined ? props.showGeneration : true
    }),
    root = useRef();
  
    useEffect(() => {
        contextRef.current = root.current.getContext("2d");

        let cells = {current: props.cells}

        draw(contextRef, cells, settings)
    }, settings) 

    return (
        <canvas id="canvas" 
                width={settings.widthSet} 
                height={settings.heightSet}
                ref={root}
            />
            );


}

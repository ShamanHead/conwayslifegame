import {
    React,
    useState,
    useEffect,
    useRef
} from "react";

    //onUpdateSettings(settings) {
    //    this.setState(
    //        {
    //            settings: settings, 
    //            screen: {width: settings.widthSet / this.sizes.width, height: settings.heightSet / this.sizes.height}
    //        },
    //        () => {this.clearCells()}
    //    );
    //}

    /**
     * Clears canvas
     */
    function clearCells(screen) {
        const cells = {active: [], toAdd: [], toDelete: [], toRender: []};

        for(let y = 0;y < screen.height;y++) {
            cells.active[y] = [];
            
            for(let x = 0;x < screen.width;x++) {
                cells.active[y][x] = 0;
            }
        }

        return cells;

        //TODO
        //clear();
        //draw(); 
    }
 
    function draw(context, settings, sizes, cells) {
        context.fillStyle = settings.colorSet;
        context.linewidth = "1";
        context.strokeStyle = settings.borderColorSet;
         
        if(settings.borderOnSet === true){
            context.beginPath()

            for(let y1 = sizes.width; y1 < settings.widthSet;y1+=sizes.width) { 
                    context.moveTo(y1, 0);
                    context.lineTo(y1, settings.heightSet)  
            }

            for(let x1 = sizes.height; x1 < settings.heightSet;x1+=sizes.width) { 
                    context.moveTo(0, x1);
                    context.lineTo(settings.widthSet, x1)  
            }

            context.stroke();
        }

        context.beginPath();

        for(let i = 0;i < cells.toRender.length;i++) {
           let current = cells.toRender[i];
           context.fillRect(current[1] * sizes.width, current[0] * sizes.height, sizes.width, sizes.height); 
        }

        context.stroke();
    }

    function clear(context, settings) {
        context.clearRect(0, 0, settings.widthSet, settings.heightSet);
    } 

export default function StaticCanvas (props) {
    const root = useRef(null)
    let context = null;
    const sizes = {width: 5, height: 5};
    const cells = {active: [], toAdd: [], toDelete: [], toRender: []}

    const [settings, setSettings] = useState({
        widthSet: 360, 
        heightSet: 250,
        colorSet: "rgba(245,221,221)",
        borderOnSet: false,
        borderColorSet: "#000"
    }),
    [screen, setScreen] = useState({
          width: 
              settings.widthSet / 
              sizes.width, 
          height: 
              settings.heightSet / 
              sizes.height
    });

    useEffect(() => {
        context = root.current.getContext("2d");
        draw(context, settings, sizes, props.cells);
    }) 

    return (
        <canvas id="canvas" 
                width={settings.widthSet} 
                height={settings.heightSet}
                ref={root}/>
    );

}

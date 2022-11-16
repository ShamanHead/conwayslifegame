import {
    React,
    useState,
    useEffect,
    useRef
} from "react";

export default function Dialog(props) {
   
    const [state, setState] = useState(props.state ? props.state : "open"); 

    const clicked = event => {
        setState("close");
    }

    const classes = `dialog ${state}`;

    return (
        <div className={classes}>
            <div className="shade" onClick={clicked}></div>
            <div className="dialog-window">
                <h2 className="dialog-window__title">Hey, im just noticed that you are GAY</h2>
            </div> 
        </div>
    ) 
}

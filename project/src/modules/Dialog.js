import {
    React,
    useState,
    useEffect,
    useRef
} from "react";

export default function Dialog(props) {
   
    const [state, setState] = useState(props.state ? props.state : "open"); 

    const clicked = event => {
        props.close() 
    }

    const classes = `dialog ${props.state}`;

    return (
        <div className={classes}>
            <div className="shade" onClick={clicked}></div>
            <div className="dialog-window pb-5">
                {props.children}
            </div> 
        </div>
    ) 
}

import {
    React,
    useState,
    useEffect,
    useRef
} from "react";

import StaticCanvas from "../Canvas/StaticCanvas"

export default function PatternItem (props) {

    const [tagList, setTagList] = useState([])

    useEffect(() => {
        let tempTagList = [];

        for(let i = 0;i < props.tags.length; i++) {
            let tag = props.tags[i];

            tempTagList.push(
                <div key={tag.id}
                    class="item"
                    style={{border: "2px solid #" + tag.hex}}>
                    {tag.name}
                </div>
            )
        }
        console.log(props);
        setTagList(tempTagList);
    }, [])

    return (
        <div className="patterns-list-item">
            <StaticCanvas cells={props.cells}/>
            <div className="patterns-list-item__name">
                {props.name}
                <a href={`/pattern/${props.id}`} className="patterns-list-item__test">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                </a>
            </div>
            <div className="patterns-list-item__tags">{tagList}</div>
            {/*<div className="patterns-list-item__button">Open</div>*/}
        </div>
    )
}

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

        setTagList(tempTagList);
    }, [])

    return (
        <div className="patterns-list-item">
            <StaticCanvas cells={props.cells}/>
            <span className="patterns-list-item__name">{props.name}</span>
            <div className="patterns-list-item__tags">{tagList}</div>
            {/*<div className="patterns-list-item__button">Open</div>*/}
        </div>
    )
}

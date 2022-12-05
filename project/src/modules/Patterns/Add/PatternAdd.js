import {
    React,
    useState,
    useEffect,
} from "react";

import CanvasMenu from '../../Canvas/CanvasMenu'
import TagFilter from './TagFilter'

export default function PatternAdd (props) 
{
    const [state, setState] = useState([])


    return (
        <div class="patterns-add page">
            <div className="page-article">
                <h2 className="page-article__title">New Pattern</h2>
            </div>
            <CanvasMenu 
                menuIcons={["clear"]} 
                width="720"
                height="500"
                type="fixed"
                size={{width: 12, height: 12}}
                borderOnSet={true}
                showGeneration={false}
            />
            <input type="" placeholder="Name" class="pattern-add-input mt-5 mb-5" />
            <TagFilter/>
        </div>
    )
}

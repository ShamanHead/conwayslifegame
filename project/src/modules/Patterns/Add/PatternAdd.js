import {
    React,
    useState,
    useEffect,
    useRef
} from "react";

import CanvasMenu from '../../Canvas/CanvasMenu'
import TagFilter from './TagFilter'

export default function PatternAdd (props) 
{
    const [returnCells, setCells] = useState({}),
        [name, setName] = useState(""),
        [inventor, setInventor] = useState(""),
        [tags, setTags] = useState([]),
        landscape = useRef(true);

    useEffect(() => {
        if(window.innerHeight > window.innerWidth){
            landscape.current = "portrait";
        } else {
            landscape.current = "landscape";
        }
    }, [])

    const update = (func, val) => {
        console.log(val);
        func(val)
    },
    submit = () => {
        if(returnCells == {} || name == "") {
            alert("Please fill in all fields");
            return;
        }

        console.log(tags);

        fetch("http://localhost:81/pattern/add", 
        {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, *cors, same-origin
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(
                {
                    content: JSON.stringify(returnCells.current), 
                    name: name,
                    tags: tags,
                    inventor: inventor
                }
            )
        }
        )

    }

    return (
        <div class="patterns-add page">
            <div className="page-article">
                <h2 className="page-article__title">New Pattern</h2>
            </div>
            <div className="page-content">
                <CanvasMenu 
                    menuIcons={["clear"]} 
                    width="720"
                    height="500"
                    type="fixed"
                    size={{width: 12, height: 12}}
                    returnCells={(cells) => {update(setCells, cells)}}
                    borderOnSet={true}
                    showGeneration={false}
                />
                <div className="input-container">
                    <input type="" placeholder="Name" onChange={(e) => {update(setName, e.currentTarget.value)}} class="pattern-name mt-5 mb-5" />
                    <input type="" placeholder="Inventor" onChange={(e) => {update(setInventor, e.currentTarget.value)}} class="pattern-name mt-5 mb-5" />
                    <TagFilter handlerUpdate={(tags) => {update(setTags, tags)}}/>
                </div>
            </div>
            <div className="submit" onClick={submit}>Add</div>
        </div>
    )
}

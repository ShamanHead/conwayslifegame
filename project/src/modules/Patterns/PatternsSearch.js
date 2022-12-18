import {
    React,
    useState,
    useEffect,
    useRef
} from "react";
import PatternItem from "./PatternItem"
import { Outlet, Link, NavLink } from "react-router-dom";

export default function PatternsSearch() {

    let result = [];
   
    const [dialog, setDialog] = useState("close");
    const [tagList, setTagList] = useState(null);
    const [patternList, setPatternList] = useState(null)

    useEffect(() => {
        fetch('http://localhost:81/tag/get')
            .then((response) => response.json())
            .then((response) => {
                let result = [];

                for(let i = 0;i < response.data.length;i++) {
                    result.push(
                        <div key={response.data[i].id}
                            class="item"
                            style={{border: "3px solid #" + response.data[i].hex}}>
                            {response.data[i].name}
                        </div>
                    );
                }
                
                setTagList(result);
            })
        
        fetch('http://localhost:81/pattern/search')
            .then((response) => response.json())
            .then((response) => {
                let result = [];

                for(let i = 0;i < response.data.length;i++) {
                    let item = response.data[i],
                        cells = JSON.parse(item.content);

                    console.log(cells);

                    result.push(
                        <PatternItem id={item.id} cells={cells} name={item.name} tags={item.tags}/>
                    );
                }
                
                setPatternList(result);

            })
    }, [])

    return (
        <div class="patterns page">
            <div className="page-article">
                <h2 className="page-article__title">Patterns</h2>
            </div>
            <div className="patterns-search">
                <input type="" placeholder="Search" />
                <Link className="patterns-search__button" to="/patterns/add">New</Link>
            </div>
            <div className="patterns-tags">
                {tagList}
            </div>
            <div className="patterns-list">
                {patternList} 
            </div>
        </div>
    )
}

import React from "react";
import PatternItem from "./PatternItem"
import {cells} from '../testCells';

export default function PatternsSearch() {

    let result = [];

    for(let i = 0;i < 20;i++){ 
        result.push([<PatternItem cells={cells} name="Glide" tags="Such"/>]) 
    }

    return (
        <div class="patterns page">
            <div className="page-article">
                <h2 className="page-article__title">Patterns</h2>
            </div>
            <div className="patterns-search">
                <input type="" placeholder="Search" />
            </div>
            <div className="patterns-list">
                {result} 
            </div>
        </div>
    )
}

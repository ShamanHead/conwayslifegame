import StaticCanvas from "../StaticCanvas"

export default function PatternItem (props) {
    return (
        <div className="patterns-list-item">
            <StaticCanvas cells={props.cells}/>
            <span className="patterns-list-item__name">{props.name}</span>
            <div className="patterns-list-item__tags">{props.tags}</div>
            <div className="patterns-list-item__button">Open</div>
        </div>
    )
}

import React from 'react'
import { HexColorPicker } from "react-colorful";

export default class ColorPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isClicked : false
        }
    }

    handleClick() {
        this.setState({isClicked : !this.state.isClicked}) 
    }

    render() {
        return (
            <div>
                <button onClick={() => {this.handleClick()}}>{this.props.label}</button>
                {this.state.isClicked === true && <HexColorPicker onChange={(e) => {this.props.onChange(e, this.props.type)}}/>}
            </div>
        )
    }
}

import React from 'react'
import ColorPicker from './ColorPicker'
import VolumeSlider from './VolumeSlider'
import { HexColorPicker } from "react-colorful";

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
       
        this.state = this.props.startupSettings 

        this.componentRefs = {widthSet: React.createRef(), 
                              heightSet: React.createRef(), 
                              colorSet: React.createRef(), 
                              borderOnSet: React.createRef(),
                              borderColorSet: React.createRef()
        }
    }

    handleChange(e) {
        this.setState({
            [e.nativeEvent.target.name] : 
                e.nativeEvent.target.type === "checkbox" ?
                e.nativeEvent.target.checked : e.nativeEvent.target.value
        })
    }

    handleInnerChange(e, type) {
        this.setState({[type]: e})
        console.log(this.state)
    }

    render() {
        return (
            <>
                <div className="menu">
                    <button onClick = {() => {this.props.setCanvasState("start")}}>Старт</button>
                    <button onClick = {() => {this.props.setCanvasState("stop")}}>Стоп</button>
                    <button onClick = {() => {this.props.setCanvasState("clear")}}>Очистить</button>
                    <button onClick = {() => {this.props.setCanvasState("soup")}}>Супчек</button>
                    <span className="generationCount">{this.props.generationCount}</span>
                </div>
                <div className="settings">
                    <div className="settings-part"> 
                        <div>Ширина</div>
                        <div>
                            {this.state.widthSet}
                            <VolumeSlider min="100" start={this.state.widthSet} width="200" type="widthSet" max="2000" color={this.state.colorSet} onChange={this.handleInnerChange.bind(this)}/>
                        </div>
                    </div>
                    <div className="settings-part"> 
                        <div>Высота</div>
                        <div>
                            {this.state.heightSet}
                            <VolumeSlider min="100" start={this.state.heightSet} width="200" type="heightSet" max="2000" color={this.state.colorSet} onChange={this.handleInnerChange.bind(this)}/>
                        </div>
                    </div>
                    <div className="settings-part">
                        <div>Граница</div>
                        <div>
                            <input type="checkbox" id="borderOn" name="borderOnSet" onChange = {(e) => {this.handleChange(e)}}/>
                        </div>
                    </div>
                    <div className="settings-part">
                        <div>Цвет границы</div>
                        <div>
                            <HexColorPicker color={this.state.borderColorSet} onChange={(e) => {this.handleInnerChange(e, "borderColorSet")}}/>
                        </div>
                    </div>
                    <div className="settings-part">
                        <div>Цвет клетки</div>
                        <div>
                            <HexColorPicker color={this.state.colorSet} onChange={(e) => {this.handleInnerChange(e, "colorSet")}}/>
                        </div>
                    </div>
                    <div></div>
                    <div>
                        <button class="disabled-button"
                                type="submit" 
                                onClick={() => 
                                            {this.props.setSettingsState(this.state)}}
                            style={{backgroundColor: "inherit",
                                    fontSize: "1.1em",
                                    color: this.state.colorSet,
                                    border: `5px solid ${this.state.colorSet}`}}>
                            Отправить
                        </button>
                    </div>
                </div>
            </>
        )
    }
}

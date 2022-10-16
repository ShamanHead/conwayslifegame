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
        this.setState({[ e.currentTarget.getAttribute('changeType')]:e.currentTarget.value }) 
    }

    render() {
        return (
            <>
                <div className="flex w-3/5 mt-2 justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick = {() => {this.props.setCanvasState("start")}}>Старт</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick = {() => {this.props.setCanvasState("stop")}}>Стоп</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick = {() => {this.props.setCanvasState("clear")}}>Очистить</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick = {() => {this.props.setCanvasState("soup")}}>Супчек</button>
                    <span className="generationCount">{this.props.generationCount}</span>
                </div>
                <div className="flex flex-col w-2/3 items-center">
                    <div className="flex w-full flex-row mt-10 justify-between"> 
                        <div>Ширина</div>
                        <div>
                            {this.state.widthSet}
                            <input
                                type="range"
                                className="
                                  form-range
                                  appearance-none
                                  w-full
                                  h-6
                                  p-0
                                  bg-transparent
                                  focus:outline-none focus:ring-0 focus:shadow-none
                                "
                                id="customRange1"
                                min="10"
                                max="2000"
                                step="10"
                                changetype="widthSet"
                                onChange={this.handleInnerChange.bind(this)}
                            /> 
                        </div>
                    </div>
                    <div className="flex w-full flex-row mt-10 justify-between"> 
                        <div>Высота</div>
                        <div>
                            {this.state.heightSet}
                            <input
                                type="range"
                                className="
                                  form-range
                                  appearance-none
                                  w-full
                                  h-6
                                  p-0
                                  bg-transparent
                                  focus:outline-none focus:ring-0 focus:shadow-none
                                "
                                id="customRange1"
                                min="10"
                                max="2000"
                                step="10"
                                changetype="heightSet"
                                onChange={this.handleInnerChange.bind(this)}
                            /> 

                        </div>
                    </div>
                    <div className="flex w-full flex-row mt-10 justify-between">
                        <div>Граница</div>
                        <div>
                            <input type="checkbox" id="borderOn" name="borderOnSet" onChange = {(e) => {this.handleChange(e)}}/>
                        </div>
                    </div>
                    <div className="flex w-full flex-row mt-10 justify-between">
                        <div>Цвет границы</div>
                        <div>
                            <HexColorPicker color={this.state.borderColorSet} onChange={(e) => {this.handleInnerChange(e, "borderColorSet")}}/>
                        </div>
                    </div>
                    <div className="flex w-full flex-row mt-10 justify-between">
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

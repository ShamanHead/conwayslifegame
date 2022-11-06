import React from 'react'
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

        this.buttons = 
            [
                {name: "start", displayName: "Старт"},
                {name: "stop", displayName: "Стоп"},
                {name: "clear", displayName: "Очистить"},
                {name: "soup", displayName: "Сгенерировать"}
            ];
    }

    handleChange(e) {
        this.setState({
            [e.nativeEvent.target.name] : 
                e.nativeEvent.target.type === "checkbox" ?
                e.nativeEvent.target.checked : e.nativeEvent.target.value
        })
    }

    handleInnerChange(e, type) {
        if(type) {
            this.setState({[type]: e}); 
        } else this.setState(
            {
                [ e.currentTarget.getAttribute('changeType')] : e.currentTarget.value 
            }
        ); 
    }

    render() {
        let buttons = this.buttons.map((el, index) => {
            return [<button className="bg-blue-500 mt-7 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick = {() => {this.props.setCanvasState(el.name)}}>
                {el.displayName}</button>
];
        })

        return (
            <>
                <div className="flex flex-wrap flex-col items-center md:w-3/6">
                    <div className="flex flex-col md:flex-row justify-between w-full">
                        {buttons}
                    </div>                    
                    <span className="generationCount">{this.props.generationCount}</span>
                </div>
                <div className="flex max-w-4xl w-full md:w-1/2 flex-col items-center">
                    <div className="flex w-full flex-col items-center md:flex-row mt-10 justify-between"> 
                        <div>Ширина</div>
                        <div className="w-2/3 flex flex-col items-center md:items-baseline md:w-1/2 md:max-w-xs">
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
                    <div className="flex w-full flex-col items-center md:flex-row mt-10 justify-between"> 
                        <div>Высота</div>
                        <div className="w-2/3 flex flex-col items-center md:items-baseline md:w-1/2 md:max-w-xs">
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
                    <div className="flex w-full flex-col items-center md:flex-row mt-10 justify-between">
                        <div>Граница</div>
                        <div>
                            <input type="checkbox" id="borderOn" className="form-input" name="borderOnSet" onChange = {(e) => {this.handleChange(e)}}/>
                        </div>
                    </div>
                    <div className="flex w-full flex-col items-center md:flex-row mt-10 justify-between">
                        <div>Цвет границы</div>
                        <div>
                            <HexColorPicker color={this.state.borderColorSet} onChange={(e) => {this.handleInnerChange(e, "borderColorSet")}}/>
                        </div>
                    </div>
                    <div className="flex w-full flex-col items-center md:flex-row mt-10 justify-between">
                        <div>Цвет клетки</div>
                        <div>
                            <HexColorPicker color={this.state.colorSet} onChange={(e) => {this.handleInnerChange(e, "colorSet")}}/>
                        </div>
                    </div>
                    <div></div>
                    <div>
                        <button className="disabled-button"
                                type="submit" 
                                onClick={() => 
                                            {this.props.setSettingsState(this.state)}}
                            style={{backgroundColor: "inherit",
                                    fontSize: "1.1em",
                                    color: this.state.colorSet,
                                    border: `5px solid ${this.state.colorSet}`}}>
                            Применить 
                        </button>
                    </div>
                </div>
            </>
        )
    }
}

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
                {
                    name: "start",
                    displayName: "Старт",
                    icon: [<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>]
                },
                {
                    name: "stop",
                    displayName: "Стоп",
                    icon: [<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"></path></svg>]
                },
                {
                    name: "clear",
                    displayName: "Очистить",
                    icon: [<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>]
                },
                {
                    name: "soup",
                    displayName: "Сгенерировать",
                    icon: [<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>]
                }
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
        let buttons = this.buttons.map((el) => {
            return [<div class="button-icon" onClick = {() => {this.props.setCanvasState(el.name)}}>{el.icon}</div>]
        })

        return (
            <>
                <div className="flex flex-wrap flex-col items-center md:w-3/6">
                    <div className="flex w-52 justify-between">
                        {buttons}
                    </div>                    
                    <span className="generationCount">{this.props.generationCount}</span>
                </div>
                <div className="flex max-w-4xl w-full md:w-1/2 flex-col items-center">
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

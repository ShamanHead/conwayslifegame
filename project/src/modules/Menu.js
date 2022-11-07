import React from 'react'

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
                    icon: [<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>]
                },
                {
                    name: "stop",
                    icon: [<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"></path></svg>]
                },
                {
                    name: "clear",
                    icon: [<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>]
                },
                {
                    name: "soup",
                    icon: [<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>]
                },
                {
                    name: "",
                    icon: [<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>]
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
            return [<div className="button-icon" onClick = {() => {this.props.setCanvasState(el.name)}}>{el.icon}</div>]
        })

        return (
            <div className="mt-7 w-full flex flex-col items-center">
                <div className="flex flex-wrap flex-col items-center md:w-3/6">
                    <div className="flex w-52 justify-between">
                        {buttons}
                    </div>                    
                    <span className="generationCount">{this.props.generationCount}</span>
                </div>
            </div>
        )
    }
}

import React from 'react';
import Menu from './Menu';
import Canvas from './Canvas';

/**
 * Main App class. 
 * @extends React.Component
 */
export default class CanvasMenu extends React.Component {

    constructor(props) {
        super(props);

        this.state = ({
            updateCanvas : "",
            onUpdateCanvas: "",
            generationCount: 0,
            settingsCanvas: {
                widthSet: 1000,
                heightSet: 500,
                colorSet: "#add8e6",
                borderOnSet: false,
                borderColorSet: "#000"
            }
        })
       
        this.setSettingsState = this.setSettingsState.bind(this);
        this.updateGenerationCount = this.updateGenerationCount.bind(this);
        this.setOnUpdate = this.setOnUpdate.bind(this);
        this.setCanvasState = this.setCanvasState.bind(this);
    }

    updateGenerationCount(count) {
        this.setState({
            generationCount: count
        })
    }

    setCanvasState( state ) {
        this.setState({
            updateCanvas: state
        })

        this.state.onUpdateCanvas(state);
    }

    setOnUpdate( onUpdateState, onUpdateSettings ) {
        this.setState({
            onUpdateCanvas: onUpdateState,
            onUpdateSettings: onUpdateSettings
        })
    }

    setSettingsState(state) {
        this.setState({
            settingsCanvas: state
        })

        this.state.onUpdateSettings(state);
    }

    render() {
        return (
            <div className="canvas-menu w-full flex items-center flex-col">
                <Canvas setOnUpdate={this.setOnUpdate}
                        canvasState={this.state.updateCanvas}
                        updateGenerationCount={this.updateGenerationCount}
                        startupSettings={this.state.settingsCanvas}
                />
                <Menu setCanvasState={this.setCanvasState}
                      generationCount={this.state.generationCount}
                      setSettingsState={this.setSettingsState}
                      startupSettings={this.state.settingsCanvas}  
                /> 
            </div>
        )
    }
}
    

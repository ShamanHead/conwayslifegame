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
                widthSet: 1512, //TODO: Auto height/width based on monitor properties
                heightSet: 759,
                colorSet: "#F5DDDD",
                borderOnSet: false,
                borderColorSet: "#000"
            }
        })
       
        this.setSettingsState = this.setSettingsState.bind(this);
        this.updateGenerationCount = this.updateGenerationCount.bind(this);
        this.setOnUpdate = this.setOnUpdate.bind(this);
        this.setCanvasState = this.setCanvasState.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions.bind(this));
    }

    updateGenerationCount(count) {
        this.setState({
            generationCount: count
        })
    }
    
    updateDimensions() {
        let mutateSetting = this.state.settingsCanvas

        mutateSetting.widthSet = window.innerWidth - (window.innerWidth / 100 * 20);
        mutateSetting.heightSet = window.innerHeight - (window.innerHeight / 100 * 30);

        this.setSettingsState(mutateSetting)
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
    

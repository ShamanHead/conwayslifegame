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

        let [width, height] = this.getDimensions();

        this.state = ({
            updateCanvas : "",
            onUpdateCanvas: "",
            generationCount: 0,
            settingsCanvas: {
                widthSet: width, 
                heightSet: height,
                colorSet: "rgba(245,221,221)",
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
   
    getDimensions() {
        return (
            [
                window.innerWidth - (window.innerWidth / 100 * 30),
                window.innerHeight - (window.innerHeight / 100 * 30)
            ]
        )
    }

    updateDimensions() {
        let mutateSetting = this.state.settingsCanvas,
            [width, height] = this.getDimensions()

        mutateSetting.widthSet = width;
        mutateSetting.heightSet = height;

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
            <div className="canvas-menu flex mt-5 items-center flex-col">
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
    

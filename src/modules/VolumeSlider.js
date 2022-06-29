import React from 'react'

export default class VolumeSlider extends React.Component {
    constructor(props) {
        super(props)

        this.state = { width: 0, editable: false }
    }

    mouseDownUp() {
        this.setState({editable: !this.state.editable})
    }

    mouseMove(e) {
        if(e.nativeEvent.offsetX > this.props.width || 
           e.nativeEvent.offsetX < 0 ||
           this.state.editable === false) { 
            this.setState({editable: false})
            return 0;
        }
        console.log(e.nativeEvent.offsetX);
        this.setState({
            width: e.nativeEvent.offsetX
        })

        this.props.onChange((parseInt(this.props.max)) / 100 * (e.nativeEvent.offsetX / (this.props.width / 100 * 1)), this.props.type);
    }

    render() {
        return (
            <div style= {{border: `2px solid ${this.props.color}`,
                width: `${this.props.width}px`, height: "20px",
                borderRadius: "2px"}}
                onMouseDown= {() => {this.mouseDownUp()}}
                onMouseUp={() => {this.mouseDownUp()}}
                onMouseMove={(e) => {this.mouseMove(e)}}
            >
                <div style={{width: this.state.width, backgroundColor: this.props.color, height: "100%"}}>
                
              </div>  
            </div>
        )
    }

}


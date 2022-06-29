import React from 'react';

export default class Canvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            settings: this.props.startupSettings, 
            interval: null
        }

        this.lastMouseCords = [0, 0];
        
        this.root = React.createRef();
    }         

    componentDidMount() { 
        this.sizes = {width: 10, height: 10};
        this.setState({screen: {width: this.state.settings.widthSet / this.sizes.width, height: this.state.settings.heightSet / this.sizes.height}})
        this.mode = 0;
        this.interval = null;
        this.generationCount = 0;
        this.drawGeneration = false;

        this.cells = {active: [], toAdd: [], toDelete: [], activeTest: []};

        let screen = {width: this.state.settings.widthSet / this.sizes.width, height: this.state.settings.heightSet / this.sizes.height}; 

        for(let y = 0;y < screen.height;y++) {
            this.cells.active[y] = [];
            
            for(let x = 0;x < screen.width;x++) {
                this.cells.active[y][x] = 0;
            }
        }
        this.context = this.root.current.getContext("2d"); 

        this.props.setOnUpdate(this.onUpdateState.bind(this), this.onUpdateSettings.bind(this));

        this.draw();

    }

    onUpdateSettings(settings) {
        this.setState({settings: settings, screen: {width: settings.widthSet / this.sizes.width, height: settings.heightSet / this.sizes.height}}, () => {this.clearCells()});
    }

    onUpdateState(props) {
        switch(props) {
            case "start" :
                this.startUpdating();
                break;
            case "stop" :
                this.stopUpdating();
                break;
            case "clear" :
                this.clearCells();
                this.props.updateGenerationCount(0);
                this.generationCount = 0;
                this.stopUpdating();
                break;
            case "soup":
                this.clearCells();
                this.soup();
                break;
        }
    }

    clearCells() {
        this.cells = {active: [], toAdd: [], toDelete: [], activeTest: []};

        for(let y = 0;y < this.state.screen.height;y++) {
            this.cells.active[y] = [];
            
            for(let x = 0;x < this.state.screen.width;x++) {
                this.cells.active[y][x] = 0;
            }
        }

        this.clear();
        this.draw(); 
    }

    soup() {
        for(let y = 0;y < this.state.screen.height;y++) { 
            for(let x = 0;x < this.state.screen.width;x++) {
                if(Math.floor(Math.random() * 2) === 1) {
                   this.cells.active[x][y] = 1;
                   this.cells.activeTest.push([x,y])
                }
            }
        }

        this.clear();
        this.draw(); 
 
    }

    mouseUp(e) {
       this.drawGeneration = false; 
       this.lastMouseCords = [0, 0];
    }

    mouseMove(e) {
        let x = e.nativeEvent.offsetX, y = e.nativeEvent.offsetY,
            pos = [Math.floor( (y - 1) / this.sizes.height), 
                   Math.floor( (x - 1 ) / this.sizes.width)]; 

        if(this.drawGeneration === true && (
            pos[0] !== this.lastMouseCords[0] || pos[1] !== this.lastMouseCords[1]) ) {
            this.lastMouseCords = pos;
            this.clear(this.context, this.root.current);
            this.update(x, y);
            this.draw();
        }
    }

    mouseDown(e) {
        let x = e.nativeEvent.offsetX, y = e.nativeEvent.offsetY,
            pos = [Math.floor( (y - 1) / this.sizes.height), 
                   Math.floor( (x - 1 ) / this.sizes.width)]; 
        this.lastMouseCords = [pos[0], pos[1]];
        this.drawGeneration = true; 
        this.clear(this.context, this.root.current); 
        this.update(x, y);
        this.draw();
    }

    startUpdating() {
        if(this.mode === 1) return 0;
        this.mode = 1;

        this.setState({
            interval: setInterval(() => {this.cycle()}, 0)   
        })
        
        //this.cycle();

    }

    stopUpdating() {
        if(this.mode === 0) return 0;
        this.mode = 0;

        clearInterval(this.state.interval);

        this.setState({
            interval: null
        }) 
    }

    update(x, y) {
        let pos = [Math.floor( (y - 1) / this.sizes.height), Math.floor( (x - 1 ) / this.sizes.width)]; 

        this.onCell(pos);
    }

    onCell(pos) {
        let found = false;
        for(let i = 0; i < this.cells.activeTest.length;i++) {
            let current = this.cells.activeTest[i];
            if(current[0] === pos[0] && current[1] === pos[1]) {
                found = i;
                break;
            }

        }

        if( found === false ) {
            this.cells.active[pos[0]][pos[1]] = 1;
            this.cells.activeTest.push([pos[0], pos[1]]);
        } else {
            this.cells.active[pos[0]][pos[1]] = 0;
            this.cells.activeTest.splice(found, 1);
        }

        //this.cells.active[pos[0]][pos[1]] = this.cells.active[pos[0]][pos[1]] === 1 ? 0 : 1; 
    }

    cycle() {
        //console.log(this.cells.activeTest);
        this.cells.activeTest = [];
        this.generationCount++;
        if(this.generationCount % 5 === 0) {
            this.props.updateGenerationCount(this.generationCount);
        }
        for(let y = 0; y < this.state.screen.width;y++) {
            for(let x = 0;x < this.state.screen.height;x++) {
                let curCell = this.cells.active[x][y],
                    left = x - 1, right = x + 1, top = y - 1, bottom = y + 1,
                    nbrs = 0;

                if(left < 0) {
                    left = 0;
                }
                if(right >= this.cells.active.length) {
                    right = this.cells.active.length - 1;
                }
                if(top < 0) {
                    top = 0;
                }
                if(bottom >= this.cells.active[x].length) {
                    bottom = this.cells.active[x].length - 1;
                }

                for(let y1 = top; y1 <= bottom; y1++) {
                    for(let x1 = left; x1 <= right; x1++) {
                        if(x1 === x && y1 === y) continue;

                        if(this.cells.active[x1][y1] === 1) {
                            nbrs++;
                            //console.log({x1: x1, y1: y1, x: x, y: y, left: left, right: right, top: top, bottom: bottom, nbrs: nbrs});
                            //console.log([left, right, top, bottom]);
                        }
                    }
                }

                if(( this.cells.active[x][y] === 1 && (nbrs === 3 || nbrs === 2) ) || (nbrs === 3 && this.cells.active[x][y] === 0)) this.cells.activeTest.push([x, y])

                if(nbrs === 3) this.cells.toAdd.push([x, y]); 
                if((nbrs < 2 || nbrs > 3) && this.cells.active[x][y] === 1) this.cells.toDelete.push([x, y]); 
            }
        } 

            //console.log(nbrs);

            //if(nbrs === 3) this.cells.toAdd.push([x, y]);
            //if((nbrs < 2 || nbrs > 3)) this.cells.toDelete.push([y, x]);
 

        //console.log(this.cells.toDelete);

        for(let i = 0; i < this.cells.toDelete.length;i++) {
            let current = this.cells.toDelete[i];

            this.cells.active[current[0]][current[1]] = 0;
        }

        for(let i = 0; i < this.cells.toAdd.length;i++) {
            let current = this.cells.toAdd[i];

            this.cells.active[current[0]][current[1]] = 1;
        }

        this.cells.toAdd = [];
        this.cells.toDelete = [];

        this.clear();
        this.draw();
    }

    draw() {
        this.context.fillStyle = this.state.settings.colorSet;
        this.context.linewidth = "1";
        this.context.strokeStyle = this.state.settings.borderColorSet;
         
        let x = 0, y = 0, cellX = 0, cellY = 0; 

        if(this.state.settings.borderOnSet === true){
            this.context.beginPath()

            for(let y1 = this.sizes.width; y1 < this.state.settings.widthSet;y1+=this.sizes.width) { 
                    this.context.moveTo(y1, 0);
                    this.context.lineTo(y1, this.state.settings.heightSet)  
            }

            for(let x1 = this.sizes.height; x1 < this.state.settings.heightSet;x1+=this.sizes.width) { 
                    this.context.moveTo(0, x1);
                    this.context.lineTo(this.state.settings.widthSet, x1)  
            }

            this.context.stroke();
        }

        // while(x != this.state.settings.widthSet && y != this.state.settings.heightSet) {
        //     this.context.beginPath();
        //     if(this.cells.active[cellY][cellX] === 1) {
        //         this.context.fillRect(x, y, this.sizes.width, this.sizes.height);
        //     }
        //     this.context.stroke();
        //     x += this.sizes.width;
        //     cellX += 1;
        //     if(x == this.state.settings.widthSet && y != this.state.settings.heightSet) {
        //         x = 0;
        //         y += this.sizes.height;
        //         cellX = 0;
        //         cellY += 1;
        //     } 
        // }
        //

        this.context.beginPath();


        for(let i = 0;i < this.cells.activeTest.length;i++) {
           let current = this.cells.activeTest[i];
           this.context.fillRect(current[1] * this.sizes.width, current[0] * this.sizes.height, this.sizes.width, this.sizes.height); 
        }

        this.context.stroke();
    }

    clear() {
        this.context.clearRect(0, 0, this.state.settings.widthSet, this.state.settings.heightSet);
    } 

    render() {
        //console.log(this.context);
        if(typeof this.root.current !== "undefined" && this.root.current !== null) this.context = this.root.current.getContext("2d");
        
        return (
            <canvas id="canvas" 
                    width={this.state.settings.widthSet} 
                    height={this.state.settings.heightSet}
                    ref={this.root}
                    onMouseUp = {(e) => {this.mouseUp(e)}}
                    onMouseMove = {(e) => {this.mouseMove(e)}}
                    onMouseDown = {(e) => {this.mouseDown(e)}}/>
        );
    }

}


class Engine {
    
    constructor(root, start, stop) {
        this.root = document.getElementById(root);
        this.context = this.root.getContext("2d");
        this.cells = [];
        this.sizes = {width: 10, height: 10};
        this.screen = {width: this.root.width / this.sizes.width, height: this.root.height / this.sizes.height};
        this.mode = 0;
        this.interval = null;
        this.generationCount = 0;

        this.context.fillStyle = "black";

        this.cells = {active: [], toAdd: [], toDelete: []};

        for(let y = 0;y < this.screen.height;y++) {
            this.cells.active[y] = [];
            
            for(let x = 0;x < this.screen.width;x++) {
                this.cells.active[y][x] = 0;
            }
        }

        this.draw();

        document.getElementById(start).addEventListener("click", () => {
            this.mode = 1;

            this.interval = setInterval(() => {this.cycle()}, 0);
            //this.cycle();
        });
        document.getElementById(stop).addEventListener("click", () => {
            this.mode = 0;

            clearInterval(this.interval);
        })

        this.root.addEventListener("mousedown", (e) => {
            this.drawGeneration = true;
            this.clear(this.context, root);
            this.update(e.offsetX, e.offsetY);
            this.draw();
        });

        this.root.addEventListener("mouseup", (e) => {
            this.drawGeneration = false;
        })

        this.root.addEventListener("mousemove", (e) => {
            if(this.drawGeneration === true) {
                this.clear(this.context, root);
                this.update(e.offsetX, e.offsetY);
                this.draw();
            }
        }) 
    }

    update(x, y) {
        let pos = [Math.floor( (x - 1) / this.sizes.width), Math.floor( (y - 1 ) / this.sizes.height)]; 

        this.onCell(pos);
        //console.log((x / (this.sizes.width)));
    }

    onCell(pos) {
        this.cells.active[pos[0]][pos[1]] = this.cells.active[pos[0]][pos[1]] === 1 ? 0 : 1;
       // console.log(this.cells.active);
    }

    cycle() {
        //console.log("da");
        this.generationCount++;
        document.getElementsByClassName("generationCount")[0].innerHTML = this.generationCount;
        for(let y = 0; y < this.screen.height;y++) {
            for(let x = 0;x < this.screen.width;x++) {
                let curCell = this.cells.active[y][x],
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

                //console.log(this.cells[x].length);

                //console.log([left, right, bottom, top]);

                for(let y1 = top; y1 <= bottom; y1++) {
                    for(let x1 = left; x1 <= right; x1++) {
                        if(x1 === x && y1 === y) continue;

                        //typeof this.cells[x1][y1] == 'undefined' ? console.log
                        //([this.cells[x1][y1], x1, y1, left, right, this.cells[x].length]) : null;
                       //console.log({x1: x1, y1: y1, x: x, y: y, left: left, right: right, top: top, bottom: bottom, nbrs: nbrs});     
                        //console.log(changed);

                        if(this.cells.active[x1][y1] === 1) {
                            nbrs++;
                            //console.log({x1: x1, y1: y1, x: x, y: y, left: left, right: right, top: top, bottom: bottom, nbrs: nbrs});
                            //console.log([left, right, top, bottom]);
                        }
                    }
                }

                if(nbrs === 3) this.cells.toAdd.push([x, y]);
                if((nbrs < 2 || nbrs > 3) && this.cells.active[x][y] === 1) this.cells.toDelete.push([x, y]);

                if(nbrs > 0) {
                    //console.log(nbrs);
                    // console.log([left, right, top, bottom]);
                }
            }
        } 

        for(let i = 0; i < this.cells.toDelete.length;i++) {
            let current = this.cells.toDelete[i];

            this.cells.active[current[0]][current[1]] = 0;
        }

        for(let i = 0; i < this.cells.toAdd.length;i++) {
            let current = this.cells.toAdd[i];

            this.cells.active[current[0]][current[1]] = 1;
        }

        //console.log(this.cells.toDelete);    
        //console.log(this.cells.toAdd)

        this.cells.toAdd = [];
        this.cells.toDelete = [];

        this.clear();
        this.draw();
    }

    draw() {
        let x = 0, y = 0, cellX = 0, cellY = 0;

        //console.log(this.cells.active);

         while(x != this.root.width && y != this.root.height) {
             this.context.beginPath();
             this.context.linewidth = "1";
             this.context.strokeStyle = "black";
             //this.context.fillStyle = "yellow"
             if(this.cells.active[cellX][cellY] === 1) {
                 this.context.fillRect(x, y, this.sizes.width, this.sizes.height);
             } else {
                 this.context.rect(x,y, this.sizes.width, this.sizes.height);
             }
             this.context.stroke();
             x += 10;
             cellX += 1;
             if(x == this.root.width && y != this.root.height) {
                 x = 0;
                 y += 10;
                 cellX = 0;
                 cellY += 1;
             } 
         }
    }

    clear() {
        this.context.clearRect(0, 0, this.root.width, this.root.height);
    }

}

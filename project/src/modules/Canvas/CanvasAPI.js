/**
 * Toggle cell on coordinates
 *
 * @param {array} Pos - Cords array (x, y)
 * @param {array} Cells - Cells array
 * @returns {array} Updated cells array
 */
export const onCell = (pos, cells) => {
    let found = false;
    for(let i = 0; i < cells.toRender.length;i++) {
        let current = cells.toRender[i];
        if(current[0] === pos[0] && current[1] === pos[1]) {
            found = i;
            break;
        }

    }

    if( found === false ) {
        cells.active[pos[0]][pos[1]] = 1;
        cells.toRender.push([pos[0], pos[1]]);
    } else {
        cells.active[pos[0]][pos[1]] = 0;
        cells.toRender.splice(found, 1);
    }

    return cells;
}

/**
 * Clears cells array
 *
 * @param {state} screen - Screen settings state
 * @returns {array} Updated cells array
 */
export const clearCells = (screen) => {
    let temp = {active: [], toAdd: [], toDelete: [], toRender: []};

    for(let y = 0;y < screen.height;y++) {
        temp.active[y] = [];
        
        for(let x = 0;x < screen.width;x++) {
            temp.active[y][x] = 0;
        }
    }

    return temp;
}

export const normalize = (cells, screen) => {
    let resultSet = [],
        toRender = [],
        currentHeight = cells.active.length,
        currentWidth = cells.active[0].length

    console.log(screen);

    if(currentHeight < screen.height) {
        let heightPoint = Math.round((screen.height - currentHeight) / 2),
            widthPoint = Math.round((screen.width - currentWidth) / 2),
            higherHeightPoint = screen.height - heightPoint,
            higherWidthPoint = screen.width - widthPoint;

        for(let i = 0;i < heightPoint;i++) {
            resultSet[i] = [];

            for(let j = 0; j < screen.width;j++) {
                resultSet[i][j] = 0;
            }
        }


        for(let i = heightPoint;i < higherHeightPoint;i++) {
            resultSet[i] = [];

            for(let j = 0; j < widthPoint;j++) {
                resultSet[i][j] = 0;
            }

            for(let j = widthPoint; j < higherWidthPoint;j++) {
                if(cells.active[i - heightPoint][j - widthPoint] === 1) {
                    resultSet[i][j] = 1;
                    toRender.push([i, j])
                } else {
                    resultSet[i][j] = 0;
                }
            }

            for(let j = higherWidthPoint; j < screen.width;j++) {
                resultSet[i][j] = 0;
            }
        }

        for(let i = higherHeightPoint;i < screen.height;i++) {
            resultSet[i] = [];

            for(let j = 0; j < screen.width;j++) {
                resultSet[i][j] = 0;
            }
        }
    }

    console.log(resultSet);

    cells.active = resultSet;
    cells.toRender = toRender;

    return cells;
}

/**
 * Calculates new generation
 *
 * @param {array} cells - Cells array
 * @param {ref} generationCount - generation count ref
 * @param {state} screen - Screen settings state
 * @param {props} props - Props from parent component
 * @returns {int} Updated generation count
 */
export const cycle = (cells, generationCount, screen, props) => {
    let temp = cells;
    temp.toRender = [];
    generationCount++;

    if(generationCount % 5 === 0) {
        props.updateGenerationCount(generationCount);
    }

    for(let y = 0; y < screen.width;y++) {
        for(let x = 0;x < screen.height;x++) {
            let left = x - 1, right = x + 1, top = y - 1, bottom = y + 1,
                nbrs = 0;

            if(left < 0) {
                left = 0;
            }
            if(right >= temp.active.length) {
                right = temp.active.length - 1;
            }
            if(top < 0) {
                top = 0;
            }
            if(bottom >= temp.active[x].length) {
                bottom = temp.active[x].length - 1;
            }

            for(let y1 = top; y1 <= bottom; y1++) {
                for(let x1 = left; x1 <= right; x1++) {
                    if(x1 === x && y1 === y) continue;

                    if(temp.active[x1][y1] === 1) {
                        nbrs++;
                    }
                }
            }

            if(
                ( temp.active[x][y] === 1 && (nbrs === 3 || nbrs === 2) ) || 
                (nbrs === 3 && temp.active[x][y] === 0)
            ) {
                temp.toRender.push([x, y])
            }

            if(nbrs === 3) temp.toAdd.push([x, y]); 
            if((nbrs < 2 || nbrs > 3) && temp.active[x][y] === 1) temp.toDelete.push([x, y]); 
        }
    } 

    for(let i = 0; i < temp.toDelete.length;i++) {
        let current = temp.toDelete[i];

        temp.active[current[0]][current[1]] = 0;
    }

    for(let i = 0; i < temp.toAdd.length;i++) {
        let current = temp.toAdd[i];

        temp.active[current[0]][current[1]] = 1;
    }

    temp.toAdd = [];
    temp.toDelete = [];
        
    return generationCount;
}

/**
 * Draw's generation on canvas
 *
 * @param {ref} contextRef
 * @param {ref} cellsRef 
 * @param {state} settings
 */
export const draw = (contextRef, cellsRef, settings) => {
        contextRef.current.fillStyle = settings.colorSet;
        contextRef.current.linewidth = "1";
        contextRef.current.strokeStyle = settings.borderColorSet;
         
        if(settings.borderOnSet === true){
            contextRef.current.beginPath()
    
            for(let y1 = settings.sizeSet.width; 
                y1 < settings.widthSet;
                y1+=settings.sizeSet.width) { 
                    contextRef.current.moveTo(y1, 0);
                    contextRef.current.lineTo(y1, settings.heightSet)  
            }
    
            for(let x1 = settings.sizeSet.height; 
                x1 < settings.heightSet;
                x1 += settings.sizeSet.width) { 
                    contextRef.current.moveTo(0, x1);
                    contextRef.current.lineTo(settings.widthSet, x1)  
            }
    
            contextRef.current.stroke();
        }
    
        contextRef.current.beginPath();
    
        for(let i = 0;i < cellsRef.current.toRender.length;i++) {
           let current = cellsRef.current.toRender[i];
           contextRef.current.fillRect(
               current[1] * settings.sizeSet.width, 
               current[0] * settings.sizeSet.height, 
               settings.sizeSet.width, 
               settings.sizeSet.height); 
        }
    
        contextRef.current.stroke();
    } 

/**
 * Clears canvas
 *
 * @param {ref} contextRef
 * @param {state} settings
 */
export const clear = (contextRef, settings) => {
    contextRef.current.clearRect(0, 0, settings.widthSet, settings.heightSet);
} 

/**
 * Returns cell position on canvas based on mouse cords
 *
 * @param {int} x
 * @param {int} y
 * @param {state} settings
 * @returns {array} Position array
 */
export const getPosition = (x, y, settings) => {
    let pos = [Math.floor( (y - 1) / settings.sizeSet.height), 
               Math.floor( (x - 1 ) / settings.sizeSet.width)]; 

    return pos; 
}
    
/**
 * Generates generation based on random
 *
 * @param {ref} cellsRef
 * @param {state} screen
 */
export const soup = (cellsRef, screen) => {
    let temp = {active: [], toAdd: [], toDelete: [], toRender: []};

    for(let y = 0;y < screen.height;y++) {
        temp.active[y] = [];
        
        for(let x = 0;x < screen.width;x++) {
            if(Math.floor(Math.random() * 2) === 1) {
               temp.active[y][x] = 1;
               temp.toRender.push([y,x])
            } else temp.active[y][x] = 0;
        }
    }

    cellsRef.current = temp;
}

export const startUpdating = (
        settings, 
        screen, 
        props, 
        contextRef, 
        cellsRef, 
        modeRef, 
        generationCountRef, 
        intervalRef, 
    redrawRef) => {

    if(modeRef.current === 1) return 0;
    modeRef.current = 1;

    generationCountRef.current = 0;

    intervalRef.current = 
        setInterval(() => 
            {
                generationCountRef.current = cycle(cellsRef.current, generationCountRef.current, screen, props)
            }, 32) 
    redrawRef.current = 
        setInterval(() => {
            clear(contextRef, settings);
            draw(contextRef, cellsRef, settings);
        }
        , 16)
}

export const stopUpdating = (modeRef, intervalRef, redrawRef) => {
    if(modeRef.current === 0) return 0;
    modeRef.current = 0;

    clearInterval(intervalRef.current);
    clearInterval(redrawRef.current);
}

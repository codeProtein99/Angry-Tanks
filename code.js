// Variables to track tank placement and movement
let lastPlacedPos = ""; // Variable to track the last placed position of the tank
let isTankPlaced = false; // Flag to check if the tank is already placed
let directions = ['NORTH', 'EAST', 'SOUTH', 'WEST']; // Direction options
let currentDirectionIndex = 0; // Current direction index
let currentRotation = 0; // Current rotation of the tank


//Function to return the grid value of the cell
let giveCoordinates = () =>{

    let cell;

    if(lastPlacedPos == 0 || lastPlacedPos == 1 || lastPlacedPos == 2 || lastPlacedPos == 3 || lastPlacedPos == 4 || lastPlacedPos == 5 ||
        lastPlacedPos == 6 || lastPlacedPos == 7 || lastPlacedPos == 8 || lastPlacedPos == 9){

            cell = document.getElementById(`box${lastPlacedPos.toString().padStart(2, '0')}`).innerText;
    }
    else{
        cell = document.getElementById(`box${lastPlacedPos}`).innerText;
    }

    console.log(lastPlacedPos,typeof(lastPlacedPos));

     
    
    let xValue = cell.slice(0,1);
    let yValue = cell.slice(1,2);

    document.getElementById(`show-report`).innerText = `Last Report: (X:${xValue},Y:${yValue},${directions[currentDirectionIndex]})`
}

// Function to reset a cell to its original state
let resetCell = (cellId) => {

    console.log("Reset cell runs");
    console.log('The cell ID receoved is',cellId);

    let cell;

    if(cellId == 0 || cellId == 1 || cellId == 2 || cellId == 3 || cellId == 4 || cellId == 5 ||
        cellId == 6 || cellId == 7 || cellId == 8 || cellId == 9){

        //if X coordinate is 0 basically
        cell = document.getElementById(`box${cellId.toString().padStart(2, '0')}`);
        console.log('This condition works');
        console.log(cell);
    }
    else{
        //So if the cell has both non-zero figures
        cell = document.getElementById(`box${cellId}`);
    }
    
    cell.style.backgroundImage = 'none';
    cell.style.border = '1px solid whitesmoke';
    cell.style.borderRadius = '5px';
    cell.style.transform = 'rotate(0deg)'; // Reset the orientation to default (original direction)
    cell.style.backgroundSize = "cover";
    cell.style.backgroundPosition = "center";
    cell.style.boxSizing = "border-box";
}

// Function to place the tank in a new cell with the same rotation
let placeTank = (cellId) => {

    console.log('The id received is',cellId,typeof(cellId));

    let cell;

    if(cellId == 0 || cellId == 1 || cellId == 2 || cellId == 3 || cellId == 4 || cellId == 5 ||
        cellId == 6 || cellId == 7 || cellId == 8 || cellId == 9){

        //if X coordinate is 0 basically
        cell = document.getElementById(`box${cellId.toString().padStart(2, '0')}`);
        console.log('This condition works');
        console.log(cell);
    }
    else{
        //So if the cell has both non-zero figures
        cell = document.getElementById(`box${cellId}`);
    }
    cell.style.border = "none";
    cell.style.padding = "0";
    cell.style.margin = "0";
    cell.style.background = `url('tank1.png') no-repeat center center`;
    cell.style.backgroundSize = "contain";
    cell.style.boxSizing = "border-box";
    cell.style.transform = `rotate(${currentRotation}deg)`; // Apply the previous rotation
}

// Function to move the tank
let move = (cellId, directionIndex) => {

    console.log("The move function runs-->",cellId,typeof(cellId));
    let gridSize = 10;
    let currentPosCell = document.getElementById(`box${cellId}`);

    let idNumberX = Math.floor(cellId / 10);
    let idNumberY = cellId % 10;

    console.log("First time x,y values:", idNumberX,typeof(idNumberX),idNumberY,typeof(idNumberY));
    

    const direction = directions[directionIndex];
    let newIdNumberX = idNumberX;
    let newIdNumberY = idNumberY;

    switch (direction) {
        case 'NORTH':
            newIdNumberX--;
            break;
        case 'SOUTH':
            newIdNumberX++;
            break;
        case 'EAST':
            newIdNumberY++;
            break;
        case 'WEST':
            newIdNumberY--;
            break;
    }

    // Boundary condition checks
    if (newIdNumberX < 0 || newIdNumberX >= gridSize || newIdNumberY < 0 || newIdNumberY >= gridSize) {
        console.log('Move out of bounds');
        return cellId;
    }

    let newPositionCell = document.getElementById(`box${newIdNumberX}${newIdNumberY}`);

    if (newPositionCell) {
        newPositionCell.style.border = "none"; 
        newPositionCell.style.padding = "0";  
        newPositionCell.style.margin = "0";
        newPositionCell.style.background = `url('tank1.png') no-repeat center center`; 
        newPositionCell.style.backgroundSize = "contain"; 
        newPositionCell.style.boxSizing = "border-box";
        newPositionCell.style.transform = `rotate(${currentRotation}deg)`;  // Apply the previous rotation

        // Clear the previous position's background and reset rotation
        resetCell(cellId);

        console.log(`New ID Coordinates: (X:${newIdNumberX},Y:${newIdNumberY})`);
        giveCoordinates();

        // Return the new cell id
        return parseInt(`${newIdNumberX}${newIdNumberY}`);
    } else {
        console.log('Invalid move');
        return cellId;
    }
}

// Function to update the drone's direction
let droneDirection = (newDirection) => {

    let droneElementPostion;
    if(lastPlacedPos == 0 || lastPlacedPos == 1 || lastPlacedPos == 2 || lastPlacedPos == 3 || lastPlacedPos == 4 || lastPlacedPos == 5 ||
        lastPlacedPos == 6 || lastPlacedPos == 7 || lastPlacedPos == 8 || lastPlacedPos == 9){
            droneElementPostion =  document.getElementById(`box${lastPlacedPos.toString().padStart(2, '0')}`);
    }
    else{
        droneElementPostion = document.getElementById(`box${lastPlacedPos}`);
    }
    let rotationAngle = 0;

    switch (newDirection) {
        case 'NORTH':
            rotationAngle = 0;  // Rotate to North (0 degrees)
            break;
        case 'EAST':
            rotationAngle = 90;  // Rotate to East (90 degrees)
            break;
        case 'SOUTH':
            rotationAngle = 180;  // Rotate to South (180 degrees)
            break;
        case 'WEST':
            rotationAngle = 270;  // Rotate to West (270 degrees)
            break;
        default:
            rotationAngle = 0;  // Default to North if the direction doesn't match
    }

    droneElementPostion.style.transform = `rotate(${rotationAngle}deg)`;
    droneElementPostion.style.transition = "transform 0.5s ease";

    // Update the currentRotation to maintain orientation when moved
    currentRotation = rotationAngle;

    giveCoordinates();

    return;
}

// Attack Method
let attack = (lastPlacedPos, currentDirectionIndex) => {
    let gridSize = 10;
    let idNumberX = Math.floor(lastPlacedPos / 10);
    let idNumberY = lastPlacedPos % 10;

    let attackPosX = idNumberX;
    let attackPosY = idNumberY;

    switch (directions[currentDirectionIndex]) {
        case 'NORTH':
            attackPosX -= 2;
            break;
        case 'SOUTH':
            attackPosX += 2;
            break;
        case 'EAST':
            attackPosY += 2;
            break;
        case 'WEST':
            attackPosY -= 2;
            break;
    }

    // Boundary condition checks for attack
    if (attackPosX < 0 || attackPosX >= gridSize || attackPosY < 0 || attackPosY >= gridSize) {
        console.log('Attack out of bounds');
        return;
    }

    let attackCellId = `${attackPosX}${attackPosY}`;
    let attackCell = document.getElementById(`box${attackCellId}`);

    if (attackCell) {
        // Apply the attack (explosion effect)
        attackCell.style.background = "url('explosion-12389_256.gif') no-repeat center center";
        attackCell.style.backgroundSize = "contain";

        // Remove the explosion effect after 2 seconds
        setTimeout(() => {
            attackCell.style.background = 'none';
        }, 2000);

        console.log(`Attack at position: (X:${attackPosX},Y:${attackPosY})`);
    } else {
        console.log('Invalid attack position');
    }
}


let array = document.querySelectorAll('.box');
array.forEach(element => {
    let cellId;

    element.addEventListener('mouseover', function() {
        cellId = this.id;
        document.getElementById(`${cellId}`).style.backgroundColor = 'red';
        document.getElementById(`${cellId}`).style.scale = 0.95;
    });

    element.addEventListener('mouseout', function() {
        cellId = this.id;
        document.getElementById(`${cellId}`).style.backgroundColor = 'transparent';
        document.getElementById(`${cellId}`).style.scale = 1;
    });

    element.addEventListener('click', function() {
        cellId = this.id.slice(3, 5); // Extract ID without 'box' prefix
        if (!isTankPlaced) {
            placeTank(cellId);
            lastPlacedPos = cellId;
            isTankPlaced = true;
            console.log("Tank placed at:", lastPlacedPos);
        } else {
            resetCell(lastPlacedPos); 
            placeTank(cellId); // Place the tank in the new cell
            lastPlacedPos = cellId; // Update the last placed position
            droneDirection(directions[currentDirectionIndex]); // Maintain the direction
            console.log("Tank moved to:", lastPlacedPos);
        }
        //Remove the dialogue box:
        document.getElementById('dialogue').style.display = 'none';
    });
});

// Move Functionality
document.getElementById('move-button').addEventListener('click', function() {
    if (isTankPlaced) {
        lastPlacedPos = move(lastPlacedPos, currentDirectionIndex);
    }
});

// Direction Functionality
let directionList = document.querySelectorAll('.dir-buttons button');
directionList.forEach(element => {
    element.addEventListener('click', function() {
        let directionButtonId = element.id;
        if (directionButtonId == "RIGHT") {
            currentDirectionIndex = (currentDirectionIndex + 1) % directions.length;
        } else if (directionButtonId == "LEFT") {
            currentDirectionIndex = (currentDirectionIndex - 1 + directions.length) % directions.length;
        }
        const newDirection = directions[currentDirectionIndex];
        droneDirection(newDirection);
    });
});

// Attack Functionality
let attackButton = document.getElementById('attack');
attackButton.addEventListener('click', function() {
    attack(lastPlacedPos, currentDirectionIndex);
});


// Random Bomb Animation1: 

function bombFeature(){

    let randomCellId = Math.floor((Math.random() * 100));
    let randomCellIdString = (randomCellId < 10) ? `0${randomCellId}` : `${randomCellId}`;

    let cell = document.getElementById(`box${randomCellIdString}`);

    document.getElementById(`box${randomCellIdString}`).style.background = "url('bomb-12139_128.gif') no-repeat center center";
    
    //If the bomb hits my tank.
    if (lastPlacedPos == randomCellIdString) {
            cell.style.background = "url('bomb-12139_128.gif') no-repeat center center";
            cell.style.border = '3px solid red';
            cell.style.borderRadius = '5px';
            cell.style.transform = 'rotate(0deg)';
            cell.style.boxSizing = "border-box";
        setTimeout(() => {
            alert('Game Over! You hit a bomb.');
            window.location.href = "gameover.html"; // Redirect to the Game Over page
        }, 2000);
    }

    setTimeout(() => {
        document.getElementById(`box${randomCellIdString}`).style.background = 'none';
    }, i+2000);

}

let i = 1000;

setInterval(bombFeature, i*3);
setInterval(bombFeature, i*5);
setInterval(bombFeature, i*7);
setInterval(bombFeature, i*9);
setInterval(bombFeature, i*11);
setInterval(bombFeature, i*13);

//Click the dialogue box button to fix
document.querySelector('#dialogue .lower-box button').addEventListener('click',function(){
    document.getElementById('dialogue').style.display = 'none';
})
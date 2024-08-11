window.addEventListener("load", function (event) {
    const pos_1 = document.getElementById("pos_1");
    const pos_2 = document.getElementById("pos_2");
    const pos_3 = document.getElementById("pos_3");
    const pos_4 = document.getElementById("pos_4");
    const pos_5 = document.getElementById("pos_5");
    const pos_6 = document.getElementById("pos_6");
    const pos_7 = document.getElementById("pos_7");
    const pos_8 = document.getElementById("pos_8");
    const pos_9 = document.getElementById("pos_9");
    pos_1.addEventListener("click", e => {
        pos_1.textContent = "X";
        computerPlayer();
    });
    pos_2.addEventListener("click", e => {
        pos_2.textContent = "X";
        computerPlayer();
    });
    pos_3.addEventListener("click", e => {
        pos_3.textContent = "X";
        computerPlayer();
    });
    pos_4.addEventListener("click", e => {
        pos_4.textContent = "X";
        computerPlayer();
    });
    pos_5.addEventListener("click", e => {
        pos_5.textContent = "X";
        computerPlayer();
    });
    pos_6.addEventListener("click", e => {
        pos_6.textContent = "X";
        computerPlayer();
    });
    pos_7.addEventListener("click", e => {
        pos_7.textContent = "X";
        computerPlayer();
    });
    pos_8.addEventListener("click", e => {
        pos_8.textContent = "X";
        computerPlayer();
    });
    pos_9.addEventListener("click", e => {
        pos_9.textContent = "X";
        computerPlayer();
    });

    function computerPlayer() {
        let positions = [pos_1, pos_2, pos_3, pos_4, pos_5, pos_6, pos_7, pos_8, pos_9];
        let emptyPositions = [];
        let oponentPositions = [];
        const combinations = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];
        
        for(let i = 0; i < positions.length; i++) {
            if(positions[i].textContent.trim() === "") {
                emptyPositions.push(positions[i]);
            }
            else if (positions[i].textContent.trim() === "X") {
                oponentPositions.push(positions[i]);
            }
        }
        
        if(emptyPositions.length === 8) {
            let randomNum = Math.floor(Math.random() * emptyPositions.length);
            let positionToFill = emptyPositions[randomNum];
            positionToFill.textContent = "O";
        } 
        else {
            let oponentCombinations;        
            console.log(oponentPositions);
            for(let i = 0; i < oponentPositions.length; i++) {
                console.log(oponentPositions[i].id.slice(-1));     
                for(let y = 0; y < combinations.length; y++) {
                    let number = parseInt(oponentPositions[i].id.slice(-1));
                    oponentCombinations = combinations[y].find((element) => element === number);
                    console.log(oponentCombinations);
                }                
            }
            
        }           
    }
    /*END*/  
});
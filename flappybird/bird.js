// IGRICA JE NAPRAVLJENA BEZ HIGH-SCORE CUVANJA, DAKLE NIGDE NE CUVAM NAJBOLJI REZULTAT BITNA MI JE BILA LOGIKA SAME "FIZIKE" KRETANJA

const blocks = document.getElementById("block")
const game = document.getElementById("game")
const hole = document.getElementById("hole")
const bird = document.getElementById("bird")
const block_Upper = document.getElementById("upperblock")
const block_Lower = document.getElementById("lowerblock")
const SPEED = 1.5
let direction = 0.20;
let direction_bird = 15
let GRAVITY = 4
let score_arr = 0
let last_score = 0

// GAME LOOP
function update_blocks(){
    check_collision()
    gravity()
    move_blocks()
    window.requestAnimationFrame(update_blocks)
}
window.requestAnimationFrame(update_blocks)
// GENERISANJE NOVIH BLOKOVA NA EKRANU
function move_blocks(){
    let block_position = parseFloat(getComputedStyle(blocks).getPropertyValue("--x"))
    blocks.style.setProperty("--x", block_position -= direction * SPEED)
    if(blocks.getBoundingClientRect().right <= game.getBoundingClientRect().left){
        blocks.style.setProperty("--x", 45)
        let random_hole_pos = Math.floor(Math.random() * (-80 + 20) ) - 20;
        blocks.style.setProperty("--y", random_hole_pos)
        console.log(random_hole_pos)
        score_arr += 1;
        document.getElementById("score").innerText = score_arr 
    }

}
// GRAVITACIJA(AUTOMATSKO KRETNANJE PTICE NA DOLE)
function gravity(){
    let bird_position = parseFloat(getComputedStyle(bird).getPropertyValue("--y"))
    bird.style.setProperty("--y", bird_position += direction * GRAVITY)
    
}
// PROVERA SUDARA SA BLOKOVIMA
function check_collision(){
    if((bird.getBoundingClientRect().right >= block_Lower.getBoundingClientRect().left && bird.getBoundingClientRect().bottom >= block_Lower.getBoundingClientRect().top) || (bird.getBoundingClientRect().right >= block_Upper.getBoundingClientRect().left && bird.getBoundingClientRect().top <= block_Upper.getBoundingClientRect().bottom)){
        alert("You lost")
         blocks.style.setProperty("--x", 45)
         blocks.style.setProperty("--y", -50)
         bird.style.setProperty("--y", 50)
         score_arr = 0
         document.getElementById("score").innerText = 0  
    }
    if((bird.getBoundingClientRect().bottom >= game.getBoundingClientRect().bottom) || (bird.getBoundingClientRect().top <= game.getBoundingClientRect().top) ){
        alert("You lost")
         blocks.style.setProperty("--x", 45)
         blocks.style.setProperty("--y", -50)
         bird.style.setProperty("--y", 50)
         score_arr = 0
         document.getElementById("score").innerText = 0  
    }
    
}
// POKRETANJE PTICE
document.addEventListener("keypress", function(e){
    let new_bird_pos = parseFloat(getComputedStyle(bird).getPropertyValue("--y"))
    bird.style.setProperty("--y", new_bird_pos -= direction_bird * 1)
    bird.style.transform = "none"
})

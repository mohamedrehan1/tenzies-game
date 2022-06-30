import React, {useEffect, useState} from "react";
import "./index.css"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App(){
    const [dice, setDice] = useState(allNewDice)
    const [tenzies,setTenzies] = useState(false)
    
    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if(allHeld && allSameValue){
            setTenzies(true)
        }else{
            setTenzies(false)
        }
    },[dice])

    const diceElements = dice.map(die => 
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)} 
        />
    )

    function generateNewDie(){
        return{
            value: Math.ceil(Math.random()*6), 
            isHeld:false,
            id: nanoid()
        }
    }

    function allNewDice(){
        const newDice = []
        for(let i = 0 ; i < 10 ; i++){
            newDice.push(generateNewDie())
        }
        return newDice
    }

    function holdDice(id){
        setDice((oldDice) => oldDice.map((die) => 
            die.id === id ? {...die, isHeld: !die.isHeld} : die
            )
        )
    }

    function rollDice(){
        setDice((oldDice) => oldDice.map((die) =>{
                return die.isHeld ? die : generateNewDie()
            })
        )
    }
    function newGame(){
        setDice(allNewDice)
    }

    return(
        <main>
            <div>{tenzies && <Confetti />}</div>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">
                Roll until all dice are the same. 
                Click each die to freeze it at its current value between rolls.
            </p>
            <div className="dice-container">
                {diceElements}                           
            </div>
            <div>
                <button className="roll-dice" onClick={tenzies ? newGame : rollDice}>{tenzies? "New Game" : "Roll" }</button>
            </div>
        </main>
    )    
}
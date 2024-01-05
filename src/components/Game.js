import React, { useState, useEffect } from 'react';
import Card from './Card';
import './Game.css'

const Game = () => {
    const[deck, setDeck] = useState([]);
    const[drawnCards, setDrawnCards] = useState([]);
    const [usedCards, setUsedCards] = useState([]);
    const [count, setCount] = useState(0);
    const [isCountVisible, setIsCountVisible] = useState(false);
    const minCardsPerDraw = 2
    const maxCardsPerDraw = 5
    
    const generateDeck = () => {
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        const decks = 5;

        const newDeck = [];
        for (let i = 0; i < decks; i++) {
            for (const rank of ranks) {
                for (const suit of suits) {
                    newDeck.push({ rank, suit });
                }
            }
        }

        for (let i = newDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
        }

        return newDeck;
    }

    const drawCards = () => {

        const remainingDeck = deck.filter(card => !usedCards.includes(card));
        const cardsToDraw = getRandomNumber(minCardsPerDraw, maxCardsPerDraw);

        const newDrawnCards = remainingDeck.slice(0, cardsToDraw);

        setDrawnCards(newDrawnCards)
        setUsedCards(prevUsedCards => [...prevUsedCards, ...newDrawnCards]);

        updateCount(newDrawnCards);

        if(usedCards.length + cardsToDraw >= deck.length) {
            setDeck(generateDeck());
            setUsedCards([]);
            setCount(0);
        }
    };

    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const updateCount = (drawnCards) => {
        drawnCards.forEach(card => {
            const rank = card.rank;
            if (['2', '3', '4', '5', '6'].includes(rank)) {
                setCount(prevCount => prevCount + 1);
            } else if (['10', 'jack', 'queen', 'king', 'ace'].includes(rank)) {
                setCount(prevCount => prevCount - 1);
            }
        });
    };

    const reset = () => {
        setDeck(generateDeck());
        setUsedCards([]);
        setCount(0);
        drawCards();
        setIsCountVisible(false);
    };

    const toggleCountVisibility = () => {
        setIsCountVisible(prevIsCountVisible => !prevIsCountVisible);
    };

    useEffect(() => {
        setDeck(generateDeck());
    }, []);

    const buttonLabel = usedCards.length === 0? "Draw Cards!" : "Draw More Cards!"

    return (
        <div className='container'>
            <div className='cardContainer'>
                {drawnCards.map((card, index) => (
                    <Card key={index} rank={card.rank} suit={card.suit} />
                ))}
            </div>
            <div className='buttonsContainer'>
                <div className='gameButtonsContainer'>
                    <button onClick={drawCards} className='game-button'>{buttonLabel}</button>
                    {usedCards.length !== 0 && <button onClick={reset} className='game-button' style={{backgroundColor:'black'}}>Reset</button>}
                </div>
                <div className='countContainer'>
                {usedCards.length !== 0 && <button onClick={toggleCountVisibility} className='game-button'>
                    {isCountVisible ? 'Hide Count' : 'Show Count'}
                </button>}
                {isCountVisible && <p>{count}</p>}
            </div>
            </div>
        </div>
    );
};

export default Game;
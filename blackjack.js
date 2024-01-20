import {useEffect, useState} from 'react';


/**
 * @typedef {Object} Card 
 * @property {string} suit
 * @property {string} value
 * @property {string} code
 * @property {string} image
 * @param {number} num 
 * @returns {Promise<Card[]>}
 */
async function drawCards(num=2) {
  try {
    const res = await fetch(`https://www.deckofcardsapi.com/api/deck/new/draw/?count=${num}`)
    const data = await res.json()
    return data.cards
  } catch (err) {
    return null
  }
}
function score(cardValue) {
  switch(cardValue) {
    case 'ACE': return 11;
    case 'KING': case 'QUEEN': case 'JACK': return 10;
    default: return cardValue * 1
  }
}
export default function Blackjack() {
  /** @type {[Card[], React.Dispatch<React.SetStateAction<Card[]>]} */
  const [cards, setCards] = useState([])
  useEffect(() => {
    drawCards().then(cards => setCards(cards))
  }, [])
  const totalScore = cards.length > 0 ? score(cards[0].value) + score(cards[1].value) : 0
  return <div className='m-10 font-bold'>
    <h1 className='text-3xl text-center mt-10 mb-5'>BlackJack Game !!!</h1>
    <div className='flex gap-10 justify-center'>
      {cards.length === 0 && `Loading`}
      {cards.map(card => <img id={card.code} src={card.image} />)}
    </div>
    { cards.length > 0 && <div className='text-center'>SCORE: {totalScore}</div> }
    { totalScore === 21 && <div className='text-center'>🎖🎖🎖BLACKJACK!!!🎖🎖🎖</div> }
  </div>
}
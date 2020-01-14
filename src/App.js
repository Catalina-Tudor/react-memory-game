import React from 'react';
import randomEmoji from 'random-emoji'
import './App.css';
const DIFFERENT_EMOJI_COUNT = 4;
const emojis = randomEmoji.random({ count: DIFFERENT_EMOJI_COUNT })
const emojiPairs = shuffle([...emojis, ...emojis]);

const Card = props => {
  return ( 
  <button 
    onClick={props.onClick}
    margin-left="20px"
  >
    {(props.reveal || props.found) ? props.emoji : '?'}
  </button>
  );
};



export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: emojiPairs.map(e => ({show: false, found: false, emoji: e})),
      previousSelection: null,
      noMatch: false 
    }
  }



  handleClick = i => {
    let currentCards = this.state.cards.slice();
    let previousSelection = this.state.previousSelection;

    if (previousSelection === i){
      return;
    }

    if (this.state.noMatch) {
      return;
    }
   
    
    if (previousSelection || previousSelection === 0){
      let match = isMatch(currentCards, i, previousSelection);
      if (match){
        currentCards[i].found = true;
        currentCards[previousSelection].found = true;
        this.setState(
          {
            cards: currentCards,
            previousSelection: null,
            noMatch: false
          }
        )
      } else {
        currentCards[i].show = true;
        currentCards[previousSelection].show = true;
        this.setState({
          cards: currentCards,
          previousSelection: null,
          noMatch: true
        }, () => this.waitAndReset(this.state))
      }
    } else {
      currentCards[i].show = !currentCards[i].show;
      this.setState(
        {
          cards: currentCards,
          previousSelection: i,
          noMatch: false
        }
      )
    }

  }

  waitAndReset = state => { 
    setTimeout(() => {
      let updatedCards = state.cards.slice();
      let showFalse = item => {
      return (
        {
          show: false,
          found: item.found,
          emoji: item.emoji
        }
      )
    }
    this.setState(
      {
        cards: updatedCards.map(showFalse),
        noMatch: false,
      }
    )
    },1000);
  }

  render(){
    return (
      this.state.cards.map((card, i) => 
        <Card 
          key={i}
          onClick={() => this.handleClick(i)}
          reveal={this.state.cards[i].show}
          found={this.state.cards[i].found}
          className="card" 
          emoji={card.emoji.character}
        />)
    ); 
  };
  

}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function isMatch(currentCards, newSelection, oldSelection) {
  let currentEmoji = currentCards[newSelection].emoji.character
  let previousEmoji = currentCards[oldSelection].emoji.character
  return !(newSelection === oldSelection) &&  (currentEmoji === previousEmoji)
}






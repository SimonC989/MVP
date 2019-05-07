import React from 'react';
import $ from 'jquery';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const Text = styled.div`
  font-family: cursive;
  font-size: 20px;
  padding: 5px;
  text-decoration: underline;
`;

const Header = styled.div`
  display: flex;
  width: 90%;
  height: 30px;
  border: 1px solid black;
  margin: 10px;
`;

const Topic = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 20%;
  background-color: purple;
  font-size: 20px;
  font-family: cursive;
  color: white;
  text-decoration: underline;
`;

const Board = styled.div`
  width: 90%;
  margin: 15px;
  border: 4px double black;
`;

const PlayerList = styled.div`
  display: flex;
  flex-direction: row;
  height: 30px;
  border-radius: 10px;
  
  :hover {
    background-color: silver;
  }
`;

const Name = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 20%;
  background-color: green;
  font-family: fantasy;
  font-size: 18px;
`;

const Count = styled(Name)`
  background-color: skyblue;
`;

class ScoreBoard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      scores: null,
      number: 1,
    }
  }

  componentDidMount() {
    this.getScore();
  }

  componentWillReceiveProps() {
    this.getScore();
  }

  getScore() {
    const { title } = this.props;
    $.ajax({
      method: 'GET',
      url: '/players',
      data: { game: title },
      success: scores => this.setState({ scores: scores }),
      error: err => console.log('fail to get scores', err),
    });
  }

  changeCount(name, index) {
    const { title } = this.props;
    const { refresh } = this.props;
    const { scores, number } = this.state;
    let key = scores[index][name];
    scores[index][name] = key + number;
    this.setState({ scores: scores}, () => {
      const player = scores[index].name;
      const score = scores[index][name];
      $.ajax({
        method: 'PATCH',
        url: '/updateScore',
        data: { name: player, game: title, column: name, count: score },
        success: () => refresh(),
        error: err => console.log(`fail to add count to ${name}`, err)
      });
    });
  }

  render() {
    const { players } = this.props;
    const { number } = this.state;
    let word = ''
    if (number === 1) {
      word = 'minus'
    } else {
      word = 'plus'
    }
    return (
      <Container>
        <Text> Score </Text>
        <Header>
          <Topic>Name</Topic>
          <Topic>Wins</Topic>
          <Topic>Saint</Topic>
          <Topic>Sinner</Topic>
          <Topic>Total</Topic>
        </Header>
        <Board>
          {players ? players.map( (player, index) =>
          <PlayerList key={player.name} >
            <Name name={player.name} >
              {player.name}
            </Name>
            <Count name="wins" onClick={() => this.changeCount('wins', index)} >{player.wins}</Count>
            <Count name="good" onClick={() => this.changeCount('good', index)} >{player.good}</Count>
            <Count name="evil" onClick={() => this.changeCount('evil', index)} >{player.evil}</Count>
            <Count name="total">{`${player.good + player.evil}`}</Count>
          </PlayerList>)
          : null }
        </Board>
        <div onClick={() => this.setState({ number: Number(`${number * -1}`) })}>{word}</div>
      </Container>
    )
  }
};

export default ScoreBoard;
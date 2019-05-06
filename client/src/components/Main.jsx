import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';

const MainContainer = styled.div`
  display: flex;
`;

const Left = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 35%;
`;

const Text = styled.div`
  font-family: cursive;
  font-size: 20px;
  padding: 5px;
`;

const AddPlayerInput = styled.input`
  width: 70%;
  height: 20px;
  margin: 15px;
  font-family: fantasy;
  font-weight: bold;
  font-size: 18px;
  border: 1px solid silver;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  transition: all 0.3s ease-in-out;

  :hover {
    box-shadow: 0 5px 15px rgba(0,0,0,0.6);
    transition: all 0.3s ease-in-out;
  }

`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid red;
  width: 70%;
  padding: 5px;
`;

const Players = styled.div`
  display: flex;
  justify-content: center;
  font-family: fantasy;
  font-size: 16px;
`;

const Right = styled.div`

`;

const RemoveModule = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35%;
  height: 50%;
  background-color: rgba(124, 126, 141, 0.6);
`;

const RemoveButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 30px;
  border: 4px double white;
  background-color: silver;
`;

class Main extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      addPlayer: '',
      playerlist: null,
      removePopUp: null,
      removePlayer: '',
    }
    this.removeHandler = this.removeHandler.bind(this);
  }

  componentDidMount() {
    this.getPlayers();
  }

  getPlayers() {
    $.ajax({
      method: 'GET',
      url: '/players',
      success: players => this.setState({ playerlist: players, addPlayer: '' }),
      error: err => console.log('fail to get players', err)
    });
  }

  addPlayer(e) {
    if (e.keyCode === 13) {
      const { addPlayer } = this.state;
      $.ajax({
        method: 'POST',
        url: '/addPlayer',
        data: {name: addPlayer},
        success: () => {
          this.setState({ addPlayer: ''}, this.getPlayers());
        },
        error: err => console.log('fail to add player', err)
      });
    }
  }

  addPlayerHandle(e) {
    this.setState({ [e.target.name]: e.target.value});
  }

  removeHandler() {
    const { removePlayer } = this.state;
    $.ajax({
      method: 'DELETE',
      url: '/removePlayer',
      data: {name: removePlayer},
      success: () => this.setState({ removePopUp: null, removePlayer: '' }, this.getPlayers()),
      error: err => console.log('fail to remove player', err)
    });
  }

  render() {
    const { playerlist } = this.state;
    const { removePopUp } = this.state;
    let key = [];
    if (playerlist) {key = Object.keys(playerlist)};

    return (
      <MainContainer>
        {removePopUp ? 
          <RemoveModule>
            <RemoveButton onClick={this.removeHandler}>Remove Player</RemoveButton>
          </RemoveModule>
        : null}
        <Left>
          <Text>Add Player</Text>
          <AddPlayerInput name="addPlayer" onChange={e => this.addPlayerHandle(e)} onKeyDown={e => this.addPlayer(e)}/>
          <Text>List of Players</Text>
          {key.length > 0 ? 
          <List>
            {playerlist.map(player => 
              <Players key={player.name} onDoubleClick={() => this.setState({ removePlayer: player.name, removePopUp: true })} >{player.name}</Players>
            )}
          </List> : null }
        </Left>
        <Right>

        </Right>
      </MainContainer>
    )
  }
};

export default Main;
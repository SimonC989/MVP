import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import Nav from './Nav.jsx';
import Main from './Main.jsx';

const Page = styled.div`
  display: flex;
  height: auto;
  background-color: #ffd575;
`;

const LeftNav = styled.div`
  display: flex;
  width: 5%;
  background-color: #5495ff;
  flex-direction: column;
`;

const LeftIcons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 180px;
  margin-bottom: 40px;
  height: auto;
  background-color: #35ddff;
  // border: 1px solid black;
  border-left: 0px;
  border-radius: 10px;

  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  transition: all 0.3s ease-in-out;

  :hover {
    box-shadow: 0 5px 15px rgba(0,0,0,0.8);
    transition: all 0.3s ease-in-out;
  }
`;

const RightNav = styled.div`
  width: 5%;
  background-color: #5495ff;
`;

const MainBody = styled.div`
  width: 90%;
`;

const TopContainer = styled.div`
  height: 150px;
  background-color: #ab54bc;
`;

const TopNav = styled.div`
  display: flex;
  align-items: center;
  height: 40%;
  background-color: #ffa100;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-family: cursive;
  font-style: italic;
  font-weight: 400;
  background-color: #169903;
  height: 60%;
`;

const BottomContainer = styled.div`
`;

const GameIcon = styled.img`
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  height: width;
  
  :hover {
    width: 150%;
    height: width;
    z-index: 1;
  }
`;

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      detailModule: false,
      gameDetails: null,
      gameIndex: 0,
      playerList: null,
    }
  }

  componentDidMount() {
    this.initial();
  }

  initial() {
    $.ajax({
      method: 'GET',
      url: '/all',
      success: werewolf => this.setState({ gameDetails: werewolf }, () => {
        $.ajax({
          method: 'GET',
          url: '/players',
          data: { game: this.state.gameDetails[this.state.gameIndex] },
          success: players => this.setState({ playerList: players }),
          error: err => console.log('App, did not get player list', err)
        });
      }),      
      error: (err) => console.log(err)
    });
  }

  changeIndex(index) {
    const { gameDetails, gameIndex } = this.state; 
    this.setState({ gameIndex: index }, () => {
      $.ajax({
        method: 'GET',
        url: '/players',
        data: { game: gameDetails[gameIndex] },
        success: players => this.setState({ playerList: players }),
        error: err => console.log('Change index player list failed', err)
      });
    });
  }

  render() {
    const { detailModule } = this.state;
    const { gameIndex } = this.state;
    const { gameDetails, playerList } = this.state;
    return (
      <div>        
        {gameDetails ?
        (<Page>
          <LeftNav>
            <LeftIcons>
              {gameDetails ? gameDetails.map((game, index) => 
              <GameIcon src={game.imageUrl} key={index} onClick={() => this.changeIndex(index)} />
              ) : null }
            </LeftIcons>
          </LeftNav>
          <MainBody>
            <TopContainer>
              { detailModule ? <div /> : null }
              <TopNav>
                <Nav />
              </TopNav>
              <Title>{gameDetails[gameIndex].name}</Title>
            </TopContainer>
            <BottomContainer>
              {playerList ? <Main title={gameDetails[gameIndex].name} players={playerList} /> : <Main title={gameDetails[gameIndex].name} />}
            </BottomContainer>
          </MainBody>
          <RightNav>
            bar
          </RightNav>
        </Page>)
        : 'Loading...' }
      </div>
    )
  }
};

export default App;
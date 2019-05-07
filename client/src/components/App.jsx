import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import Nav from './Nav.jsx';
import Main from './Main.jsx';

const Page = styled.div`
  display: flex;
  height: 100%;
`;

const LeftNav = styled.div`
  display: flex;
  width: 5%;
  flex-direction: column;
`;

const LeftIcons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 180px;
  margin-bottom: 40px;
  height: auto;
  border-left: 0px;
  border-radius: 10px;

  box-shadow: 0 5px 15px rgba(0,0,0,0);
  transition: all 0.3s ease-in-out;

  :hover {
    box-shadow: 0 5px 15px rgba(0,0,0,0.8);
    transition: all 0.3s ease-in-out;
  }
`;

const RightNav = styled.div`
  width: 5%;
`;

const MainBody = styled.div`
  width: 90%;
`;

const TopContainer = styled.div`
  height: 150px;
`;

const TopNav = styled.div`
  display: flex;
  align-items: center;
  height: 40%;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-family: cursive;
  font-style: italic;
  font-weight: 400;
  background-image: linear-gradient(to right, white, #24cbe5, white);
  color: black;
  height: 60%;
`;

const BottomContainer = styled.div`
  height: auto;
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

const Detail = styled.div`
  position: absolute;
  width: 99%;
  height: 98%;
  background-color: rgba(124, 126, 141, 0.4);
`;

const DetailsContainer = styled.div`
  position: relative;
  margin: 5%;
  width: 90%;
  height: 80%;
  background-color: white;
`;

const TextTitle = styled.div`
  font-family: cursive;
  font-size: 20px;
  text-decoration: underline;
  margin: 10px;
`;

const Text = styled.div`
  margin: 20px;
  font-size: 16px;
`;

const Link = styled.a`
  font-size: 16px;
  margin: 20px;
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
    let desc;
    if (gameDetails) {
      desc = gameDetails[gameIndex];
    } 
    return (
      <div>        
        {gameDetails ?
        (<Page>
          {detailModule ? 
          <Detail onClick={() => this.setState({ detailModule: false })}>
            <DetailsContainer>
              <TextTitle>Description</TextTitle>
              <Text>{desc.description}</Text>
              <TextTitle>Minimum Players: {desc.minPlayers}</TextTitle>
              <TextTitle>Maximum Players: {desc.maxPlayers}</TextTitle>
              <TextTitle>Offical Site:</TextTitle>
              <Link href={desc.officialUrl}>Official Site</Link>
              <TextTitle>Rules:</TextTitle>
              <Link href={desc.rulesUrl}>Rule Book!</Link>
            </DetailsContainer>
          </Detail>
          : null }
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
              <Title onClick={() => this.setState({ detailModule: true })}>{gameDetails[gameIndex].name}</Title>
            </TopContainer>
            <BottomContainer>
              {playerList ? <Main title={gameDetails[gameIndex].name} players={playerList} /> : <Main title={gameDetails[gameIndex].name} />}
            </BottomContainer>
          </MainBody>
          <RightNav />
        </Page>)
        : 'Loading...' }
      </div>
    )
  }
};

export default App;
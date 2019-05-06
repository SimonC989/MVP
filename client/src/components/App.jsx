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
    }
  }

  componentDidMount() {
    this.initial();
  }

  initial() {
    $.ajax({
      method: 'GET',
      url: '/all',
      success: werewolf => this.setState({ gameDetails: werewolf }),
      error: (err) => console.log(err)
    });
  }

  changeIndex(index) {
    this.setState({ gameIndex: index });
  }

  render() {
    const { detailModule } = this.state;
    const { gameIndex } = this.state;
    const { gameDetails } = this.state;
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
              <Main />
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
import React from 'react';
import styled from 'styled-components';

const Bar = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const SearchBar = styled.input`
  width: 70%;
  margin-right: 10%;
`;

const SignUp = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 1%;
  margin-right: 1%;
  width: 8%;
  border: 1px black solid;
  font-family: san-serif;
`;

const Login = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 2%;
  width: 8%;
  border: 1px black solid;
  font-family: san-serif;
`;

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchbar: '',
    }
  }

  searchHandle(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render () {
    return (
      <Bar>
        <SearchBar name="searchbar" onChange={e => this.searchHandle(e)} />
        <SignUp>Sign Up</SignUp>
        <Login>Login</Login>
      </Bar>
    )
  }
};

export default Nav;
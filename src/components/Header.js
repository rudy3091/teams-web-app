import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
width: 100%;
height: ${props => props.header ? props.header : "50px"};
background-color: red;
position: fixed;
top: 0px;
z-index: 9999;
`;

const Header = (props) => {
	return (
		<Container header={props.header}>
			Header
		</Container>
	)
}

export default Header;


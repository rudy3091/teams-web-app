import React, { useRef } from 'react';
import styled from 'styled-components';
import { useQuery, gql } from '@apollo/client';

import Loading from './Loading2.js';
import Error from './Error.js';

const QUERY_ALL_TODOS = gql`
query {
	todos {
		content
		startDate {
			year
			month
			date
		}
		endDate {
			year
			month
			date
		}
		assigned {
			name
			color
		}
	}
}
`;

const Container = styled.div`
width: 100%;
display: flex;
flex-direction: column;
`;

const Title = styled.div`
text-align: center;
font-size: 50px;
font-weight: 300;
padding: 20px;
border-bottom: 2px solid #e5e5e5;
`;

const Wrapper = styled.div`
display: grid;
grid-template-columns: 5fr 1fr 1fr;
padding: 20px;
border-bottom: 1px solid #e5e5e5;

& > div:nth-child(1) {
	margin: 10px 30px;
}
`;

const Vertical = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const MainPage = (props) => {
	const { loading, error, data } = useQuery(QUERY_ALL_TODOS);

	if (loading) return <Loading mono></Loading>;
	if (error) return <Error></Error>

	return (
		<Container>
			<Title>Schedules</Title>
			{data.todos.map((todo, i) => (
				<Wrapper key={i}>
					<div style={{fontSize:"20px"}}>{todo.content}</div>
					<Vertical>
						<span>{`${todo.startDate.year}-${todo.startDate.month}-${todo.startDate.date}`}</span>
						<span>{`${todo.endDate.year}-${todo.endDate.month}-${todo.endDate.date}`}</span>
					</Vertical>
					<Vertical>{todo.assigned.map((user, i) => (
						<div key={i} style={{color:user.color}}>{user.name}</div>
					))}</Vertical>
				</Wrapper>
			))}
		</Container>
	);
}

export default MainPage;
export { QUERY_ALL_TODOS };


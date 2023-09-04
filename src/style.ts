// styles.ts

import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

export const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export const Count = styled.p`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

export const Button = styled.button`
  padding: 1rem;
  font-size: 1.5rem;
  background-color: #0077cc;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;



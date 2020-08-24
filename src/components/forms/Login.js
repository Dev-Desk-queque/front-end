import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "../dashboard/node_modules/styled-components";
import useAxios from '../../hooks/useAxios';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 8rem;
`;

function Login() {
  const {axiosWithAuth: axios} = useAxios();
  return (
    <div>
        <Container>

        </Container>
    </div> 
    
  );
}

export default Login;
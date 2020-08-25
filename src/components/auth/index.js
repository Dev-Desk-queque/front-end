import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Login from './Login';
import Register from './Register';


export default function Auth(props) {
    const user = useSelector(state => state.user);
}
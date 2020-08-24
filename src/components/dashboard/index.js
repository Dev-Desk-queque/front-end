/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

export default function Issues(props) {
  const issues = useSelector((state) => state.issues);
}

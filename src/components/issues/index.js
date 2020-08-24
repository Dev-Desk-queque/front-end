/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getIssues } from "../../actions";
import useAxios from "../../hooks/useAxios";

export default function Issues(props) {
  const issues = useSelector((state) => state.issues);
  const dispatch = useDispatch();
  const { axiosWithAuth: axios } = useAxios("");
  useEffect(() => {
    dispatch(getIssues(axios));
  }, [axios]);

}

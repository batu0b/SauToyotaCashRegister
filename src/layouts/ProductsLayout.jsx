import React from "react";
import { useAxios } from "../hooks/useAxios";
import { Box, CircularProgress } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ContainerDiv } from "../components/ContainerDiv";

export const ProductsLayout = () => {
  const { isLoading, error, response } = useAxios({
    url: "/getAllProducts",
    method: "GET",
  });

  if (isLoading) {
    return (
      <ContainerDiv>
        <CircularProgress />
      </ContainerDiv>
    );
  }
  return (
    <>
      <Outlet
        context={{
          products: response.data.products,
          categories: response.data.categories,
        }}
      />
    </>
  );
};

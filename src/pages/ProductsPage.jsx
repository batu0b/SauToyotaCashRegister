import { ContainerDiv } from "../components/ContainerDiv";
import { useOutletContext } from "react-router-dom";
import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import { ProductCard } from "../components/ProductCard";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { CategoryMenuBar } from "../components/CategoryMenuBar";

//TODO make virtual
export default function ProductsPage() {
  const { categories, products } = useOutletContext();
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentData, setCurrentData] = useState(null);
  const [isPending, startTransition] = useTransition();

  const categoryName = useMemo(
    () => categories.find((x) => x.url === currentCategory).category,
    [currentCategory]
  );

  useEffect(() => {
    setTimeout(() => {
      setCurrentData(products);
    }, 200);
  }, []);

  const handleSetDataByCategory = useCallback((x) => {
    startTransition(() => {
      setCurrentCategory(x.url);
      const newData = products.filter((product) =>
        x.url === "" ? product : product.category_name === x.category
      );
      setCurrentData(newData);
    });
  }, []);

  if (isPending || !currentData) {
    return (
      <ContainerDiv>
        <CircularProgress size={32} />
      </ContainerDiv>
    );
  }

  return (
    <ContainerDiv
      toolbarSx={(theme) => ({
        display: "none",
        [theme.breakpoints.down("md")]: {
          display: "unset",
        },
      })}
      sx={{ justifyContent: "flex-start", position: "relative" }}
    >
      <Typography
        height={50}
        fontSize={42}
        sx={{ display: "flex", alignItems: "center", alignSelf: "flex-start" }}
      >
        {categoryName}
      </Typography>

      <Box
        sx={(theme) => ({
          width: "100%",
          marginTop: "10px",
          height: "calc(100vh - 120px)",
          [theme.breakpoints.down("md")]: {
            height: "calc(100vh - 184px)",
          },
          [theme.breakpoints.down("sm")]: {
            height: "calc(100vh - 184px)",
          },
          overflowY: "auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
          paddingBottom: 1,
          paddingX: 2,
        })}
      >
        {currentData.map((x) => (
          <ProductCard product={x} key={x.id} />
        ))}
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          borderTop: "2px solid ",
          borderColor: "customSecondary",
          height: "60px",
          display: "flex",
          justifyContent: "space-evenly",
          bgcolor: "customSecondary",
          alignItems: "center",
          px: 2,
        }}
      >
        <TextField size="small" label="search" aria-readonly={true} />
        <CategoryMenuBar
          setCategory={handleSetDataByCategory}
          categories={categories}
          currentCategory={currentCategory}
        />
      </Box>
    </ContainerDiv>
  );
}

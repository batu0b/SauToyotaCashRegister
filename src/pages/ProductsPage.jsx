import { ContainerDiv } from "../components/ContainerDiv";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { Box, Button, CircularProgress } from "@mui/material";
import { useCallback, useEffect, useState, useTransition } from "react";
import VirtualProductList from "../components/product/VirtualProductList";
import { BottomBar } from "../components/product/BottomBar";
import {
  customLocaleCompare,
  customLocaleLowerCase,
  getFavorites,
} from "../helpers";
import { TopFilterSelect } from "../components/product/TopFilterSelect";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useAuthContext } from "../context/auth/AuthContext";
import { useTranslation } from "react-i18next";
const topSections = [
  "A",
  "B",
  "C-D",
  "E-F",
  "G-I",
  "K",
  "L-N",
  "P",
  "R-S",
  "Ş-T",
  "Ü-Z",
];
//TODO custom item for categeries 
export default function ProductsPage() {
  const { t } = useTranslation();
  const { categories, products } = useOutletContext();
  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  const [searcParam, setSearchParams] = useSearchParams();
  const [filterByAlpahbet, setFilterByAlpahbet] = useState("-");
  const [currentData, setCurrentData] = useState(null);
  const [isLoading, setIsLoading] = useState();
  const [isFavorites, setIsFavorites] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState("");
  const { user } = useAuthContext();

  const handleAlpahbet = (x) => {
    if (filterByAlpahbet === "-") {
      return true;
    }
    if (filterByAlpahbet.includes("-")) {
      const newSections = filterByAlpahbet.split("-");
      const chr1 = customLocaleLowerCase(newSections[0]);
      const chr2 = customLocaleLowerCase(newSections[1]);
      const base = customLocaleLowerCase(x.name.charAt(0));
      const bigger = customLocaleCompare(base, chr1);
      const smaller = customLocaleCompare(chr2, base);
      return bigger && smaller;
    } else {
      const newData = x.name
        .toLowerCase()
        .startsWith(filterByAlpahbet.toLowerCase());
      return newData;
    }
  };
  const handleFilter = () => {
    const newData = products.filter((product) => {
      const categoryCondition =
        currentCategory.url === ""
          ? product
          : product.category_name === currentCategory.category;

      const alphabedCondition = handleAlpahbet(product);
      const crntQuery = searcParam.get("query");
      let queryCondition;

      if (!crntQuery) {
        queryCondition = true;
      } else {
        queryCondition =
          customLocaleLowerCase(product.name).includes(
            customLocaleLowerCase(crntQuery)
          ) || product.barcode.includes(crntQuery.toLowerCase());
      }
      let showFavorites = true;
      if (isFavorites) {
        const favs = JSON.parse(getFavorites()) || [];
        const userFavs = favs.find((x) => x.id === user.userCode);
        if (userFavs) {
          showFavorites = userFavs.products.includes(product.id);
        } else {
          showFavorites = false;
        }
      }

      return (
        alphabedCondition &&
        categoryCondition &&
        queryCondition &&
        showFavorites
      );
    });
    setIsLoading(true);
    setTimeout(() => {
      startTransition(() => {
        setCurrentData(newData);
        setIsLoading(false);
      });
    }, 400);
  };

  const handleSetCategory = (x) => {
    setCurrentCategory(x);
  };

  const hadnleSetAlphabetFilter = (x) => {
    setFilterByAlpahbet(x);
  };

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      setSearchParams({ query: query });
    },
    [query]
  );
  const handleResetSearch = () => {
    setSearchParams({ query: "" });
    setQuery("");
  };
  useEffect(() => {
    handleFilter();
  }, [currentCategory, filterByAlpahbet, searcParam, isFavorites]);

  return (
    <ContainerDiv
      toolbarSx={(theme) => ({
        display: "none",
        [theme.breakpoints.down("md")]: {
          display: "unset",
        },
      })}
      sx={{
        justifyContent: "flex-start",
        position: "relative",
      }}
    >
      <Box
        sx={{
          height: 70,
          display: "flex",
          alignItems: "center",
          width: "100%",
          borderBottom: 1,
          borderBottomColor: "customSecondary",
          borderBottomStyle: "solid",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Button onClick={() => setIsFavorites((prev) => !prev)}>
          {isFavorites ? (
            <StarIcon color="primary" />
          ) : (
            <StarBorderIcon color="primary" />
          )}
        </Button>
        <TopFilterSelect
          currentValue={filterByAlpahbet}
          list={["-", ...topSections]}
          handleSelect={hadnleSetAlphabetFilter}
          label={t("filterAlphabetLabel")}
        />
        <TopFilterSelect
          currentValue={currentCategory}
          list={categories}
          showCustomValue={(x) => x.category}
          handleSelect={handleSetCategory}
          label={t("filterCategoryLabel")}
        />
      </Box>
      <Box
        sx={(theme) => ({
          width: "100%",
          marginTop: "10px",
          height: "calc(100vh - 140px)",
          [theme.breakpoints.down("md")]: {
            height: "calc(100vh - 204px)",
          },
          [theme.breakpoints.down("sm")]: {
            height: "calc(100vh - 204px)",
          },
          paddingBottom: 1,
          paddingX: 2,
        })}
      >
        {isLoading || isPending || !currentData ? (
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress size={32} />
          </div>
        ) : (
          <VirtualProductList data={currentData} />
        )}
      </Box>
      <BottomBar
        handleReset={handleResetSearch}
        handleSearch={handleSearch}
        query={query}
        setQuery={setQuery}
      />
    </ContainerDiv>
  );
}

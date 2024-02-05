import {
  Box,
  Divider,
  ListItemButton,
  TextField,
  List,
  Pagination,
  Typography,
  CardMedia,
  IconButton,
  Button,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import usePagination from "../../hooks/usePagination";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReplayIcon from "@mui/icons-material/Replay";
import { customLocaleLowerCase } from "../../helpers";
import { useTranslation } from "react-i18next";

const initialFilterState = {
  query: "",
  currentCategory: {
    category: "Hepsi",
    url: "",
  },
};

export const AccordionProducts = ({
  categories,
  products,
  selectedProduct,
  setSelectedProduct,
}) => {
  const [currentCategory, setCurrentCategory] = useState(
    initialFilterState.currentCategory
  );
  const { t } = useTranslation();
  const [query, setQuery] = useState(initialFilterState.query);
  const pageTopRef = useRef(null);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState(initialFilterState.query);

  const PER_PAGE = 10;
  const _DATA = usePagination(
    products.filter((x) => {
      const categoryConditio =
        currentCategory.url === ""
          ? true
          : x.category_name === currentCategory.category;
      const queryCondition =
        query.trim().length === 0
          ? true
          : customLocaleLowerCase(x.name).includes(
              customLocaleLowerCase(query)
            ) || x.barcode === query;
      return queryCondition && categoryConditio;
    }),
    PER_PAGE
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim().length > 0) {
      setQuery(searchText);
      setCurrentCategory(initialFilterState.currentCategory);
    }
  };

  const handleResetSearch = () => {
    setQuery(initialFilterState.query);
    setSearchText(initialFilterState.query);
    setCurrentCategory(initialFilterState.currentCategory);
  };

  const handleResetSelectedProduct = () => {
    setSelectedProduct(null);
  };

  const handleSelectProduct = (item) => {
    if (item !== selectedProduct) {
      setSelectedProduct(item);
    }
  };

  const handleChangePagination = (e, p) => {
    setPage(p);
    _DATA.jump(p);
    pageTopRef.current.scrollTo(0, 0);
  };

  const AccordionProductCard = ({ item }) => (
    <Box
      sx={{
        width: 310,
        height: 450,
        border: 1,
        borderColor: "secondary.main",
        bgcolor: "customInput",
        borderRadius: 1,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={() => handleSelectProduct(item)}
    >
      {selectedProduct === item ? (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: "rgba(0, 0, 0, 0.63)",
            borderRadius: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            zIndex: "100",
          }}
        >
          <Typography
            sx={{
              bgcolor: "black",
              padding: 1,
              width: 120,
              textAlign: "center",
              color: "#fff",
            }}
          >
            {t("selected")}
          </Typography>
          <Button
            onClick={handleResetSelectedProduct}
            sx={{
              padding: 1,
              width: 120,
              textAlign: "center",
            }}
            color="error"
          >
            {t("cancel")}
          </Button>
        </Box>
      ) : null}
      <CardMedia
        component="img"
        height={300}
        sx={{ borderRadius: 1, objectFit: "" }}
        image={item.img_url}
      />
      <Box sx={{ width: "100%", padding: 1 }}>
        <Typography>{item.name}</Typography>
        <Typography>price: {item.price}</Typography>
      </Box>
    </Box>
  );

  const CustomListItem = ({ value }) => {
    return (
      <Button
        onClick={() => setCurrentCategory(value)}
        color={`${currentCategory.url === value.url ? "primary" : "secondary"}`}
        sx={{
          border: 1,
          p: 2,
          borderColor: "secondary.main",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 1,
          flexShrink: 0,
        }}
      >
        {value.category}
      </Button>
    );
  };

  useEffect(() => {
    setPage(1);
    _DATA.jump(1);
    pageTopRef.current.scrollTo(0, 0);
  }, [currentCategory]);
  return (
    <>
      <Box
        sx={{
          height: 50,
        }}
      >
        <form
          style={{
            width: "100%",
            padding: 1,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
          onSubmit={handleSearch}
        >
          <IconButton onClick={handleResetSearch}>
            <ReplayIcon size="large" />
          </IconButton>
          <TextField
            color="secondary"
            sx={{ bgcolor: "customInput", borderRadius: 1 }}
            fullWidth
            size="small"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
          <IconButton type="submit">
            <CheckCircleIcon fontSize="large" />
          </IconButton>
        </form>
      </Box>
      <Divider />
      <Box sx={{ height: "calc(100% - 50px)" }}>
        <Box
          sx={{
            width: "100%",
            overflow: "auto",
            display: "flex",
            gap: 2,
            height: 60,
            boxSizing: "border-box",
            padding: 1,
            overflowY: "hidden",
          }}
        >
          <CustomListItem value={initialFilterState.currentCategory} />
          {categories.map((x) => (
            <CustomListItem key={x.url} value={x} />
          ))}
        </Box>
        <Box
          sx={{
            height: "calc(100% - 60px)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            ref={pageTopRef}
            sx={{
              flexBasis: "100%",
              overflowY: "auto",
              display: "flex",
              gap: 2,
              padding: 2,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {_DATA.currentData().map((x) => (
              <AccordionProductCard key={x.id} item={x} />
            ))}
          </Box>
          <Box
            sx={{
              flexBasis: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pagination
              count={_DATA.maxPage}
              page={page}
              onChange={handleChangePagination}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

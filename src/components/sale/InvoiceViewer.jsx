import { useRef, useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { Box, Fab, Typography } from "@mui/material";
import { pdfjs } from "react-pdf";
import PrintIcon from "@mui/icons-material/Print";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export const InvoiceViewer = ({ url }) => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const ref = useRef(null);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const handleNextPage = () => {
    if (numPages > pageNumber) {
      setPageNumber((prev) => prev + 1);
    }
  };
  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
  };
  const print = () => {
    var myWindow = window.open(url, "", "width=500,height=500");
    myWindow.print();
  };
  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        overflow: "auto",
      }}
    >
      <Document
        loading={null}
        onLoadSuccess={onDocumentLoadSuccess}
        file={url}
        renderMode="canvas"
      >
        {ref.current ? (
          <Page pageNumber={pageNumber} height={ref.current.clientHeight} />
        ) : null}
      </Document>
      {numPages > 1 ? (
        <Box
          sx={{
            position: "absolute",
            bottom: -20,
            borderRadius: 5,
            border: 2,
            borderColor: "secondary.main",
            display: "flex",
            alignItems: "center",
            bgcolor: "primary.main",
            justifyContent: "center",
          }}
        >
          <Fab size="medium" onClick={handlePrevPage}>
            <NavigateBeforeIcon />
          </Fab>
          <Typography sx={{}}>
            {pageNumber} / {numPages}
          </Typography>
          <Fab size="medium" onClick={handleNextPage}>
            <NavigateNextIcon />
          </Fab>
        </Box>
      ) : null}
      <Fab
        sx={{ position: "absolute", bottom: -20, right: -20 }}
        onClick={print}
      >
        <PrintIcon />
      </Fab>
    </Box>
  );
};

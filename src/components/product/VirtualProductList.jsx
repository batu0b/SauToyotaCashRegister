import * as React from "react";
import { AutoSizer, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import Masonry, {
  createCellPositioner,
} from "react-virtualized/dist/es/Masonry";
import { ProductCard } from "./ProductCard";

const VirtualProductList = ({ data }) => {
  const [columnWidth, setColumnWidth] = React.useState(300);
  const [gutterSize, setGutterSize] = React.useState(20);
  const [overscanByPixels, setOverscanByPixels] = React.useState(120);
  const [columnCount, setColumnCount] = React.useState(0);
  const [cache, setCatche] = React.useState(
    new CellMeasurerCache({
      defaultHeight: 500,
      defaultWidth: 300,
      fixedWidth: true,
    })
  );

  const widthRef = React.useRef(0);
  const masonryRef = React.useRef(null);
  const cellPositionerRef = React.useRef(null);

  React.useEffect(() => {
    calculateColumnCount();
    resetCellPositioner();
    if (masonryRef.current) {
      masonryRef.current.recomputeCellPositions();
    }
  }, [columnWidth, gutterSize, widthRef.current]);

  const calculateColumnCount = () => {
    setColumnCount(Math.floor(widthRef.current / (columnWidth + gutterSize)));
  };

  const cellRenderer = ({ index, key, parent, style }) => {
    return (
      <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
        <ProductCard style={style} product={data[index]} />
      </CellMeasurer>
    );
  };

  const initCellPositioner = () => {
    if (!cellPositionerRef.current) {
      cellPositionerRef.current = createCellPositioner({
        cellMeasurerCache: cache,
        columnCount: columnCount,
        columnWidth: columnWidth,
        spacer: gutterSize,
      });
    }
  };

  const onResize = ({ width }) => {
    widthRef.current = width;
    calculateColumnCount();
    resetCellPositioner();
    if (masonryRef.current) {
      masonryRef.current.recomputeCellPositions();
    }
  };

  const renderMasonry = ({ width, height }) => {
    widthRef.current = width;
    calculateColumnCount();
    initCellPositioner();
    return (
      <Masonry
        autoHeight={false}
        cellCount={data.length}
        cellMeasurerCache={cache}
        cellPositioner={cellPositionerRef.current}
        cellRenderer={cellRenderer}
        height={height}
        overscanByPixels={overscanByPixels}
        ref={masonryRef}
        width={width}
      />
    );
  };

  const resetCellPositioner = () => {
    if (cellPositionerRef.current) {
      cellPositionerRef.current.reset({
        columnCount: columnCount,
        columnWidth: columnWidth,
        spacer: gutterSize,
      });
    }
  };

  return <AutoSizer onResize={onResize}>{renderMasonry}</AutoSizer>;
};

export default VirtualProductList;

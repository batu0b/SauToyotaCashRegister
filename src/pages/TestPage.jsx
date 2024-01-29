import * as React from "react";
import { AutoSizer, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import Masonry, {
  createCellPositioner,
} from "react-virtualized/dist/es/Masonry";

const GridExample = () => {
  const [columnWidth, setColumnWidth] = React.useState(200);
  const [height, setHeight] = React.useState(300);
  const [gutterSize, setGutterSize] = React.useState(10);
  const [overscanByPixels, setOverscanByPixels] = React.useState(30);
  const [columnCount, setColumnCount] = React.useState(0);

  const [cache] = React.useState(
    new CellMeasurerCache({
      defaultHeight: 250,
      defaultWidth: 200,
      fixedWidth: true,
    })
  );

  const widthRef = React.useRef(0);
  const heightRef = React.useRef(0);
  const scrollTopRef = React.useRef(0);
  const masonryRef = React.useRef(null);
  const cellPositionerRef = React.useRef(null);

  React.useEffect(() => {
    calculateColumnCount();
    resetCellPositioner();
    if (masonryRef.current) {
      console.log("run");
      masonryRef.current.recomputeCellPositions();
    }
  }, [columnWidth, gutterSize, widthRef.current]);

  const calculateColumnCount = () => {
    setColumnCount(Math.floor(widthRef.current / (columnWidth + gutterSize)));
  };

  const cellRenderer = ({ index, key, parent, style }) => {
    return (
      <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
        <div
          style={{
            ...style,
            width: columnWidth,
            background: "red",
          }}
        >
          <div
            style={{
              borderRadius: "0.5rem",
              marginBottom: "0.5rem",
              width: "100%",
              fontSize: 20,
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {index}
          </div>
        </div>
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
    // calculateColumnCount();
    // resetCellPositioner();
    // if (masonryRef.current) {
    //   masonryRef.current.recomputeCellPositions();
    // }
  };

  const renderAutoSizer = ({ height, scrollTop }) => {
    heightRef.current = height;
    scrollTopRef.current = scrollTop;
    return (
      <AutoSizer
        disableHeight
        style={{ height: "100%", background: "blue" }}
        onResize={onResize}
        overscanByPixels={overscanByPixels}
        scrollTop={scrollTop}
      >
        {renderMasonry}
      </AutoSizer>
    );
  };

  const renderMasonry = ({ width }) => {
    widthRef.current = width;
    calculateColumnCount();
    initCellPositioner();
    return (
      <Masonry
        autoHeight={false}
        style={{ background: "blue" }}
        cellCount={1000}
        cellMeasurerCache={cache}
        cellPositioner={cellPositionerRef.current}
        cellRenderer={cellRenderer}
        height={height}
        overscanByPixels={overscanByPixels}
        ref={masonryRef}
        scrollTop={scrollTopRef.current}
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

  return <>{renderAutoSizer({ height })}</>;
};

export default GridExample;

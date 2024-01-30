import GridExample from "./VirtualProductList";
import { ContainerDiv } from "../components/ContainerDiv";
import { useOutletContext } from "react-router-dom";

export const Test2 = () => {
  const { products } = useOutletContext();
  console.log(products.length);
  return (
    <ContainerDiv sx={{ height: "100vh" }}>
      <div style={{ height: "100%", width: "100%" }}>
        <GridExample data={products} />
      </div>
    </ContainerDiv>
  );
};

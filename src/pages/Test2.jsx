import GridExample from "./TestPage";
import { ContainerDiv } from "../components/ContainerDiv";

export const Test2 = () => {
  return (
    <ContainerDiv sx={{ height: "100vh" }}>
      <div style={{ height: "100%", width: "100%" }}>
        <GridExample />
      </div>
    </ContainerDiv>
  );
};

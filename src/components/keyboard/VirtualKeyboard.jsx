import { KeyboardReact } from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./style.css";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import BackspaceIcon from "@mui/icons-material/Backspace";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ReactDomServer from "react-dom/server";

const VirtualKeyboard = forwardRef(
  ({ setInput, isNumpad = false }, keyboard) => {
    const [layoutName, setLayoutName] = useState("default");
    const numpad = {
      default: ["00 {bksp}", "7 8 9", "4 5 6", "1 2 3", "0 .", "{reset}"],
    };
    const handleShift = () => {
      const newLayoutName = layoutName === "default" ? "shift" : "default";
      setLayoutName(newLayoutName);
    };

    const onChange = (input) => {
      setInput(input);
    };

    const onKeyPress = (button) => {
      console.log("Button pressed", button);
      if (button === "{reset}") {
        setInput("");
        keyboard.current.setInput("");
      }
      if (button === "{shift}" || button === "{lock}") handleShift();
    };

    // const onChangeNumpadInput = (event) => {
    //   const input = event.target.value;
    //   setNumpadInput(input);
    //   keyboard.current.setInput(input);
    // };

    return (
      <KeyboardReact
        layoutName={layoutName}
        onChange={onChange}
        layout={isNumpad && numpad}
        theme={"hg-theme-default myTheme1"}
        keyboardRef={(r) => (keyboard.current = r)}
        onKeyPress={onKeyPress}
        display={{
          "{bksp}": ReactDomServer.renderToString(<BackspaceIcon />),
          "{shift}": "Shift",
          "{reset}": ReactDomServer.renderToString(<RestartAltIcon />),
        }}
      />
    );
  }
);

VirtualKeyboard.displayName = "VirtualKeyboard";
export { VirtualKeyboard };

import { styled } from "stitches.config";
export default styled("nav", {
  position: "fixed",
  right: 0,
  bottom: 0,
  left: 0,

  height: 60,

  display: "flex",
  align: "center",
  justify: "space-evenly",

  bg: "white",
  shadow: "0 0 10px -10px $light",
  color: "var(--grey)",
  fontSize: 30,

  ondark: {
    bg: "$darker",
    shadow: "0 0 0px 1px #5555",
  },
});

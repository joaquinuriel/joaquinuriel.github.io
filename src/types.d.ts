import * as react from "react";

interface Props {
  children?: react.ReactNode;
  [key: string]: any;
}

type InputHandler = react.ChangeEventHandler<HTMLInputElement>

interface HandleWith {
  (set: react.Dispatch<react.SetStateAction<string>>): (
    e: react.ChangeEvent<HTMLInputElement>
  ) => void;
}

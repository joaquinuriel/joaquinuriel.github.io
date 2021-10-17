import { motion } from "framer-motion";
import { Props } from "src/types";

export default function Btn({ children, cn, id, ...props }: Props) {
  return (
    <motion.button className={cn} layout layoutId={id} {...props}>
      {children}
    </motion.button>
  );
}

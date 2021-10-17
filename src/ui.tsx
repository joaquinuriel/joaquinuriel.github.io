import { motion } from "framer-motion";
import { Props } from "./types";

// export function Box({ children }: Props) {
//   return <motion.div className="flexbox">{children}</motion.div>;
// }

export const Box = ({ children }: Props) => (
  <motion.div className="flexbox">{children}</motion.div>
);

export const Block = ({ children }: Props) => (
  <motion.section className="block">{children}</motion.section>
);

export const Stack = ({ children, ...styles }: Props) => (
  <motion.div
    style={{
      display: "flex",
      flexDirection: styles.column || undefined,
      alignItems: styles.start || styles.center || styles.end || undefined,
      justifyContent: styles.center
        ? "center"
        : styles.space_between
        ? "space-between"
        : styles.space_evenly
        ? "space-evenly"
        : styles.space_around
        ? "space-around"
        : undefined,
    }}
    className={Object.keys(styles).join(" ")}
  >
    {children}
  </motion.div>
);

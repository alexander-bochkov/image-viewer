import { motion } from "motion/react";
import { Spinner } from "shared/icons";

import styles from "./loader.module.css";

export const Loader = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 0.8, ease: "linear", repeat: Infinity }}
  >
    <Spinner className={styles.loader} />
  </motion.div>
);

import React from "react";
import { motion } from "framer-motion";

const FadeIn = ({ children, x }) => {
  return (
    <motion.div
      animate={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: x }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;

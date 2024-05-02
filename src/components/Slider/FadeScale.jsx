import { motion } from "framer-motion";

const variants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};
const FadeScale = (props) => {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      transition={{ ease: "easeOut", duration: 2 }}
      whileInView="animate"
    >
      {props.children}
    </motion.div>
  );
};

export default FadeScale;

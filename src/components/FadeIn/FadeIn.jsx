import { delay, motion } from "framer-motion";

const FadeIn = ({ children, x, ...props }) => {
  const variants = {
    initial: {
      x: x,
      y: props.y,
      opacity: 0,
    },
    animate: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.1,
        delay: props.delay,
      },
    },
  };
  return (
    <motion.div variants={variants} initial="initial" whileInView="animate">
      {children}
    </motion.div>
  );
};

export default FadeIn;

import "../Greeting/Greeting.scss";
import { motion } from "framer-motion";

const Greeting = () => {
  return (
    <motion.div
      className="greeting"
      animate={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: -30 }}
      transition={{ duration: 1 }}
    >
      <p>HELLO, My name is</p>
      <p>
        <b>Hoang Pham</b>
      </p>
      <i>Software Engineer @ExecutionLab</i>
    </motion.div>
  );
};

export default Greeting;

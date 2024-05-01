import { motion } from "framer-motion";
import "../Resume/Resume.scss";

export default function Resume() {
  return (
    <motion.div
    className="resume"
      animate={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: 30 }}
      transition={{ duration: 1 }}
    >
      <p>
        <i>
          <b>
            A tech aficionado from PhuRieng, born in '92. UIT University honed
            my skills in Dart, Kotlin, Swift, and Python. Two years in mobile
            development taught me the art of crafting user-friendly apps, while
            a year in backend development solidified my Python prowess. Eager
            for innovation, I ventured into the cloud with Google Cloud, AWS.
            Today, I stand as a digital pioneer, driven by curiosity and a
            thirst for pushing boundaries. With each project, I strive to
            redefine the limits of technology, leaving a lasting impact on the
            world of software engineering.
          </b>
        </i>
      </p>
    </motion.div>
  );
}

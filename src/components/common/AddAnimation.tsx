import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
interface Props {
  children: JSX.Element;
  width?: "fit-content" | "100%";
  slider?: boolean;
}

export const AddAnimation = ({ children, width = "100%" }: Props) => {
  const ref = useRef(null);
  const isInview = useInView(ref, { once: true });
  const mainContruls = useAnimation();
  const sliderContruls = useAnimation();

  useEffect(() => {
    if (isInview) {
      mainContruls.start("visible");
      sliderContruls.start("visible");
    }
  }, [isInview]);

  return (
    <div ref={ref}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainContruls}
        transition={{ duration: 0.75, delay: 0.25 }}
      >
        {children}
      </motion.div>
      {/* <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate={sliderContruls}
        transition={{ duration: 0.75, ease: "easeIn" }}
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          background: "green",
          opacity: 0.5,
          zIndex: 20,
        }}
      /> */}
    </div>
  );
};

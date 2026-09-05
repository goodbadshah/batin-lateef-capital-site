"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  type = "button",
  disabled,
}: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18 });
  const springY = useSpring(y, { stiffness: 180, damping: 18 });
  const rotate = useTransform(springX, [-12, 12], [-1.2, 1.2]);

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.18);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.18);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const shared =
    "inline-flex items-center justify-center whitespace-nowrap transition-colors active:scale-[0.98] " +
    className;

  const motionProps = {
    style: reduce ? undefined : { x: springX, y: springY, rotate },
    onMouseMove: onMove,
    onMouseLeave: onLeave,
  };

  if (href) {
    return (
      <motion.a ref={ref} href={href} className={shared} {...motionProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={shared}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}

"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

// 1. Create the context
interface TransitionContextType {
  isTransitioning: boolean;
  startTransition: () => void;
  completeTransition: () => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(
  undefined
);

const useTransition = (): TransitionContextType => {
  const context = useContext(TransitionContext);
  if (context === undefined) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
};

// 2. Create the TransitionProvider component
const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = () => setIsTransitioning(true);
  const completeTransition = () => setIsTransitioning(false);

  return (
    <TransitionContext.Provider
      value={{ isTransitioning, startTransition, completeTransition }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

// 3. Create the TransitionOverlay component
const TransitionOverlay: React.FC = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const { isTransitioning, completeTransition } = useTransition();

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (isTransitioning) {
      // Fade in animation
      gsap.set(overlay, { visibility: "visible" });
      gsap.to(overlay, {
        duration: 0.5,
        opacity: 1,
        ease: "power2.inOut",
        onComplete: () => {
          // Wait briefly before fading out
          setTimeout(() => {
            gsap.to(overlay, {
              duration: 1,
              opacity: 0,
              ease: "power2.inOut",
              onComplete: () => {
                gsap.set(overlay, { visibility: "hidden" });
                completeTransition();
              },
            });
          }, 200); // Adjust timing as needed
        },
      });
    }
  }, [isTransitioning, completeTransition]);

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "black",
        zIndex: 9999,
        opacity: 0,
        visibility: "hidden",
        pointerEvents: "none",
      }}
    />
  );
};

// 4. Create the TransitionContent component
interface TransitionContentProps {
  children: ReactNode;
}

const TransitionContent: React.FC<TransitionContentProps> = ({ children }) => {
  const pathname = usePathname();
  const { startTransition } = useTransition();
  const previousPathRef = useRef<string | null>(null);

  useEffect(() => {
    // Skip initial render
    if (previousPathRef.current === null) {
      previousPathRef.current = pathname;
      return;
    }

    // If path changed, trigger transition
    if (previousPathRef.current !== pathname) {
      startTransition();
      previousPathRef.current = pathname;
    }
  }, [pathname, startTransition]);

  return <>{children}</>;
};

// 5. Export the main TransitionLayout component
interface TransitionLayoutProps {
  children: ReactNode;
}

export const TransitionLayout: React.FC<TransitionLayoutProps> = ({
  children,
}) => {
  return (
    <TransitionProvider>
      <TransitionContent>{children}</TransitionContent>
      <TransitionOverlay />
    </TransitionProvider>
  );
};

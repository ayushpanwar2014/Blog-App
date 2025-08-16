"use client";
import { createContext, useContext, useRef } from "react";
import LoadingBar from "react-top-loading-bar";

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const ref = useRef(null);

  const startProgress = () => {
    ref.current?.continuousStart();
  };

  const completeProgress = () => {
    ref.current?.complete();
  };

  return (
    <ProgressContext.Provider value={{ startProgress, completeProgress }}>
      <LoadingBar
        id="top-loading-bar"
        color="#000000"
        ref={ref}
        shadow
        height={4}
        className="rounded-full"
      />
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);

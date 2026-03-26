import { RouterProvider } from "react-router";
import { router } from "./routes";
import "../styles/fonts.css";

export default function App() {
  return (
    <>
      <svg width="0" height="0" className="absolute" style={{ visibility: "hidden" }}>
        <filter id="hand-drawn-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <RouterProvider router={router} />
    </>
  );
}

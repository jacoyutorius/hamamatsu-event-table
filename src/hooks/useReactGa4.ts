import ReactGA from "react-ga4";

export const useReactGa4 = () => {
  if (import.meta.env.VITE_GA4_ID) ReactGA.initialize(import.meta.env.VITE_GA4_ID);
}
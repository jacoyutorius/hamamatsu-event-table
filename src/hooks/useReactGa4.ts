import ReactGA from "react-ga4";

export const useReactGa4 = () => {
  if (process.env.REACT_APP_GA4_ID) ReactGA.initialize(process.env.REACT_APP_GA4_ID);
}
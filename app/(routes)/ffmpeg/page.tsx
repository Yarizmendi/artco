'use client'

import NoSSRWrapper from "../../NoSSR";
import Home from "./Home";

export default function Page() {
  return <NoSSRWrapper><Home /></NoSSRWrapper>
}
import React from "react";

import { ChakraProvider } from "@chakra-ui/core";
import customTheme from "../theme";
import Page from "../Components/Page";
import AppRouter from "../routes";
import { AppProvider } from "./AppProvider.js";
import LoadingView from "../Components/LoadingView.js";


function Main() {
  return (
    <Page bg="gray.900">
      <AppRouter />
    </Page>
  );
}

function App() {
  return (
    <ChakraProvider theme={customTheme}>
        <React.Suspense fallback={ <LoadingView/> }>
            <AppProvider>
            <Main />
            </AppProvider>
        </React.Suspense>
    </ChakraProvider>

 
  );
}

export default App;

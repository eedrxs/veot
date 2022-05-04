import React, { useState, useEffect } from "react";
import { HashConnect } from "hashconnect";
import HomePage from "./components/homePage";
import PollPage from "./components/pollPage";
import SetupDialog from "./components/setupDialog";
import ConnectPage from "./components/connectPage";

const App = () => {
  // const hashconnect = new HashConnect();
  const [account, setAccount] = useState();
  const [fetchedPolls, fetchPolls] = useState();

  return <ConnectPage /* hashconnect={hashconnect} onConnect={setAccount} */ />;
  // return <PollPage />;
  return (
    <React.Fragment>
      {/* <SetupDialog /> */}
      <HomePage />
    </React.Fragment>
  );
};

export default App;

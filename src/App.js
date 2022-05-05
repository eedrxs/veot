import React, { useState, useEffect } from "react";
// import { HashConnect } from "hashconnect";
import HomePage from "./components/homePage";
// import PollPage from "./components/pollPage";
// import SetupDialog from "./components/setupDialog";
import ConnectPage from "./components/connectPage";

const App = () => {
  const [session, setSession] = useState();
  const [setupDialog, activateSetupDialog] = useState({});

  if (!session) return <ConnectPage setSession={setSession} />;
  // return <PollPage />;
  return (
    <React.Fragment>
      {/* <SetupDialog /> */}
      <HomePage />
    </React.Fragment>
  );
};

export default App;

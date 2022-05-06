import React, { useState, useEffect } from "react";
import { ConnectPage, HomePage, PollPage } from "./components/index";

const App = () => {
  const [session, setSession] = useState();

  if (!session) return <ConnectPage setSession={setSession} />;
  return (
    <React.Fragment>
      <HomePage session={session} />
    </React.Fragment>
  );
};

export default App;

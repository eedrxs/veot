import React, { useState, useEffect } from "react";
import { ConnectPage, HomePage, PollPage } from "./components/index";

const App = () => {
  const [signer, setSigner] = useState();
  const [joinedPoll, setJoinedPoll] = useState([]);

  if (!signer) return <ConnectPage setSigner={setSigner} />;
  return (
    <React.Fragment>
      <HomePage signer={signer} setJoinedPoll={setJoinedPoll} />
      {joinedPoll.length ? (
        <PollPage
          details={joinedPoll.details}
          address={joinedPoll.address}
          setJoinedPoll={setJoinedPoll}
        />
      ) : null}
    </React.Fragment>
  );
};

export default App;

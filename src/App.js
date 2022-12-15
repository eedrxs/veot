import { useState } from "react";
import { ConnectPage, HomePage, PollPage } from "./components/index";

const App = () => {
  const [signer, setSigner] = useState();
  const [joinedPoll, setJoinedPoll] = useState(null);

  if (!signer) return <ConnectPage setSigner={setSigner} />;
  return (
    <>
      <HomePage signer={signer} setJoinedPoll={setJoinedPoll} />
      {joinedPoll ? (
        <PollPage
          details={joinedPoll.details}
          address={joinedPoll.address}
          setJoinedPoll={setJoinedPoll}
          signer={signer}
        />
      ) : null}
    </>
  );
};

export default App;

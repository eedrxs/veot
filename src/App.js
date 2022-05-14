import React, { useState, useEffect } from "react";
import { ConnectPage, HomePage, PollPage } from "./components/index";

const App = () => {
  const [signer, setSigner] = useState();
  // const [session, setSession] = useState();
  // const [account, setAccount] = useState({ id: null, privateKey: null });

  if (!signer)
    return <ConnectPage /*setAccount={setAccount}*/ setSigner={setSigner} />;
  return (
    <React.Fragment>
      <HomePage /*account={account}*/ signer={signer} />
      {/* <PollPage /> */}
    </React.Fragment>
  );
};

export default App;

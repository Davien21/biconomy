import React from "react";
import { Header } from "../../components";
import { useAppContext } from "../../contexts/appContext";
import styles from "./home.module.scss";
import Modal from "../../components/Modal";

function Home() {
  // const { USDTData, transactions } = useAppContext();
  const { isConnected } = useAppContext();

  return (
    <div className={`${styles["container"]}`}>
      <Modal />
      <Header />
      <main className={`pb-5 container`}>
        <div className={styles.inner__con}>
          <div className={styles.inner__con__right}>
            <h1>
              BICO <span>Apes!</span>
            </h1>
            <h2>
              Please connect your wallet to chat with other Bico Apes NFT Owners
            </h2>
            {isConnected ? (
              <button>Continue!</button>
            ) : (
              <button>Connect Wallet!</button>
            )}
          </div>
          {/* <div className={styles.inner__con__left}>
            <button>Connect Wallet!</button>
          </div> */}
        </div>
      </main>
    </div>
  );
}

export { Home };

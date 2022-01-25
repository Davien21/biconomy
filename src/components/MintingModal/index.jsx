import React, { useEffect, useRef, useState } from "react";
import { RadioBox, Wizard, CloseButton, Button } from "../../components";
import styles from "./minting-modal.module.css";

function MintingModal({ isActive, setIsActive }) {
  const containerRef = useRef();
  const [containerClass, setContainerClass] = useState(
    `${styles["container"]}`
  );
  const [currentScreen, setCurrentScreen] = useState(1);
  const [transactionFee, setTransactionFee] = useState("0.00");
  const [selectedToken, setSelectedToken] = useState("");
  const closeModal = () => {
    setIsActive(false);
  };

  useEffect(() => {
    document.body.style.overflow = isActive ? "hidden" : "auto";
    if (isActive) {
      containerRef.current.style.display = "flex";
      setTimeout(() => {
        setContainerClass((value) => (value += ` ${styles["active"]}`));
      }, 50);
    }
    if (!isActive) {
      document.body.style.overflow = "auto";
      setContainerClass(`${styles["container"]}`);
      setTimeout(() => {
        containerRef.current.style.display = "none";
      }, 400);
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isActive, setIsActive]);

  return (
    <div
      // onSubmit={() => alert("submitted")}
      ref={containerRef}
      className={containerClass}
      onClick={closeModal}
    >
      <div
        className={`${styles["modal-body"]} `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between">
          <div className="px-5 pt-5 pb-4">
            <CloseButton />
          </div>
          <div className="px-5 pt-5 pb-4">
            <Wizard />
          </div>
        </div>
        <p className="mb-3 px-5 pt-4 green-gradient-text text-xl font-extrabold">
          Select tokens to pay gas fees
        </p>
        <div
          className={`flex gap-x-4 px-5 justify-center mt-7 mb-4 ${styles["token-btns"]}`}
        >
          <button className="flex-1">Ether</button>
          <button className="flex-1">Stable Coins</button>
        </div>
        <div className="p-5">
          <div className={`p-3 ${styles["screens"]}`}>
            {currentScreen === 1 && (
              <div className={`${styles["screen-1"]}`}>
                <div className="my-2 flex gap-x-10 justify-center">
                  <RadioBox
                    name="attending"
                    selectedInput={selectedToken}
                    setSelectedInput={setSelectedToken}
                    options={["USDC", "USDT", "DAI"]}
                  />
                </div>
                <div className="flex justify-center my-5">
                  <Button
                    disabled={!selectedToken}
                    onClick={() => setCurrentScreen(2)}
                  >
                    Approve
                  </Button>
                </div>
                <p className="text-center">
                  Give approval to Biconomy ERC20 Forwarder so it can deduct
                  transaction fee in selected token.
                </p>
              </div>
            )}
            {currentScreen === 2 && (
              <div className={`${styles["screen-2"]}`}>
                <div className="my-2 flex gap-x-10 justify-center">
                  <RadioBox
                    name="attending"
                    selectedInput={selectedToken}
                    setSelectedInput={setSelectedToken}
                    options={["USDC", "USDT", "DAI"]}
                  />
                </div>
                <p className="text-center">
                  Estimated transaction fee: {transactionFee}
                </p>
                <div
                  className={`flex gap-x-4 px-5 justify-center mt-7 mb-4 ${styles["token-btns"]}`}
                >
                  <button className="flex-1">Cancel</button>
                  <button className="flex-1">Proceed</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export { MintingModal };

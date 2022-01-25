import React, { useEffect, useRef, useState } from "react";
import { RadioBox, Wizard, CloseButton, Button } from "../../components";
import styles from "./minting-modal.module.scss";

function MintingModal({ isActive, setIsActive }) {
  const containerRef = useRef();
  const [containerClass, setContainerClass] = useState(
    `${styles["container"]}`
  );

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
    <form
      // onSubmit={() => alert("submitted")}
      ref={containerRef}
      className={containerClass}
      onClick={closeModal}
    >
      <div
        className={`${styles["modal-body"]} `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <div className="px-5 pt-5 pb-4 absolute top-0 right-0">
            <CloseButton />
          </div>
        </div>
        <p className="mb-3 mt-3 px-5 pt-4 green-gradient-text text-xl font-extrabold text-center">
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
            <div className={`${styles["screen-1"]} `}>
              <div className="my-2 flex gap-x-10 justify-center">
                <RadioBox name="attending" options={["USDC", "USDT", "DAI"]} />
              </div>
              <div className="flex justify-center">
                <Button>Approve</Button>
              </div>
            </div>
            <div className={`${styles["screen-2"]}`}></div>
          </div>
        </div>
      </div>
    </form>
  );
}

export { MintingModal };

import React from "react";
import { WalletButton } from "../index";
import Logo from "../../assets/images/logo.png";

import styles from "./header.module.scss";

function Header(props) {
  return (
    <header className={`${styles.container} `}>
      <div className="container py-7">
        <div className="flex justify-between items-center">
          <div>
            <img src={Logo} alt="" className={`${styles.logo}`} />
            <span className={styles.name}>$BICO</span>
          </div>
          <div className="flex justify-between">
            <div className="flex-1">
              <a
                className=""
                rel="noreferrer"
                target="_blank"
                href="https://tether.to/faqs/"
              >
                FAQ
              </a>
            </div>
            <div className="flex-1">
              <WalletButton />
            </div>
            {/* // eslint-disable-next-line jsx-a11y/anchor-has-content */}
          </div>
        </div>
      </div>
    </header>
  );
}

export { Header };

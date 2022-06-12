import React, { useEffect, useState } from "react";
import Image from "next/image";
import logoML from "../../public/Logo_ML.png";
import styles from "./navbar.module.scss";
import SearchBar from "../shared/searchBar/searchBar";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState<string>(
    router.query.search
      ? Array.isArray(router.query.search)
        ? router.query.search[0]
        : router.query.search
      : ""
  );

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!searchValue) {
      return;
    }
    router.push({
      pathname: "/items",
      query: { search: searchValue },
    });
  };

  return (
    <header className={styles["nav-header"]}>
      <div className={styles["nav-header-container"]}>
        <Image
          className={styles["nav-header-logo"]}
          src={logoML}
          alt="Mercado Libre logo"
          onClick={() => {
            setSearchValue("");
            router.push("/", undefined, { shallow: true });
          }}
        />
        <div className={styles["nav-header-search"]}>
          <SearchBar
            searchValue={searchValue}
            handleSearch={(evt) => setSearchValue(evt.target.value)}
            placeholder="Nunca dejes de buscar"
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;

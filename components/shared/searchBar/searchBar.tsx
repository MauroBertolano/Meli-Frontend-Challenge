import Image from "next/image";
import React from "react";
import searchLogo from "../../../public/ic_Search.png";
import styles from "./searchBar.module.scss";

interface SearchBarProps {
  searchValue: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchValue,
  handleSearch,
  placeholder,
  handleSubmit,
}) => {
  return (
    <form className={styles["search-bar"]} onSubmit={handleSubmit}>
      <input
        className={styles["search-bar-input"]}
        value={searchValue}
        onChange={handleSearch}
        placeholder={placeholder}
        type="text"
        id="searchValue"
      />
      <button
        className={styles["search-bar-btn"]}
        type="submit"
        aria-label="Buscar"
      >
        <Image
          priority
          src={searchLogo}
          alt="Icono de busqueda"
          height={15}
          width={15}
        />
      </button>
    </form>
  );
};

export default SearchBar;

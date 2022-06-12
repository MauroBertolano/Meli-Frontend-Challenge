import Navbar from "../navbar/navbar";
import styles from "./layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main role="main">
        <div className={styles["container"]}>{children}</div>
      </main>
    </>
  );
};

export default Layout;

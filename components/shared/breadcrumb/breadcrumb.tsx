import styles from "./breadcrumb.module.scss";

interface BreadcrumbProps {
  categories: string[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ categories }) => {
  return (
    <div className={styles["breadcrumb"]}>
      {categories.map((category, index) => (
        <span key={`category-${index}-${category}`}>
          {/* use icon insted of > */}
          {category} {index !== categories.length - 1 && <span>{" > "}</span>}
        </span>
      ))}
    </div>
  );
};
export default Breadcrumb;

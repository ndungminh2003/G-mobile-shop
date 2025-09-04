import styles from "@/components/loaders/dotLoader/styles.module.scss";
import { DotLoader } from "react-spinners";

export default function DotLoaderSpinner({ loading }) {
  return (
    <div className={styles.loader}>
      <DotLoader color="#2f82ff" loading={loading} />
    </div>
  );
}

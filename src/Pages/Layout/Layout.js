import styles from "./styles/styles.module.css";
import Header from "./components/Header";

const Layout = ({ children }) => {
    return ( 
        <section>
            <Header />
            <main className={styles.layerComponent}>
                {children}
            </main>
        </section>
     );
}
 
export default Layout;
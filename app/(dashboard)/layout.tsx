import { ReactNode } from 'react';
import styles from './dashboard.module.css';

const navItems = ['Overview', 'Tenants', 'Backup', 'Baselines', 'Jobs'];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>AvePoint</div>
        <nav aria-label="Dashboard navigation">
          <ul className={styles.nav}>
            {navItems.map((item) => (
              <li key={item}>
                <a className={styles.navItem} href="#">
                  <span>{item}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerText}>
            <p className="eyebrow">Welcome back</p>
            <h1>AvePoint Dashboard</h1>
            <p>Monitor tenants, baselines, and jobs from a single workspace.</p>
          </div>
          <div className={styles.select}>
            <label htmlFor="customer">Customer</label>
            <div className={styles.selectControl}>
              <select id="customer" name="customer" className={styles.selectInput} defaultValue="MockMSP">
                <option value="MockMSP">MockMSP</option>
              </select>
            </div>
          </div>
        </header>

        <section className={styles.contentCard}>{children}</section>
      </div>
    </div>
  );
}

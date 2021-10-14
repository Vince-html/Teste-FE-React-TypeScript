import Header from '../Header';
import './styles.css';

function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <div className="container">
        {children}
      </div>
    </>
  );
}

export default DefaultLayout;

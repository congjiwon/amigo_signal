import { useEffect, useState } from 'react';
import { FiChevronsUp } from 'react-icons/fi';

function TopButton() {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const ShowButtonClick = () => {
      if (window.scrollY > 1200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener('scroll', ShowButtonClick);
    return () => {
      window.removeEventListener('scroll', ShowButtonClick);
    };
  }, []);
  return (
    <div>
      {showButton && (
        <button onClick={scrollToTop} type="button" style={{ border: 'none', background: 'beige', padding: '10px' }}>
          <FiChevronsUp />
        </button>
      )}
    </div>
  );
}

export default TopButton;

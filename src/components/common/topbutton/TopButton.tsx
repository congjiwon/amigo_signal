import { useEffect, useState } from 'react';
import { FiChevronUp } from 'react-icons/fi';
import styled from 'styled-components';
import * as St from './style';

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
        <St.TopButton onClick={scrollToTop} type="button">
          <FiChevronUp style={{ color: 'white', width: '28px', height: '28px' }} />
        </St.TopButton>
      )}
    </div>
  );
}

export default TopButton;

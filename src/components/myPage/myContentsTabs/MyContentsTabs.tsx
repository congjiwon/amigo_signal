import React, { useState } from 'react';
import * as St from './style';
import Profile from '../profile/Profile';
import useMyPageTabPanel from '../../../zustand/myPageTabPanel';

interface Tab {
  label: string;
  content: React.ReactNode;
  iconUrl: string;
}

interface TabsProps {
  tabs: Tab[];
}

const MyContentsTabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  const setMyPageTabPanel = useMyPageTabPanel((state) => state.setActive);

  const handleClickTab = (index: number, status: boolean) => {
    setActiveTab(index);
    setMyPageTabPanel(index, status);
  };

  return (
    <St.MyContentsLayout>
      <St.MyContentsLeftBox className="tab-buttons">
        <Profile />
        {tabs.map((tab, index) => (
          <St.MyContentsTab key={index} className={index === activeTab ? 'active' : ''} onClick={() => handleClickTab(index, index === activeTab)}>
            <img src={tab.iconUrl} alt={`${tab.label} 메뉴 아이콘`} />
            <span>{tab.label}</span>
          </St.MyContentsTab>
        ))}
      </St.MyContentsLeftBox>

      <St.MyContentsRightBox className="tab-panels">
        {tabs.map((tab, index) => (
          <St.MyContentTabPanel key={index} className={`tab-panel ${index === activeTab ? 'active' : ''}`}>
            {tab.content}
          </St.MyContentTabPanel>
        ))}
      </St.MyContentsRightBox>
    </St.MyContentsLayout>
  );
};

export default MyContentsTabs;

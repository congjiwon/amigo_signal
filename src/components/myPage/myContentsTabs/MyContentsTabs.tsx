import React, { useState } from 'react';
import * as St from './style';
import Profile from '../profile/Profile';

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const MyContentsTabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <St.MyContentsLayout>
      <St.MyContentsLeftBox className="tab-buttons">
        <Profile />
        {tabs.map((tab, index) => (
          <St.MyContentsTab key={index} className={index === activeTab ? 'active' : ''} onClick={() => setActiveTab(index)}>
            {tab.label}
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

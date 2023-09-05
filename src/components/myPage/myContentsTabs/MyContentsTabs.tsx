import React, { useState } from 'react';
import useMyPageTabPanel from '../../../zustand/myPageTabPanel';
import Profile from '../profile/Profile';
import * as St from './style';

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
  const checkActive = useMyPageTabPanel((state) => state.active);
  console.log(checkActive);

  const handleClickTab = (index: number, status: boolean) => {
    setActiveTab(index);
    setMyPageTabPanel(index, status);
  };

  return (
    <St.MyPageLayout>
      <St.MyPageTabPanelBox className="tab-panels">
        {tabs.map((tab, index) => (
          <St.MyPageTabPanel key={index} className={`tab-panel ${index === activeTab ? 'active' : ''}`}>
            <section>
              <St.MyPageTabPanelTitle>
                <img src={tab.iconUrl} alt={`${tab.label} 아이콘`} />
                <h2>{tab.label}</h2>
              </St.MyPageTabPanelTitle>
              {tab.content}
            </section>
          </St.MyPageTabPanel>
        ))}
      </St.MyPageTabPanelBox>

      <St.MyPageLNBBox className="tab-buttons">
        <Profile />
        <St.MyPageTabs>
          {tabs.map((tab, index) => (
            <St.MyPageTab key={index} className={index === activeTab ? 'active' : ''} onClick={() => handleClickTab(index, index === activeTab)}>
              <img src={tab.iconUrl} alt={`${tab.label} 메뉴 아이콘`} />
              <span>{tab.label}</span>
            </St.MyPageTab>
          ))}
        </St.MyPageTabs>
      </St.MyPageLNBBox>
    </St.MyPageLayout>
  );
};

export default MyContentsTabs;

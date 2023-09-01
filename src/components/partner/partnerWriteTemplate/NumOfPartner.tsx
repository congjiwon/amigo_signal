import { Col, InputNumber, Row, Slider, Space } from 'antd';
import React, { useState } from 'react';

function NumOfPartner() {
  const [inputValue, setInputValue] = useState(1);

  const onChange = (newValue: number | null) => {
    if (typeof newValue == 'number') {
      setInputValue(newValue);
    }
  };

  return (
    <Space style={{ width: '100%' }} direction="vertical">
      <Row>
        <Col span={12}>
          <Slider min={1} max={10} onChange={onChange} value={inputValue} />
        </Col>
        <Col span={4}>
          <InputNumber min={1} max={10} style={{ margin: '0 16px' }} value={inputValue} onChange={onChange} />
        </Col>
      </Row>
    </Space>
  );
}

export default NumOfPartner;

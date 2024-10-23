import { FC } from 'react';
import { Radio } from 'antd';

interface ButtonGroupProps {
  selectedItem: any;
  selectedBtn: string;
  setSelectedBtn: (btn: string) => void;
  items: any[];
  className?: string;
  btnMode: 'ADD' | 'OTHER';
}

export const ButtonGroup: FC<ButtonGroupProps> = ({
  items,
  selectedItem,
  selectedBtn,
  setSelectedBtn,
  className = '',
  btnMode,
}) => {
  return (
    <Radio.Group
      size="large"
      value={selectedBtn}
      onChange={(e) => setSelectedBtn(e.target.value)}
    >
      {items.length > 0 &&
        items?.map((item: any, i: number) => (
          <Radio.Button
            key={item?.value}
            value={item?.value}
            className={`${className} rounded overflow-hidden border `}
          >
            <span className="wave-money-text">{item?.label}</span>
          </Radio.Button>
        ))}
    </Radio.Group>
  );
};

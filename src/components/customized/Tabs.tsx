import { Button } from "../common";

interface TabOption {
  key: string;
  value: string;
}

interface TabsProps {
  options: TabOption[];
  activeTab: string;
  onTabChange: (selectedValue: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ options, activeTab, onTabChange }) => {
  return (
    <div className={`${activeTab} flex justify-center space-x-4`}>
      {options.map((tab, index) => (
        <Button
          key={index}
          onClick={() => onTabChange(tab.key)}
          text={tab.value}
        />
      ))}
    </div>
  );
};

export { Tabs };

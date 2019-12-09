import React from "react";

type TabsProps = {
  id: string;
  ariaLabel: string;
  children: any[];
  defaultSelected: number;
}

type TabsState = {
  activeTab: number;
}

type TabProps = {
  tabText: string;
  children: React.ReactNode[] | React.ReactNode;
  defaultSelected?: boolean;
};

type TabButtonProps = {
  id: string;
  tabText: string;
  selected: boolean;
  onClick: (event: React.MouseEvent) => void;
};

type TabContentProps = {
  id: string;
  children: React.ReactNode[] | React.ReactNode;
  hidden?: boolean;
};

const TabContent: React.FC<TabContentProps> = ({ id, children, hidden = true }) => {
  return (
    <div
      tabIndex={0}
      role="tabpanel"
      id={`${id}-panel`}
      aria-labelledby={id}
      hidden={hidden}
    >
      {children}
    </div>
  );
};

const TabButton: React.FC<TabButtonProps> = ({ id, tabText, onClick, selected = false }) => {
  return (
    <button
      role="tab"
      aria-selected={selected}
      aria-controls={`${id}-panel`}
      id={id}
      onClick={onClick}
    >
      {tabText}
    </button>
  );
};

export const Tab: React.FC<TabProps> = ({ tabText, children }) => {
  return (
    <Tab tabText={tabText}>
      {children}
    </Tab>
  );
};

export class Tabs extends React.Component<TabsProps, TabsState> {
  constructor(props: TabsProps) {
    super(props);

    this.state = {
      activeTab: 0
    };
  }

  handleClick(tabIndex: number) {
    return () => {
      this.setState({ activeTab: tabIndex });
    };
  }

  render() {
    const [tabList, tabPanels] = this.props.children.reduce((accum, current, index) => {
      const localId = `${this.props.id}-${index}`;
      accum[0].push(
        <TabButton
          key={`${localId}-tab`}
          id={localId}
          tabText={current.props.tabText}
          selected={this.state.activeTab === index}
          onClick={this.handleClick(index)}
        />
      );
      accum[1].push(
        <TabContent
          key={`${localId}-panel`}
          id={localId}
          hidden={this.state.activeTab !== index}
        >
          {current.props.children}
        </TabContent>
      );
      return accum;
    }, [[], []]);

    return (
      <div className="c-Tabs">
        <div
          id={this.props.id}
          role="tablist"
          aria-label={this.props.ariaLabel}
        >
          {tabList}
        </div>
        {tabPanels}
      </div>
    );
  }
}

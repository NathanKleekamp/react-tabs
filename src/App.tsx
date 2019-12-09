import React from 'react';
import { Tabs, Tab } from './Tabs';
import './App.css';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Tabs
        id="test-tabs"
        ariaLabel="Test Tabs"
        defaultSelected={0}
      >
        <Tab tabText="Button title">
          <p>Some tab content, of course.</p>
        </Tab>
        <Tab tabText="Button title 2">
          <p>Some <em>more</em> tab content, of course.</p>
        </Tab>
        <Tab tabText="Button title 3">
          <p>Some <em>additional</em> tab content, of course.</p>
        </Tab>
      </Tabs>
    </div>
  );
};

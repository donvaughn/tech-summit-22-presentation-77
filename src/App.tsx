import React from 'react';
import { PresentationProfile } from './views/PresentationProfile';

function App() {
  return (
    <>
      {/*<div className="text-slate-50 bg-slate-800 flex flex-col h-[100vh] overflow-y-scroll">*/}
      {/*  <Routes>*/}
      {/*    {Object.values(navigationItems).map(tab => (*/}
      {/*      <Route key={tab.path} path={tab.path} element={tab.element} />*/}
      {/*    ))}*/}
      {/*  </Routes>*/}
      {/*</div>*/}

      {/*<Navigation />*/}

      <PresentationProfile />
    </>
  );
}

export default App;

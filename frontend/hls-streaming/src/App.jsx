// File: src/App.js

import React from 'react';
import CustomVideoPlayer from './components/CustomVideoPlayer';

function App() {
  const posterUrl = 'https://your-image-url/poster.jpg'; // Replace with actual poster URL

  return (
    <div className="App">
      <h1>HLS Streaming with Quality Selector</h1>
      <CustomVideoPlayer posterUrl={posterUrl} autoplay={true} />
    </div>
  );
}

export default App;

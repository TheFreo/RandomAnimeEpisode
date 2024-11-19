import './App.css';
import React, { useState, useEffect } from "react";
import ReactPlayer from 'react-player';

function App() {
  const [animeData, setAnimeData] = useState(null);
  const [episodeNum, setEpisodeNum] = useState(null);
  const cacheVideo = 'https://cache.libria.fun';
  const cachePoster = 'https://anilibria.tv';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.anilibria.tv/v3/title/random');
        const data = await response.json();
        setAnimeData(data);

        const randEpisode = Math.floor(Math.random() * data.player.episodes.last);
        const selectedVideo = `${cacheVideo}${data.player.list[randEpisode].hls.hd}`;
        setEpisodeNum(randEpisode)

        localStorage.setItem('url2Watch', selectedVideo);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchData();
  }, []);

  if (!animeData) {
    return <div className='load'>Загрузка...</div>; // Показываем индикатор загрузки
  }

  const handleVideoEnd = () => {
    window.location.reload();
  };

  return (
    <>
      <section>
        <div className="player">
          <ReactPlayer width='100%' height='100vh' playing={true} onEnded={handleVideoEnd} controls={true} url={localStorage.getItem('url2Watch')} />
        </div>
      </section>
      <section className='desc'>
        <img src={`${cachePoster}${animeData.posters.medium.url}`} alt="Logo" />
        <div>
          <h1>{animeData.names.en}</h1>
          <h1 className='altName'>{animeData.names.ru}</h1>
          <h2>Episode: {episodeNum}</h2>
        </div>
      </section>
    </>
  );
};

export default App;
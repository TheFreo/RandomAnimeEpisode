import './App.css';
import React, { useState, useEffect } from "react";
import ReactPlayer from 'react-player';
import libriaIco from './libriaIco.svg';

function App() {
  const cacheUrl = 'https://cache.libria.fun';
  const libriaUrl = 'https://anilibria.tv';
  const [animeData, setAnimeData] = useState(null);
  const [episodeNum, setEpisodeNum] = useState(null);
  const [episodeUrl, setEpisodeUrl] = useState(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.anilibria.tv/v3/title/random');
        const data = await response.json();
        setAnimeData(data);

        const randEpisode = Math.floor(Math.random() * data.player.episodes.last);
        setEpisodeNum(randEpisode)

        const selectedVideo = `${cacheUrl}${data.player.list[randEpisode].hls.hd}`;
        setEpisodeUrl(selectedVideo);

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  if (!animeData) {
    return <div className='load'>Загрузка...</div>;
  }

  const handleVideoEnd = () => {
    window.location.reload();
  };

  const handlePlay = () => {
    setIsActive(false)
  };

  const handlePause = () => {
    setIsActive(true)
  };

  return (
    <>
      <section className={isActive ? 'desc hidden' : 'desc'}>
        <div className='desc__inner'>
          <img src={`${libriaUrl}${animeData.posters.small.url}`} alt="Logo" />
          <div>
            <h1>{animeData.names.en}</h1>
            <h1 className='altName'>{animeData.names.ru}</h1>
            <h2>Эпизод: {episodeNum}</h2>
            <a target="_blank" href={`${libriaUrl}/release/${animeData.code}.html`}>
              <img src={libriaIco} />
            </a>
          </div>
        </div>
      </section>
      <section>
        <div className="player">
          <ReactPlayer class='video' width='100%' height='100vh' playing={true} onPlay={handlePlay} onPause={handlePause} onEnded={handleVideoEnd} controls={true} url={episodeUrl} />
        </div>
      </section>
    </>
  );
};

export default App;
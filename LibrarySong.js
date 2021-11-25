
import React from "react";

const LibrarySong = ({ 
  song, 
  songs, 
  setCurrentSong, 
  id, 
  audioRef, 
  isPlaying,
  setSongs,
  
 }) => {
  const songSelectHandler = () => {
    const selectedSong = songs.filter((state) => state.id === song.id)
    setCurrentSong(selectedSong[0])
    //Add active state
    //Start ACTIVE SONG T/F
    const newSongs = songs.map((song) => {
      if (song.id === id) { 
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    })
    setSongs={isPlaying};
    return
    //end ACTIVE SONG T/F (review)
    // check if song is playing audioRef.current.play();
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then((audio) => {
          audioRef.current.play();
        });
      }
    }
  };
    return (
       <div onClick={songSelectHandler} 
            className={`library-song ${song.active ? 'selected' : ""}`}>
           <div className="song-description">
           <img alt={song.name} src={song.cover}></img>
             <h3>{song.name}</h3>
             <h4>{song.artist}</h4> 
           </div>
       </div>
    );
};
export default LibrarySong;

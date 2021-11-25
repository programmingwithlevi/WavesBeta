import React, { useRef, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';

const Player = ({ currentSong, isPlaying, setIsPlaying,songs,setCurrentSong }) => {
    //ref
    const audioRef = useRef(null);
    //Event handlers
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };
    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({...songInfo, currentTime: current, duration: duration });
    };
//student comment
const autoPlayHandler = () => {
    if (isPlaying) {
        audioRef.current.play();
    }
}
//end student comment
    const getTime = (time) => {
        return(
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    };
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value});
    }
    const skipTrackHandler = (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
        if(direction === 'skip-forward'){
            setCurrentSong(songs[(currentIndex + 1) % songs.length])
        }
        if (direction === 'skip-back') {
            if((currentIndex -1) % songs.length === -1) {
                setCurrentSong(songs[songs.length -1]);
                return;
            }
            setCurrentSong(songs[(currentIndex - 1) % songs.length])
        }
    }
    //State
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
    });
    //Add the styles
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }
    return(
       <div className="player">
        <div className="time-control">
            <p>{getTime(songInfo.currentTime)}</p>
            <div style={{background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`}}className="track">
            <input min={0} 
            max={songInfo.duration} 
            value={songInfo.currentTime} 
            onChange={dragHandler}
            type="range"
            />
            <div style={trackAnim} className="animate-track"></div>
            </div>
            <p>{getTime(songInfo.duration || 0)}</p>
         </div>   
         <div className="play-control">
            <IoIosArrowBack onClick={() => skipTrackHandler('skip-back')} className="back" size="2rem" icon={IoIosArrowBack} />
            
            <play onClick={playSongHandler} className="play" icon={isPlaying ? FaPause : FaPlay} />  
                {isPlaying ? (
                    <FaPause onClick={playSongHandler} size='2rem' className='play' />
                ) : ( 
                    <FaPlay onClick={playSongHandler} size='2rem' className='pause' />
                
                )}
            <IoIosArrowForward onClick={() => skipTrackHandler('skip-forward')} className="forward" size='2rem' icon={IoIosArrowForward} /> 
        </div>
        <audio 
        onLoadedData={autoPlayHandler}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler} 
        ref={audioRef} 
        src={currentSong.audio}
        ></audio>
        </div>
    );
};
export default Player;
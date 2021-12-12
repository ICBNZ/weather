import React, {useState, useEffect} from 'react'
// import rain_vid from '../../assets/videos/rain_vid2.mp4';
import drizzle_vid from '../../assets/videos/rain_vid1.mp4';
import cloudy_vid from '../../assets/videos/clear.mp4';
import clear_vid from '../../assets/videos/beach.mp4';
import showers_img from '../../assets/img/cloudy_bg.jpg';
import cloudy_img from '../../assets/img/cloudy_bg.jpg';
import clear_img from '../../assets/img/clear_bg.jpg';
import useWindowDimensions from '../../Hooks/dimensions';

const VideoBg = (props) => {
    const weather = props.weather;
    const [vid, setVid] = useState();
    const [img, setImg] = useState();
    const { height, width } = useWindowDimensions();
    
    useEffect(() => {
            switch(weather) {
                case 'Clouds': case "Partly Sun":
                    setVid(cloudy_vid);
                    setImg(cloudy_img);
                    break;
                case "Sun": case "Clear":
                    setVid(clear_vid);
                    setImg(clear_img);
                    break;
                default:
                    setVid(drizzle_vid);
                    setImg(showers_img);
            }
    }, [weather])
    
    const style = {
        backgroundImage: `url(${img})`
    }
    

    return (
        <> {width > 900 ? 
            <video autoPlay muted poster={img} src={vid} loop/> : 
            <div id="bg_img" style={style} /> }
        </>
    )
}

export default VideoBg;
import React, {useState, useEffect} from 'react'

export const Icon = (props) => {
    const weather = props.overview;
    const [icon, setIcon] = useState();

    useEffect(() => {
        switch(weather) {
            case 'Mist':
                setIcon("C")
                break;
            case 'Rain':
                setIcon("U");
                break;
            case "Windy":
                setIcon(",");
                break;
            case 'Drizzle':
                setIcon("I");
                break;
            case 'Clouds':
                setIcon("3");
                break;
            case "Sun": case "Clear":
                setIcon("1");
                break;
            case "Partly Sun":
                setIcon("2");
                break;
            case "Storm":
                setIcon("Q");
                break;
            default:
                setIcon("1");
        }
      }, [weather])


    return (
        <>
            <div className="data-icon">{icon}</div>
        </>
    )
}

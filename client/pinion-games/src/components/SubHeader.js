import { Link } from "react-router-dom";
import "../App.scss"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const SubHeader = (props) => {
    
    const {header1, header2, imgUrl} = props

    return (
        <div className='sub-header'>
            <h1>{header1}</h1>
            {header2 ? <h2>{header2}</h2> : null}
            {imgUrl ? <img src={imgUrl} alt={imgUrl} /> : null}
        </div>
    )
}

export default SubHeader
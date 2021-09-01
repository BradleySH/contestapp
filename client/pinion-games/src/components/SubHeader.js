import { useHistory } from "react-router";
import "../App.scss"

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const SubHeader = (props) => {

    const history = useHistory()
    
    const {header1, header2, imgUrl, color, renderArrow} = props

    return (
        <div className='sub-header' style={imgUrl ? {backgroundImage: `url(${imgUrl})`, backgroundSize: 'cover', backgroundPosition: '0% 35%'} : {}} >
            {renderArrow ? <ArrowBackIosIcon onClick={() => history.goBack()}/> : null}
            <h1 style={{color: color ? color : "white"}}>{header1}</h1>
            {header2 ? <h2 style={{color: color ? color : "white"}}>{header2}</h2> : null}
        </div>
    )
}

export default SubHeader
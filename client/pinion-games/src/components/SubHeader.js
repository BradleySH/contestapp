import "../App.scss"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const SubHeader = (props) => {
    
    const {header1, header2, imgUrl, color} = props

    return (
        <div className='sub-header' style={imgUrl ? {backgroundImage: `url(${imgUrl})`, backgroundSize: 'cover', backgroundPosition: '0% 35%'} : {}} >
            <h1 style={{color: color ? color : "black"}}>{header1}</h1>
            {header2 ? <h2 style={{color: color ? color : "black"}}>{header2}</h2> : null}
        </div>
    )
}

export default SubHeader
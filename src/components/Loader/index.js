
import './styles/loader.css';

const Loader = ({size}) => {

    return (
        <div className="loaderContainer">
            <div className="loader" style={{width: `${size}px`, height: `${size}px`}}>

            </div>
        </div>
    );
}

export default Loader;
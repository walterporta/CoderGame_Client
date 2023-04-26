
import Login from "./Login"
import style from './Auxi.module.css';
import NavBar from '../NavBar/NavBar'

const Auxi = () => {
    return(
        <div>
            <NavBar />
            <div className={style.container}>
                <h1>Para comprar primero debes loguearte!!</h1>
                <p className={style.secondLine}>Click Down Here</p>
                <div className={style.thirdLine}>
                    <Login />
                </div>
            </div>
        </div>
    )
}

export default Auxi;

import popLogo from '../assets/popLogo.png'
export default function LoadingScreen() {
    return (
        <div className="base-flex loading-holder">
            <img src={popLogo} alt="Ethrex Logo while screen is loading" />
            <h1>Loading Content</h1>
        </div>
    )
}
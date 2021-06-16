import Button from "@material-ui/core/Button"
import { Link } from "react-router-dom"
const Home = () => {
    return (
        <div>
            <Link to="/meeting">
                <Button variant ="contained" color = "primary" align = "center">
                    Join or create a meeting
                </Button>
            </Link>
        </div>
    )
}

export default Home

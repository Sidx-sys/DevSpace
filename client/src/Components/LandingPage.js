import "../Components/CSS/LandingPage.css"
import Login from "./Login"

const LandingPage = () => ({
    render() {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-8 border-right" id="border-5">
                        <h1 className="display-2">
                            In Search for the Perfect Workplace?
                        </h1>
                        <h1 className="display-5">Join <strong>Devspace</strong> to find the workplace perfect for you!</h1>
                    </div>
                    <div className="col-4">
                        <h2 className="display-5 text-center">Login</h2>
                        <Login />
                    </div>
                </div>
            </div>
        );
    }
})

export default LandingPage;
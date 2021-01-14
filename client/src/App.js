import { BrowserRouter, Route } from "react-router-dom"

import Navbar from "./Components/Navbar";
import LandingPage from "./Components/LandingPage";
import Register from "./Components/Register";
// import AboutPage from "./Components/AboutPage"

const App = () => {
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<div className="container">
					<Route exact path="/" component={LandingPage} />
					{/* <Route path="/about" component={AboutPage} /> */}
					<Route path="/register" component={Register} />
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;

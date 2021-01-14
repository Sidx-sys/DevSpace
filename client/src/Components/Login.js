import { Link } from "react-router-dom";

const Login = () => ({
    render() {
        return (
            <div>
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true" >Applicant</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false" >Recruiter</a>
                    </li>
                </ul>

                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <form className="px-4 py-3">
                            <div className="form-group">
                                <label for="exampleDropdownFormEmail1">Email</label>
                                <input type="email" className="form-control" id="exampleDropdownFormEmail1" placeholder="applicant@example.com" />
                            </div>
                            <div className="form-group">
                                <label for="exampleDropdownFormPassword1">Password</label>
                                <input type="password" className="form-control" id="exampleDropdownFormPassword1" placeholder="Password" />
                            </div>
                            <button type="submit" className="btn btn-primary">Sign in</button>
                        </form>
                        <div className="dropdown-divider"></div>
                        <span className="text-center px-4 py-3 font-weight-bold">New around here? </span>
                        <button className="btn btn-light"><Link to="/register">Sign Up</Link></button>
                    </div>

                    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <form className="px-4 py-3">
                            <div className="form-group">
                                <label for="exampleDropdownFormEmail1">Email</label>
                                <input type="email" className="form-control" id="exampleDropdownFormEmail1" placeholder="recruiter@example.com" />
                            </div>
                            <div className="form-group">
                                <label for="exampleDropdownFormPassword1">Password</label>
                                <input type="password" className="form-control" id="exampleDropdownFormPassword1" placeholder="Password" />
                            </div>
                            <button type="submit" className="btn btn-primary">Sign in</button>
                        </form>
                        <div className="dropdown-divider"></div>
                        <span className="text-center px-4 py-3 font-weight-bold">New around here? </span>
                        <button className="btn btn-light"><Link to="/register">Sign Up</Link></button>
                    </div>
                </div>
            </div >
        )
    }
})

export default Login;
const Register = () => ({
    render() {
        return (
            <div className="container mt-5" style={{ "maxWidth": "45rem" }}>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true" >Applicant</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false" >Recruiter</a>
                    </li>
                </ul>

                <div className="tab-content" id="myTabContent">

                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <h3 className="text-center mt-5">Sign up as a Applicant</h3>
                        <form>
                            <div className="form-group">
                                <label for="nameApp">Name</label>
                                <input type="text" className="form-control" id="nameApp" />
                            </div>
                            <div className="form-group">
                                <label for="EmailApp">Email address</label>
                                <input type="email" className="form-control" id="EmailApp" aria-describedby="emailHelp" />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label for="Password1App">Password</label>
                                <input type="password" className="form-control" id="Password1App" />
                            </div>
                            <div className="form-group">
                                <label for="Password2App">Confirm Password</label>
                                <input type="password" className="form-control" id="Password2App" />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>

                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <h3 className="text-center mt-5">Sign up as a Recruiter</h3>
                        <form>
                            <div className="form-group">
                                <label for="nameRec">Name</label>
                                <input type="text" className="form-control" id="nameRec" />
                            </div>
                            <div className="form-group">
                                <label for="EmailRec">Email address</label>
                                <input type="email" className="form-control" id="EmailRec" aria-describedby="emailHelp" />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label for="contactRec">Contact</label>
                                <input type="text" className="form-control" id="contactRec" />
                            </div>
                            <div className="form-group">
                                <label for="Password1Rec">Password</label>
                                <input type="password" className="form-control" id="Password1Rec" />
                            </div>
                            <div className="form-group">
                                <label for="Password2Rec">Confirm Password</label>
                                <input type="password" className="form-control" id="Password2Rec" />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
})

export default Register;
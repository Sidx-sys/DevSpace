const PreLoader = () => {
    return (
        <div className="d-flex justify-content-center">
            <div
                className="spinner-border text-primary"
                role="status"
                style={{ marginTop: "35%", width: "5rem", height: "5rem" }}
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default PreLoader;

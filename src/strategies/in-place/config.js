module.exports = {
    initial: "merging-configuration",

    states: {

        "merging-configuration":{
            transitions: {
                next:     "preparing-bucket",
                rollback: "rolling-back"
            }
        },
        "preparing-bucket":{
            transitions: {
                next:     "uploading-version",
                rollback: "rolling-back"
            }
        },
        "uploading-version":{
            transitions: {
                next:     "deploying-resources",
                rollback: "rolling-back"
            }
        },
        "deploying-resources":{
            transitions: {
                next:     "deploying-version",
                rollback: "rolling-back"
            }
        },
        "deploying-version":{
            transitions: {
                next: "running-tests"
            }
        },
        "running-tests":{
            transitions: {
                next:     "completed",
                rollback: "rolling-back"
            }
        },
        "rolling-back":{},
        "completed":{}
    }
};

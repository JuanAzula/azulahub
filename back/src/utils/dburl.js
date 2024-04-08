function databaseURL() {
    if (NODE_ENV == "test") {
        return env("MONGOTEST_URL")
    } else {
        return env("MONGO_URL")
    }
}
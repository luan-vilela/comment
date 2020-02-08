if(process.env.NODE_ENV == "production"){
    module.exports = process.env.MONGO;
}
else{
    module.exports = {mongoURI: "mongodb://localhost/database"};
}
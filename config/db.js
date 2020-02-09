if(process.env.NODE_ENV == "production"){
    module.exports = process.env.MONGODB_URI;
}
else{
    module.exports = {mongoURI: "mongodb://localhost/database"};
}
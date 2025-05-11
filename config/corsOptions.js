const whiteList = ["http://127.0.0.1:550","http://localhost:8000", "https://www.google.com/" ];

const corsOptions = {
    origin: (origin, callback) => {
        if(!origin || whiteList.indexOf(origin) !== -1){
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionScuccessStatus: 200,
}

module.exports = corsOptions;

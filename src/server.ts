import app from "./app";
import config from "./config/config";
import initDB from "./db";



app.listen(config.port, () => {
    initDB();
    console.log(`Example app listening on port ${config.port}`)
})



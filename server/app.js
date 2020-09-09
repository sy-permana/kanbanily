if(process.env.NODE_ENV === "development"){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const routers = require('./routers');
const errorHandler = require('./middlewares/errorHandler')

app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(cors());

app.use(routers);
app.use(errorHandler);

app.listen(PORT, _=> {
    console.log(`app url: http://localhost:${PORT}`);
})
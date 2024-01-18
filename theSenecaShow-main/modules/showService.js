// const videos = require("./data/videos.json")
// const channels = require("./data/channels.json")
const env = require("dotenv")
env.config()

const Sequelize = require('sequelize');
let sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
    host: process.env.PGHOST,
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: { rejectUnauthorized: false },
    },
});


const Channel = sequelize.define('Channel', {
    channelID: {
        type: Sequelize.INTEGER,
        primaryKey: true, // use "project_id" as a primary key
        autoIncrement: true, // automatically increment the value
    },
    name: Sequelize.STRING,
    image: Sequelize.STRING
})

const Video = sequelize.define('Video', {
    videoID: {
        type: Sequelize.INTEGER,
        primaryKey: true, // use "project_id" as a primary key
        autoIncrement: true, // automatically increment the value
    },
    title: Sequelize.STRING,
    video: Sequelize.STRING,
    date: Sequelize.DATE,
})

Video.belongsTo(Channel, {foreignKey: "channelID"})

function initialize() {
    return new Promise((resolve, reject) => {
        sequelize.sync().then(() => {
            console.log("connected to DB")
            resolve()

        }).catch((err) => {
            reject(err)
        })

    })
    // combine themes json and legosets json into a new js array
    // filteredArray

    // TODO
}




function getAllChannels() {
    return new Promise((resolve, reject) => {
        Channel.findAll().then((channels) => {
            if (channels.length > 0) {
                resolve(channels)
            } else {
                reject("No channels found!")
            }
        }).catch((err) => {
            reject(err)
        })
    })
}


function getVideoByID(id) {
    return new Promise((resolve, reject) => {
        const result = videos.find((video) => video.id == id)
        if (result) {
            resolve(result)
        } else {
            reject("video not found!")
        }
    })
}

function getVideosByChannel(channelID) {
    return new Promise((resolve, reject) => {
        const result = videos.filter((video) => video.channelID == channelID)
        if (result) {
            resolve(result)
        } else {
            reject("video not found!")
        }
    })
}

function addChannel(formData) {
    return new Promise((resolve, reject) => {
        Channel.create(formData).then(() => {
            resolve()
        }).catch((err) => {
            reject(err)
        })
    })
}

function addVideo(formData) {
    return new Promise((resolve, reject) => {
        Video.create(formData).then(() => {
            resolve()
        }).catch((err) => {
            reject(err)
        })
    })
}


module.exports = {
    initialize,
    getAllChannels,
    getVideoByID,
    getVideosByChannel,
    addChannel,
    addVideo
}
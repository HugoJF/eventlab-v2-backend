module.exports = {
    "type": process.env.DB_CONNECTION || "mysql",
    "host": process.env.DB_HOST || "localhost",
    "port": process.env.DB_PORT || 3306,
    "username": process.env.DB_USERNAME || "root",
    "password": process.env.DB_PASSWORD || "secret",
    "database": process.env.DB_DATABASE || "eventlab",
    "entities": [
        "./dist/**/*.entity.ts", "./dist/**/*.entity.js",
        "./.build/**/*.entity.js",
        "./src/**/*.entity.js",
    ],
    "synchronize": process.env.DB_SYNCHRONIZE || true,
    "logging": ["query"]
}

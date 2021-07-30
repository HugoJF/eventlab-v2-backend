module.exports = {
    "type": process.env.TYPEORM_CONNECTION || "mysql",
    "host": process.env.TYPEORM_HOST || "localhost",
    "port": process.env.TYPEORM_PORT || 3306,
    "username": process.env.TYPEORM_USERNAME || "root",
    "password": process.env.TYPEORM_PASSWORD || "secret",
    "database": process.env.TYPEORM_DATABASE || "test",
    "entities": ["dist/**/*.entity.ts", "dist/**/*.entity.js"],
    "synchronize": process.env.TYPEORM_SYNCHRONIZE || true,
    "logging": ["query"]
}

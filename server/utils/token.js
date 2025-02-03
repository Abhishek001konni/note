const jwt = require("jsonwebtoken");
require("dotenv").config();

const TokenUtil = {
    // Generate a new access token
    generateTokens(userId) {
        const accessToken = jwt.sign({ id: userId }, process.env.ACCESS_TOKEN, {
            expiresIn: "15m",
        });

        const refreshToken = jwt.sign({ id: userId }, process.env.REFRESH_TOKEN, {
            expiresIn: "7d",
        });

        return { accessToken, refreshToken };
    },

    // Verify access token
    verifyAccessToken(token) {
        try {
            return jwt.verify(token, process.env.ACCESS_TOKEN);
        } catch (err) {
            return res.status(403).json({
                message: "Invalid or expired access token",
            });
        }
    },

    // Verify refresh token
    verifyRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.REFRESH_TOKEN);
        } catch (err) {
            return res.status(403).json({
                message: "Invalid or expired refresh token",
            });
        }
    }
};

module.exports = TokenUtil;

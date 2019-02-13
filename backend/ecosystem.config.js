module.exports = {
  apps: [
    {
      name: "Freemed_Recruiting",
      script: './app.js',
      env: {
          PORT: 3003,
          NODE_ENV: 'development',
          NODE_PATH: 'src'
      },
      env_production: {
          "PORT": 3002,
          "NODE_ENV": "production"
      }
    }
  ]
};
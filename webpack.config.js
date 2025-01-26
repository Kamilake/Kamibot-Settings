const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: './src/index.tsx',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, // .ts와 .tsx 확장자를 처리하도록 정규식을 수정합니다.
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'] // @babel/preset-typescript를 추가합니다.
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'dist'),
        publicPath: '/',
      },
      {
        directory: path.join(__dirname, 'public'),
        publicPath: '/public/',
      },
    ],
    client: {
      overlay: true,
      reconnect: true,
      // webSocketURL: 'wss://kamibot.app:443/ws',
      webSocketURL: {
        hostname: 'kamibot.app',
        pathname: '/ws',
        password: 'dev-server',
        port: 443,
        protocol: 'wss',
        username: 'webpack',
      },
    },
    compress: true,
    port: 40081,
    hot: true,
    host: '0.0.0.0',
    allowedHosts: ['kamibot.kami.live', 'cf-kamibot.kami.live', 'kamibot.app', 'dev.kamibot.app', 'localhost'],
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};

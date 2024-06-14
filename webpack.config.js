module.exports = {
    plugins: [
        new webpack.DefinePlugin({
          'process.env.REACT_API': JSON.stringify(process.env.REACT_API),
        })
    ],
    }
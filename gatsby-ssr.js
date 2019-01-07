const React = require(`react`)

exports.onRenderBody = ({ setPreBodyComponents }) => {
    setPreBodyComponents([
        <noscript key="noscript">Your browser does not support JavaScript!</noscript>,
    ])
}

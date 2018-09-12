var SDK = require("codechain-sdk");

var SERVER_URL = process.env.CODECHAIN_RPC_HTTP || "http://localhost:8080";
var sdk = new SDK({
    server: SERVER_URL
});

sdk.rpc.chain
    .getBalance("tccqzn9jjm3j6qg69smd7cn0eup4w7z2yu9my9a2k78")
    .then(function(balance) {
        // the balance is a U256 instance at this moment.
        // Use toString() to print it out.
        console.log(balance.toString()); // the amount of CCC that the account has.
    })
    .catch(console.error);

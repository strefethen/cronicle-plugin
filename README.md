# Basic Cronicle TypeScript Plugin
This project contains a simplistic MVP [Cronicle plugin](https://github.com/jhuckaby/Cronicle/blob/master/docs/Plugins.md) that's ready for development using VSCode. 

Included are two JSON files provided for testing which are pulled from [the example](https://github.com/jhuckaby/Cronicle/blob/master/docs/Plugins.md#json-input) in the docs the second of which provides fields used in a [Chain Reaction](https://github.com/jhuckaby/Cronicle/blob/master/docs/Plugins.md#chain-reaction-control).

* job-input.json
* job-input-chain.json

As per the docs, a Cronicle plugin has to be a command-line executable and Typescript doesn't work all that well here without some help. The included file plugin-shell.js can be used to "wrap" your TypeScript compiled plugin.js file and create the executible you need. Make this file executable and you'll add it to Cronicle as your new plugin.

```bash
$ chmod +x plugin-shell.js
```

There is a provided tsconfig.json file that includes the ability to test your plugin by passing job-input.json into your plugin using stdin.

## Chain Reactions
One of the really cool features of Cronicle is the built-in HTTP Request plugin which allows fetching a URL and processing the result via a chained plugin.

You can read more in the [Cronicle plugin](https://github.com/jhuckaby/Cronicle/blob/master/docs/Plugins.md) docs but creating a plugin to handle processing of the fetched URL is quite powerful. To get your plugin working simply:

1. Setup a new Event using the HTTP Request plugin
2. Specify your plugin under Chain Option > Run Event on Success.

Your plugin will receive the fetched output via the "job" JSON object which will have a "chain_data" property containing the data. This is great for API calls as the data comes through as a native JSON object.

When using the HTTP Request plugin the structure of the "chain_data" object will be as follows:

```json
{ "job":
  ...
  "chain_data": {
      "headers": {
        "date": "Wed, 10 Jan 2024 05:01:01 GMT",
        "content-type": "application/json",
        "content-length": "144544",
        "connection": "keep-alive",
        ...
      },
      "json": {
        ...
      }
  }
}
```
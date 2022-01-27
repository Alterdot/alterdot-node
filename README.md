Alterdot Node
============

A Alterdot full node for building applications and services with Node.js. A node is extensible and can be configured to run additional services. At the minimum a node has an interface to [Alterdot (alterdotd) v1.9.2.1](https://github.com/Alterdot/alterdot/tree/v1.9.2.1) for more advanced address queries. Additional services can be enabled to make a node more useful such as exposing new APIs, running a block explorer and wallet service.

## Usages

### As a standalone server

```bash
git clone https://github.com/Alterdot/alterdot-node
cd alterdot-node
npm install
./bin/alterdot-node start
```

When running the start command, it will seek for a .alterdot folder with a alterdot-node.json conf file.
If it doesn't exist, it will create it, with basic task to connect to alterdotd.

Some plugins are available :

- Insight-API : `./bin/alterdot-node addservice insight-api`
- Insight-UI : `./bin/alterdot-node addservice insight-ui`

You also might want to add these index to your alterdot.conf file :
```
-addressindex
-timestampindex
-spentindex
```

### As a library

```bash
npm install alterdot-node
```

```javascript
const alterdot = require('alterdot-node');
const config = require('./alterdot-node.json');

let node = alterdot.scaffold.start({ path: "", config: config });
node.on('ready', function() {
    //Alterdot core started
    alterdotd.on('tx', function(txData) {
        let tx = new alterdot.lib.Transaction(txData);
    });
});
```

## Prerequisites

- Alterdot (alterdotd) (v1.9.2.1) with support for additional indexing *(see above)*
- Node.js v8+
- ZeroMQ *(libzmq3-dev for Ubuntu/Debian or zeromq on OSX)*
- ~20GB of disk storage
- ~1GB of RAM

## Configuration

Alterdot includes a Command Line Interface (CLI) for managing, configuring and interfacing with your Alterdot Node.

```bash
alterdot-node create -d <alterdot-data-dir> mynode
cd mynode
alterdot-node install <service>
alterdot-node install https://github.com/yourname/helloworld
alterdot-node start
```

This will create a directory with configuration files for your node and install the necessary dependencies.

Please note that [Alterdot](https://github.com/Alterdot/alterdot/tree/master) needs to be installed first.

For more information about (and developing) services, please see the [Service Documentation](docs/services.md).

## Add-on Services

There are several add-on services available to extend the functionality of Bitcore:

- [Insight API](https://github.com/Alterdot/insight-api/tree/master)
- [Insight UI](https://github.com/Alterdot/insight-ui/tree/master)
- [Bitcore Wallet Service](https://github.com/Alterdot/alterdot-wallet-service/tree/master)

## Documentation

- [Upgrade Notes](docs/upgrade.md)
- [Services](docs/services.md)
  - [Alterdotd](docs/services/alterdotd.md) - Interface to Alterdot
  - [Web](docs/services/web.md) - Creates an express application over which services can expose their web/API content
- [Development Environment](docs/development.md) - Guide for setting up a development environment
- [Node](docs/node.md) - Details on the node constructor
- [Bus](docs/bus.md) - Overview of the event bus constructor
- [Release Process](docs/release.md) - Information about verifying a release and the release process.


## Setting up dev environment (with Insight)

Prerequisite : Having a alterdotd node already runing `alterdotd --daemon`.

Alterdot-node : `git clone https://github.com/Alterdot/alterdot-node -b develop`
Insight-api (optional) : `git clone https://github.com/Alterdot/insight-api -b develop`
Insight-UI (optional) : `git clone https://github.com/Alterdot/insight-ui -b develop`

Install them :
```
cd alterdot-node && npm install \
 && cd ../insight-ui && npm install \
 && cd ../insight-api && npm install && cd ..
```

Symbolic linking in parent folder :
```
npm link ../insight-api
npm link ../insight-ui
```

Start with `./bin/alterdot-node start` to first generate a ~/.alterdot/alterdot-node.json file.
Append this file with `"insight-ui"` and `"insight-api"` in the services array.

## Contributing

Please send pull requests for bug fixes, code optimization, and ideas for improvement. For more information on how to contribute, please refer to our [CONTRIBUTING](https://github.com/Alterdot/alterdot/blob/master/CONTRIBUTING.md) file.

## License

Code released under [the MIT license](https://github.com/Alterdot/alterdot-node/blob/master/LICENSE).

Copyright 2016-2018 Alterdot Group, Inc.

- bitcoin: Copyright (c) 2009-2015 Bitcoin Core Developers (MIT License)

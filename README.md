# Code Rally Web Application

Node.js web app built using LoopBack framework for the Liberty-based Code Rally game - running this will let you play the game from a web browser.

## 1\. Clone repository

Navigate to a location on your local file system that you wish to clone coderally-web into and enter the following command in the terminal to clone the repository:

```bash
git clone https://github.com/ssh24/coderally-web.git
```

## 2\. Install the Node Modules

If you would like to run this application locally follow the steps in this section. To deploy to Bluemix, you can skip this step and head over to step 3.

Change into the directory that you have just cloned and install the node modules required to run coderally-web:

```bash
cd coderally-web
npm install --registry https://registry.npmjs.org/
```

After the node modules have finished installing, you can run the application locally by typing:

```bash
node .
```

## 3\. Publishing to Bluemix

### Prerequisite:

1. Please make sure to create a [Bluemix](https://console.ng.bluemix.net/) account if you do not have it already
2. Install the [CloudFoundry Command Line Tools](https://github.com/cloudfoundry/cli/releases)

### To publish the CodeRally Express application to IBM Bluemix, you must run the following commands:

1. Login interactively using your Bluemix credentials: `cf login -a https://api.ng.mybluemix.net`
2. Push your code rally app: `cf push <APP_NAME> -d mybluemix.net`

Congratulations, your app is now published to Bluemix. Run your application, by visitng `http://<APP_NAME>.mybluemix.net/`

### Credits

Supervisor: Thomas Banks

Developers: Sakib Hasan, Laven Sathiyanathan

Quality Assurance Tester: Ivy Ho, Sakib Hasan, Laven Sathiyanathan

Previous contributors: Karan (S.) Randhawa, Kelvin Chan, Fady Abdel Malik

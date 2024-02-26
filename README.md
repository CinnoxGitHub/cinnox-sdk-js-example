# Cinnox SDK Quick Start Guide

Cinnox SDK is a software development kit (SDK) that allows you to integrate Cinnox's real-time voice communication features into your web application. This guide will help you get started with the Cinnox SDK by walking you through the installation process and showing you how to make a simple voice call.

## Installation

### Package Manager

Using npm:

```bash
npm install cinnox-sdk-js
```

Using yarn:

```bash
yarn add cinnox-sdk-js
```

## Example

### Initialize the SDK

Before you use the call feature, you need to initialize the SDK with your cinnox service name.

```javascript
import CinnoxSDK from 'cinnox-sdk-js';

const cinnoxSDK = new CinnoxSDK({
  service: 'your-cinnox-service-name',
});
await cinnoxSDK.initialize();
```

### Login

To make a call, you need to log in to the Cinnox server.

```javascript
cinnoxSDK.auth.login('your-account', 'your-password');
```

### Making an On-Net Voice Call

To make an on-net voice call, you can create a call options object by `generateOnNetCallOptions` and pass it to `callOut`.

```javascript
import { generateOnNetCallOptions } from 'cinnox-sdk-js';

const callOptions = generateOnNetCallOptions('target-eid');
const callOutResult = await cinnoxSDK.call.callOut(callOptions);
const { session } = callOutResult;
```

### Making an Off-Net Voice Call

To make an off-net voice call, you can create a call options object by `generateOffNetCallOptions` and pass it to `callOut`.

```javascript
import { generateOffNetCallOptions } from 'cinnox-sdk-js';

const callOptions = generateOffNetCallOptions('target-phone-number', 'caller-number');
const callOutResult = await cinnoxSDK.call.callOut(callOptions);
const { session } = callOutResult;
```

### Listen for Call Session Event

You can listen for call session events by adding event listeners to the session object.

```javascript
session.on('CONNECTED', () => {
  console.log('Call Connected');
});
```

### Listen for Call Manager Event

You can listen for call manager events by adding event listeners to the call manager object.

```javascript
cinnoxSDK.call.on('CALL_INVITE', (incomingCall) => {
  console.log('Incoming Call');
});
```

### Answer an Incoming Call

To answer an incoming call, you can call `answer` on the incoming call object.

```javascript
const session = cinnoxSDK.call.getSessionBySessionId(incomingCall.sessionId);
session.answerCall();
```

### Play Call Sound

To play the call sound, you can get the media stream in the session object and play it after call connected.

```javascript
const session = cinnoxSDK.call.getSessionBySessionId(sessionId);
const remoteStream = session.streams.remote;

const audio = new Audio();
audio.srcObject = remoteStream;
audio.play();
```

## API Document

For more API information about the Cinnox SDK, please refer to the [API document](https://cinnoxgithub.github.io/cinnox-sdk-js-example/index.html).
# Readme for idleTaskScheduler Library

## Overview

The `idleTaskScheduler` library provides a higher-order function for efficiently scheduling asynchronous tasks. It leverages `requestIdleCallback` or `setTimeout` to execute tasks during idle times, ensuring the main thread is not blocked. This is particularly useful for preloading components or data in web applications without impacting user experience.

NOTE: Safari does not support `requestIdleCallback` and will use `setTimeout` instead.

## Installation

```bash
npm install idle-task-scheduler
```

or

```bash
yarn add idle-task-scheduler
```

## Usage

### Importing the Library

```javascript
import idleTaskScheduler from 'idle-task-scheduler';
```

### Basic Usage

Wrap your promise function with `idleTaskScheduler` to schedule it during idle times:

```javascript
const fetchData = () => {
  return new Promise((resolve) => {
    // Your asynchronous data fetching logic
    resolve(data);
  });
};

const scheduledFetch = idleTaskScheduler(fetchData);
```

### With Custom Options

You can provide custom options such as `timeout`:

```javascript
const scheduledFetch = idleTaskScheduler(fetchData, { timeout: 8000 });
```

## API

### idleTaskScheduler

- **Type**: `<Args extends unknown[], Return>(promiseFn: (...args: Args) => Promise<Return>, options?: Options) => Promise<Return>`
- **Description**: Schedules a promise function to execute during the browser's idle periods, minimizing impact on the main thread.

#### Parameters

- `promiseFn`: The promise function containing your asynchronous task.
- `options`: An optional object for configuration.
  - `timeout`: (Optional) The maximum time in milliseconds the task is allowed to run before returning. Defaults to 5000ms.

### requestIdleCallback (Internal Use)

- **Description**: A polyfill for `requestIdleCallback`, used when it's not available in the `window` object.
- **Parameters**:
  - `cb`: The callback function to be executed.
  - `options`: An object containing the `timeout` property.

## Compatibility

`idleTaskScheduler` is designed for use in web browser environments and checks for the presence of the `window` object.

## Contributing

We welcome contributions to enhance the `idleTaskScheduler` library. Please refer to our contributing guidelines for more information.

## License

This project is licensed under the MIT License. Check the LICENSE file for full details.

---

**Note**: Users should have a basic understanding of promises and asynchronous JavaScript to effectively utilize `idleTaskScheduler`. The library is particularly beneficial in scenarios where non-blocking operations are critical, such as in complex web applications.
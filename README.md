#### Bin packing

### Task
To develop functionality that effectively packing rectangular blocks in
rectangular 2D container. The location of the blocks in the container must be
as dense as possible in order to rationally use the container space

### Algorithms
This project presents two algorithms o solve the task.
In the file index.ts you can choose which algorithm of the two will be used:

```ts
// Chose constants.ALGORITHM_1 OR constants.ALGORITHM_2
const algorithm = constants.ALGORITHM_2;
```

- **ALGORITHM_1**: gives a quick solution, but with not very tight packing blocks,
although at the same time ensures that the fullness will be will be equal 1 always.
- **ALGORITHM_2**: gives a much slower solution, but in some cases gives a denser arrangement of blocks.

### Running the app (without DOCKER)

## Installation first time only!

```bash
# install the dependencies
$ npm install

# build the app
# (compiles typescript files into dist folder and broserifies index.js)
$ npm run build

# start live server
$ live-server

```

## Shutdown

```bash
# stop the app in the terminal where it is running
$ CTRL + C

```
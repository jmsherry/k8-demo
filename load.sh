#!/bin/bash
# Uses 'artillery.js'. (<https://artillery.io/>) Adjust as necessary

./app/node_modules/.bin/artillery quick --count 100 -n 20 http://localhost:30001/load-test


#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

yarn install
./node_modules/.bin/webpack --optimize-minimize

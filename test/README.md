## Code Rally Web UI Automation Tests

#### Test suite - [`./test/specs/`](https://github.com/ssh24/coderally-web/tree/master/test/specs/)
There are currently two types of integration tests created for code rally. They are listed below with the command required to run the tests.
- Build tests
  - Use `./node_modules/gulp/bin/gulp.js test:build` to run the full build test suite.
  - Use `./node_modules/gulp/bin/gulp.js test:build --spec <path_to_spec_file>` to run a single test spec.
- E2E tests
  - Use `./node_modules/gulp/bin/gulp.js test:e2e` to run the full e2e suite. (not completed)

# another-nodejs-test-runner

### Main Features

1. NO (!!!) monkey-path/override of any thing NodeJS (this, console.log, global, process, ...).
2. Be able to print logs for each test seperatly.
3. Watch logs of previous test runs ((2) is also included in this feature).
4. Plugin-based architecture - modify anything you possibly want outside of this source code.
5. A decent default reporter which shows stdout & stderr in realtime.
6. Typescript configuration file - no yaml, JS, JSON or any other undocumented crap.

### Roadmap (We Are Still In POC)

1. the first experimental test-runner will implement as follow:

- worker threads (instead of sub-processes) - each file in different thread.
- running all tests in a test-file in a sequantal order - (it's too much work to make everything concurrent in a POC test-runner).

2. Typescript configuration file - auto support typescript test-files out of the box.
3. Be able to print logs for each test seperatly.

### Future Roadmap

1. Watch logs of previous test runs ((2) is also included in this feature).
2. Plugin-based architecture - modify anything you possibly want outside of this source code.
3. Second test-runner which everything can run concurrenctly (confgiurable)

### What's Not On The Menu ATM

1. Browser support:

- There are tons of tests runners for that
- I'm not an frontend developer - Idk what are the problems over there
- The amount of code will grow \*10

### Contribution

1. I can't do it alone. the time is not the problem, the ideas for new features MUST come from us all.
2. Feel free to change anything you want. if you are unsure, file an issue first.

-

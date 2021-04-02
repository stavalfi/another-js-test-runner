import async from 'async'
import os from 'os'

type Job = {
  testFilePath: string
}

// run multiple test-files in different threads. each test-file run all tests in a sequence (concurrency=1)
export class TestLoadBalancerV1 {
  private readonly concurrencyLevel = os.cpus().length

  private readonly runTestFilesQueue = async.queue<Job, void, Error>(
    (request, done) =>
      this.loadTestFile(request.testFilePath).then(
        result => done(null, result),
        e => done(e),
      ),
    this.concurrencyLevel,
  )

  private async pushJob(job: Job): Promise<void> {
    console.log(job)
    //
  }

  private async loadTestFile(testFilePath: string): Promise<void> {
    //
  }

  public async loadTestFiles(repoPath: string): Promise<void> {
    //
  }
}

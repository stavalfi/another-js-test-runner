import { parentPort, workerData } from 'worker_threads'

function main(): void {
  const str = workerData.payload
  parentPort!.postMessage(`${str}1`)
}

if (require.main === module) {
  main()
}

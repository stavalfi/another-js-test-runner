import { Worker, MessageChannel, receiveMessageOnPort } from 'worker_threads'

export async function parse(str: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      require.resolve(__filename.includes('.ts') ? '../dist/src/aonther-worker.js' : './aonther-worker.js'),
      {
        workerData: {
          payload: str,
        },
      },
    )
    worker.on('message', resolve)
    worker.on('error', reject)
    worker.on('exit', code => {
      if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`))
    })
  })
}

async function main(): Promise<void> {
  console.log(await parse('hi'))
}

if (require.main === module) {
  main()
}

const { port1, port2 } = new MessageChannel()
port1.postMessage({ hello: 'world' })

console.log(receiveMessageOnPort(port2))
// Prints: { message: { hello: 'world' } }
console.log(receiveMessageOnPort(port2))
// Prints: undefined

import type { NextApiRequest, NextApiResponse } from 'next'
import { LoggerOptions, TransportTargetOptions, pino } from 'pino';





const targets: TransportTargetOptions[] = [
  { level: 'info', target: 'pino/file', options: { destination: 1 } },
  { level: 'fatal', target: 'pino/file', options: { destination: 2 } },
  { target: 'pino-pretty', level: 'info', options: { colorize: true } },
];

// const transportAbsolutePath = '../../modules/logger/transport.mjs';
// targets.push({ target: transportAbsolutePath, level: 'info', options: {} });


const destination = pino.transport({ targets });

const pinoOptions: LoggerOptions = {
  enabled: true,
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    bindings: () => ({
      uuid: '123',
      isoTime: new Date().toISOString(),
    }),
  },
};

const logger = pino(pinoOptions, destination);

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  logger.info({some_key: 'some value'}, 'from /api/hello')


  res.status(200).json({ name: 'John Doe' })
}

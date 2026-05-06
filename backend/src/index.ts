import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from './config/env'
import { errorHandler } from './middleware/errorHandler'
import { rateLimiter } from './middleware/rateLimiter'
import { healthRouter }    from './routes/health'
import { authRouter }      from './routes/auth'
import { fhirProxyRouter } from './routes/fhirProxy'
import { cqlRouter }       from './routes/cql'
import { measuresRouter }  from './routes/measures'
import { careGapRouter }   from './routes/careGaps'
import { priorAuthRouter } from './routes/priorAuth'
import { hl7Router }       from './routes/hl7'

const app = express()

app.use(helmet())
app.use(cors({ origin: config.CORS_ORIGINS, credentials: true }))
app.use(express.json({ limit: '10mb' }))
app.use(express.text({ type: 'text/plain', limit: '5mb' }))
app.use(morgan('dev'))
app.use(rateLimiter)

app.use('/health',         healthRouter)
app.use('/auth',           authRouter)
app.use('/fhir',           fhirProxyRouter)
app.use('/api/cql',        cqlRouter)
app.use('/api/measures',   measuresRouter)
app.use('/api/care-gaps',  careGapRouter)
app.use('/api/prior-auth', priorAuthRouter)
app.use('/api/hl7',        hl7Router)

app.use(errorHandler)

app.listen(config.PORT, () =>
  console.log(`✅  Bisharod API running on http://localhost:${config.PORT}  [${config.NODE_ENV}]`)
)

export default app

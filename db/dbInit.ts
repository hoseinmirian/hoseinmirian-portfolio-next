import Database from './db'
import config from '@/config'

if (!config.databaseURI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

export const connectToDB = async () => {
  try {
    const db = Database
    await db.connect({
      uri: config.databaseURI,
      options: {
        dbName: config.databaseName,
        autoCreate: config.databaseConnectionOptions.autoCreate,
        autoIndex: config.databaseConnectionOptions.autoIndex,
        bufferCommands: config.databaseConnectionOptions.bufferCommands,
        maxPoolSize: config.databaseConnectionOptions.maxPoolSize,
        serverSelectionTimeoutMS:
          config.databaseConnectionOptions.serverSelectionTimeoutMS,
        socketTimeoutMS: config.databaseConnectionOptions.socketTimeoutMS,
        family: config.databaseConnectionOptions.family
      }
    })

    console.log('Database initialized successfully')
    return db
  } catch (error) {
    console.error('Failed to initialize database:', error)
    throw error
  }
}

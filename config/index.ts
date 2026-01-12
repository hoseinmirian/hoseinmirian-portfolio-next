const config = {
  environments: process.env.NODE_ENV ?? 'development',
  port: process.env.PORT ?? 8000,
  cypressBaseUrl: process.env.CYPRESS_BASE_URL ?? 'http://localhost:3000',
  databaseURI: process.env.DATABASE_URI,
  databaseName: process.env.DATABASE_NAME,
  databaseConnectionOptions: {
    autoCreate: process.env.NODE_ENV === 'development',
    autoIndex: process.env.NODE_ENV === 'development',
    bufferCommands: false,
    maxPoolSize: process.env.NODE_ENV === 'development' ? 5 : 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
  }
}

export default config

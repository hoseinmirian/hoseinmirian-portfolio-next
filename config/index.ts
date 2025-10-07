const config = {
  environments: process.env.NODE_ENV ?? 'development',
  port: process.env.PORT ?? 8000,
  databaseURI: process.env.DATABASE_URI as string,
  databaseName: `${process.env.DATABASE_NAME}${process.env.NODE_ENV === 'development' ? 'Dev' : ''}`,
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

import 'server-only'

import mongoose, { Connection } from 'mongoose'
import type { Db } from 'mongodb'

interface DatabaseConfig {
  uri: string
  options?: mongoose.ConnectOptions
}

class Database {
  private static instance: Database
  private connection: Connection | null = null
  private isConnecting = false

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }

  public async connect(config: DatabaseConfig): Promise<Connection> {
    // Check for existing connection
    if (this.connection?.readyState === 1) {
      return this.connection
    }

    // Handle concurrent connection attempts
    if (this.isConnecting) {
      return new Promise((resolve, reject) => {
        const checkConnection = () => {
          if (this.connection?.readyState === 1) {
            resolve(this.connection)
          } else if (!this.isConnecting) {
            reject(new Error('Connection failed'))
          } else {
            setTimeout(checkConnection, 100)
          }
        }
        checkConnection()
      })
    }

    try {
      this.isConnecting = true

      // Prevent multiple connections in development (hot reload)
      if (mongoose.connections[0]?.readyState === 1) {
        this.connection = mongoose.connection
        return this.connection
      }

      const defaultOptions: mongoose.ConnectOptions = {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        bufferCommands: false
      }

      await mongoose.connect(config.uri, {
        ...defaultOptions,
        ...config.options
      })

      this.connection = mongoose.connection
      this.setupEventListeners()

      console.log('✅ MongoDB connected successfully')
      return this.connection
    } catch (error) {
      console.error('❌ MongoDB connection error:', error)
      throw error
    } finally {
      this.isConnecting = false
    }
  }

  public async disconnect(): Promise<void> {
    if (this.connection) {
      await mongoose.disconnect()
      this.connection = null
      console.log('📴 MongoDB disconnected')
    }
  }

  public async getMongoDBVersion(): Promise<string | null> {
    try {
      // Ensure the connection is ready and db is available
      const db = mongoose.connection.db as Db
      const admin = db.admin()
      const info = await admin.serverStatus()
      console.log(`MongoDB server version: ${info.version}`)
      return info.version
    } catch (error) {
      console.error('Failed to get MongoDB server version:', error)
      return null
    }
  }

  public getDB(): Db | null {
    return this.connection?.db || null
  }

  public getConnection(): Connection | null {
    return this.connection
  }

  public isConnected(): boolean {
    return this.connection?.readyState === 1
  }

  private setupEventListeners(): void {
    if (!this.connection) return

    this.connection.on('error', error => {
      console.error('❌ MongoDB connection error:', error)
    })

    this.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected')
      this.connection = null
      this.isConnecting = false
    })
  }
}

// Global variable for development hot reload prevention
declare global {
  var mongoose: {
    conn: Database | null
    promise: Promise<Database> | null
  }
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export default Database.getInstance()

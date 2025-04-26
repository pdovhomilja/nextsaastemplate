/**
 * Prisma Client Proxy Entrypoint
 * 
 * This file serves as a compatibility layer to make Next.js work with
 * the custom Prisma client output path defined in your schema.
 */

// Re-export everything from the actual Prisma client
module.exports = require('../app/generated/prisma/client')
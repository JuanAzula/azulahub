
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('./runtime/wasm.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.11.0
 * Query Engine version: efd2449663b3d73d637ea1fd226bafbcf45b3102
 */
Prisma.prismaVersion = {
  client: "5.11.0",
  engine: "efd2449663b3d73d637ea1fd226bafbcf45b3102"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */
exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  password: 'password',
  name: 'name',
  lastName: 'lastName',
  seriesId: 'seriesId'
};

exports.Prisma.MovieScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  releaseYear: 'releaseYear',
  poster_img: 'poster_img',
  genresId: 'genresId',
  score: 'score',
  userId: 'userId'
};

exports.Prisma.SeriesScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  releaseYear: 'releaseYear',
  poster_img: 'poster_img',
  genresId: 'genresId',
  score: 'score',
  userId: 'userId'
};

exports.Prisma.GenreScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};


exports.Prisma.ModelName = {
  User: 'User',
  Movie: 'Movie',
  Series: 'Series',
  Genre: 'Genre'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/Users/juanazula/dev/azulahub/back/prisma/generated/mongo_client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "darwin-arm64",
        "native": true
      }
    ],
    "previewFeatures": [
      "driverAdapters"
    ],
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../..",
  "clientVersion": "5.11.0",
  "engineVersion": "efd2449663b3d73d637ea1fd226bafbcf45b3102",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "mongodb",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "MONGO_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n    provider        = \"prisma-client-js\"\n    previewFeatures = [\"driverAdapters\"]\n    output          = \"./generated/mongo_client\"\n}\n\ndatasource db {\n    provider = \"mongodb\"\n    url      = env(\"MONGO_URL\")\n}\n\n// schema.prisma\n\nmodel User {\n    id       Int     @id @map(\"_id\")\n    email    String  @unique\n    password String\n    name     String\n    lastName String\n    seriesId Int?    @unique\n    Series   Series?\n    Movie    Movie[]\n}\n\nmodel Movie {\n    id          Int    @id @map(\"_id\")\n    title       String\n    description String\n    releaseYear Int\n    poster_img  String\n    genre       Genre? @relation(fields: [genresId], references: [id])\n    genresId    Int?\n    score       Float\n    User        User?  @relation(fields: [userId], references: [id])\n    userId      Int?   @unique\n}\n\nmodel Series {\n    id          Int    @id @map(\"_id\")\n    title       String\n    description String\n    releaseYear Int\n    poster_img  String\n    genre       Genre? @relation(fields: [genresId], references: [id])\n    genresId    Int?   @unique\n    score       Float\n    User        User?  @relation(fields: [userId], references: [id])\n    userId      Int?   @unique\n}\n\nmodel Genre {\n    id     Int      @id @map(\"_id\")\n    name   String   @unique\n    movies Movie[] // Array of references to movies in this genre\n    series Series[] // Array of references to series in this genre\n}\n",
  "inlineSchemaHash": "47f6e113fa9fe7f8b3c310bf63efb9b2549f3db94f247ab802d9f8719449da4e",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\",\"dbName\":\"_id\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"lastName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"seriesId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"Series\",\"kind\":\"object\",\"type\":\"Series\",\"relationName\":\"SeriesToUser\"},{\"name\":\"Movie\",\"kind\":\"object\",\"type\":\"Movie\",\"relationName\":\"MovieToUser\"}],\"dbName\":null},\"Movie\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\",\"dbName\":\"_id\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"releaseYear\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"poster_img\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"genre\",\"kind\":\"object\",\"type\":\"Genre\",\"relationName\":\"GenreToMovie\"},{\"name\":\"genresId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"score\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"User\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"MovieToUser\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"Int\"}],\"dbName\":null},\"Series\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\",\"dbName\":\"_id\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"releaseYear\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"poster_img\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"genre\",\"kind\":\"object\",\"type\":\"Genre\",\"relationName\":\"GenreToSeries\"},{\"name\":\"genresId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"score\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"User\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"SeriesToUser\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"Int\"}],\"dbName\":null},\"Genre\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\",\"dbName\":\"_id\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"movies\",\"kind\":\"object\",\"type\":\"Movie\",\"relationName\":\"GenreToMovie\"},{\"name\":\"series\",\"kind\":\"object\",\"type\":\"Series\",\"relationName\":\"GenreToSeries\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = {
  getRuntime: () => require('./query_engine_bg.js'),
  getQueryEngineWasmModule: async () => {
    return (await import('#wasm-engine-loader')).default
  }
}

config.injectableEdgeEnv = () => ({
  parsed: {
    MONGO_URL: typeof globalThis !== 'undefined' && globalThis['MONGO_URL'] || typeof process !== 'undefined' && process.env && process.env.MONGO_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)


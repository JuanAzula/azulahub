
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
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UsersScalarFieldEnum = {
  id: 'id',
  email: 'email',
  password: 'password',
  name: 'name',
  lastName: 'lastName',
  seriesId: 'seriesId'
};

exports.Prisma.MoviesScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  releaseYear: 'releaseYear',
  poster_img: 'poster_img',
  genresId: 'genresId',
  score: 'score'
};

exports.Prisma.SeriesScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  releaseYear: 'releaseYear',
  poster_img: 'poster_img',
  genresId: 'genresId',
  score: 'score'
};

exports.Prisma.GenresScalarFieldEnum = {
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

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  Users: 'Users',
  Movies: 'Movies',
  Series: 'Series',
  Genres: 'Genres'
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
      "value": "/Users/juanazula/dev/azulahub/back/prisma/generated/postgres_client",
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
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "POSTGRES_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n    provider        = \"prisma-client-js\"\n    previewFeatures = [\"driverAdapters\"]\n    output          = \"./generated/postgres_client\"\n}\n\ndatasource db {\n    provider = \"postgresql\"\n    url      = env(\"POSTGRES_URL\")\n}\n\nmodel Users {\n    id          Int      @id @default(autoincrement())\n    email       String   @unique\n    password    String\n    name        String\n    lastName    String\n    likedMovies Movies[] @relation(\"UserLikedMovies\")\n    likedSeries Series[] @relation(\"UserLikedSeries\")\n    seriesId    Int?\n}\n\nmodel Movies {\n    id          Int     @id @default(autoincrement())\n    title       String\n    description String\n    releaseYear Int\n    poster_img  String\n    genre       Genres? @relation(fields: [genresId], references: [id])\n    genresId    Int?\n    score       Float\n    users       Users[] @relation(\"UserLikedMovies\")\n}\n\nmodel Series {\n    id          Int     @id @default(autoincrement())\n    title       String\n    description String\n    releaseYear Int\n    poster_img  String\n    genre       Genres? @relation(fields: [genresId], references: [id])\n    genresId    Int?\n    score       Float\n    users       Users[] @relation(\"UserLikedSeries\")\n}\n\nmodel Genres {\n    id     Int      @id @default(autoincrement())\n    name   String   @unique\n    movie  Movies[]\n    series Series[]\n}\n",
  "inlineSchemaHash": "8876d3726583b3fe48bce65cb2bde721c66d2d2ed6595b60e9ee44c6a74b6455",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"Users\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"lastName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"likedMovies\",\"kind\":\"object\",\"type\":\"Movies\",\"relationName\":\"UserLikedMovies\"},{\"name\":\"likedSeries\",\"kind\":\"object\",\"type\":\"Series\",\"relationName\":\"UserLikedSeries\"},{\"name\":\"seriesId\",\"kind\":\"scalar\",\"type\":\"Int\"}],\"dbName\":null},\"Movies\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"releaseYear\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"poster_img\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"genre\",\"kind\":\"object\",\"type\":\"Genres\",\"relationName\":\"GenresToMovies\"},{\"name\":\"genresId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"score\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"users\",\"kind\":\"object\",\"type\":\"Users\",\"relationName\":\"UserLikedMovies\"}],\"dbName\":null},\"Series\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"releaseYear\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"poster_img\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"genre\",\"kind\":\"object\",\"type\":\"Genres\",\"relationName\":\"GenresToSeries\"},{\"name\":\"genresId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"score\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"users\",\"kind\":\"object\",\"type\":\"Users\",\"relationName\":\"UserLikedSeries\"}],\"dbName\":null},\"Genres\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"movie\",\"kind\":\"object\",\"type\":\"Movies\",\"relationName\":\"GenresToMovies\"},{\"name\":\"series\",\"kind\":\"object\",\"type\":\"Series\",\"relationName\":\"GenresToSeries\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = {
  getRuntime: () => require('./query_engine_bg.js'),
  getQueryEngineWasmModule: async () => {
    return (await import('#wasm-engine-loader')).default
  }
}

config.injectableEdgeEnv = () => ({
  parsed: {
    POSTGRES_URL: typeof globalThis !== 'undefined' && globalThis['POSTGRES_URL'] || typeof process !== 'undefined' && process.env && process.env.POSTGRES_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)


/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = "game";
const collection = "games";

// Create a new database.
// use(database);

// Create a new collection.
// db.createCollection(collection);

// The prototype form to create a collection:
/* db.createCollection( <name>,
  {
    capped: <boolean>,
    autoIndexId: <boolean>,
    size: <number>,
    max: <number>,
    storageEngine: <document>,
    validator: <document>,
    validationLevel: <string>,
    validationAction: <string>,
    indexOptionDefaults: <document>,
    viewOn: <string>,
    pipeline: <pipeline>,
    collation: <document>,
    writeConcern: <document>,
    timeseries: { // Added in MongoDB 5.0
      timeField: <string>, // required for time series collections
      metaField: <string>,
      granularity: <string>,
      bucketMaxSpanSeconds: <number>, // Added in MongoDB 6.3
      bucketRoundingSeconds: <number>, // Added in MongoDB 6.3
    },
    expireAfterSeconds: <number>,
    clusteredIndex: <document>, // Added in MongoDB 5.3
  }
)*/

// More information on the `createCollection` command can be found at:
// https://www.mongodb.com/docs/manual/reference/method/db.createCollection/

db.games.insertMany([
  {
    name: "cod",
    gametype: "premium",
    score: 88,
    achievements: ["gold", "silver"],
  },
  {
    name: "coc",
    gametype: "premium",
    score: 68,
    achievements: ["silver"],
  },
  {
    name: "temple run",
    gametype: "simple",
    score: 48,
    achievements: ["bronze"],
  },
  {
    name: "bgmi",
    gametype: "premium",
    score: 98,
    achievements: ["platinum"],
  },
  {
    name: "chess",
    gametype: "intermediate",
    score: 78,
    achievements: ["gold"],
  },
]);

db.games.find({ $or: [{ score: { $gt: 40 } }, { gametype: "premium" }] });

db.games.find().sort({ score: 1 }).limit(3);

db.games.find(
  { achievements: { $all: ["silver", "gold"] } },
  { name: 1, gametype: 1, _id: 0 }
);

db.games.deleteMany({ score: { $gt: 40 } });

var mapFunction = function () {
  emit(this.name, this.score);
};
var reduceFunction = function (key, values) {
  var sum = values.reduce((acc, val) => acc + val, 0);
  return sum / values.length;
};

db.games.mapReduce(mapFunction, reduceFunction, {
  out: "average_score_per_name",
});

db.average_score_per_name.find();

db.games.aggregate([
  { $match: { gametype: "premium" } },
  { $project: { name: 1 } },
]);

db.games.aggregate([
    {$group:{_id:"$name", avg_score:{$avg:"$score"}}}
])



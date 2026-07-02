const MongoClient = require('mongodb').MongoClient;
const dboper = require('./operations');

const url = 'mongodb://127.0.0.1:27017/';
const dbName = 'nucampsite';

(async function () {
    try {
        const client = await MongoClient.connect(url, {});
        console.log("Connected correctly to server");

        const db = client.db(dbname);

        try {
            const dropResult = await db.dropCollection("campsite");
            console.log("Dropped Collection:", dropResult);
        } catch (err) {
            console.log("No collection to drop.");
        }

        const documentToInsert = {
            name: "Breadcrumb Trail Campground",
            description: "Test",
        };

        const insertResult = await dboper.insertDocument(
            db,
            documentToInsert,
            "campsite"
            );
            console.log("Insert Document:", {
            _id: insertResult.insertedId, 
            ...documentToInsert,
        });

        const docs = await dboper.findDocuments(db, "campsite");
        console.log("Found Documents:", docs);

        const updateResult = await dboper.updateDocument(
            db,
            { name: "Breadcrumb Trail Campground" },
            { description: "Updated Test Description" },
            "campsite"
        );
        console.log("Updated Document Count:", updateResult.modifiedCount);

        const updatedDocs = await dboper.findDocuments(db, "campsite");
        console.log("Found Documents:", updatedDocs);

        const deleteResult = await dboper.removeDocument(
            db,
            { name: "Breadcrumb Trail Campground" },
            "campsite"
        );
        console.log("Deleted Document Count:", deleteResult.deletedCount);

        await client.close();

    } catch (err) {
        console.log(err);
    }
})
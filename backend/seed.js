// backend/seed.js
const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

const usersToUpload = [];

fs.createReadStream('./dataset/staymatch_lifestyle_dataset.csv')
    .pipe(csv())
    .on('data', (row) => {
        usersToUpload.push({
            name: row.Name,
            email: `${row.Name.toLowerCase().replace(/\s/g, '')}@staymatch.com`,
            password: "hashed_password_123", // Default for dataset users
            preferences: {
                sleep: Number(row['Sleep_Schedule(1-10)']),
                clean: Number(row['Cleanliness(1-10)']),
                noise: Number(row['Noise_Tolerance(1-10)']),
                study: Number(row['Study_Habits(1-10)']),
                social: Number(row['Social_Behavior(1-10)']),
                smoking: Number(row['Smoking(0=No,1=Yes)'])
            }
        });
    })
    .on('end', async () => {
        await User.deleteMany({ email: { $regex: /@staymatch.com/ } }); // Clear old seeds
        await User.insertMany(usersToUpload);
        console.log(`✅ Successfully uploaded ${usersToUpload.length} profiles to MongoDB!`);
        process.exit();
    });
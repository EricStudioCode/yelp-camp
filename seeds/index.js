const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers")


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
    console.log("database connected")
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random100 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random100].city}, ${cities[random100].state}`,
            title: `${sample(descriptors)}, ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [cities[random100].longitude,
                cities[random100].latitude,
                 ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/drxa9j4tt/image/upload/v1722714553/YelpCamp/lungn4lsemgeifixf8q1.jpg',
                    filename: 'YelpCamp/lungn4lsemgeifixf8q1',

                },
                {
                    url: 'https://res.cloudinary.com/drxa9j4tt/image/upload/v1722714554/YelpCamp/wnjvqdtdr2ybfklnj7wc.jpg',
                    filename: 'YelpCamp/wnjvqdtdr2ybfklnj7wc',

                },
                {
                    url: 'https://res.cloudinary.com/drxa9j4tt/image/upload/v1722714554/YelpCamp/ffewcgorrdzhxo9lebpv.jpg',
                    filename: 'YelpCamp/ffewcgorrdzhxo9lebpv',

                }
            ],
            //MY AUTHOR ID
            author: "66a278279386f8dfbd6ac39a",
            description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.Libero voluptatem ea rem nostrum quisquam officia quod totex perferendis praesentium corporis, dolores voluptatum at doloremque quos modi est unde nemo.",
            price: price

        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})
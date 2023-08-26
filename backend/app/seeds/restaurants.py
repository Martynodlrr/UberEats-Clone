from app.models import db, environment, SCHEMA, Restaurant

from sqlalchemy.sql import text


def seed_restaurants():
    restaurants = [
        {
            "name": "Chick-fil-A",
            "image": "https://tb-static.uber.com/prod/image-proc/processed_images/14aecf3db7eea1dd2fe67a004a272ae2/97ef7458dde62fa918635bc21265d9f5.jpeg",
            "address": "123 Main St, Anytown, USA",
            "category": "fastFood",
            "description": "Cows being pushy about eating chicken.",
            "user_id": 2,
            "miles_to_user": 3.21
        },
        {
            "name": "Burger King",
            "image": "https://example.com/burger-king-image.jpg",
            "address": "456 Elm St, Another City, USA",
            "category": "fastFood",
            "description": "Have it your way!",
            "user_id": 7,
            "miles_to_user": 2.05
        },
        {
            "name": "Pizza Palace",
            "image": "https://example.com/pizza-palace-image.jpg",
            "address": "789 Maple Ave, Smallville, USA",
            "category": "fastFood",
            "description": "Serving hot and delicious pizzas.",
            "user_id": 5,
            "miles_to_user": 1.75
        },
        {
            "name": "Fresh Mart",
            "image": "https://example.com/fresh-mart-image.jpg",
            "address": "101 Pine St, Townsville, USA",
            "category": "grocery",
            "description": "Your neighborhood grocery store.",
            "user_id": 9,
            "miles_to_user": 4.93
        },
        {
            "name": "Quick Stop",
            "image": "https://example.com/quick-stop-image.jpg",
            "address": "222 Cedar Rd, Metroville, USA",
            "category": "convenience",
            "description": "Convenient shopping for busy people.",
            "user_id": 1,
            "miles_to_user": 3.12
        },
        {
            "name": "Liquor Land",
            "image": "https://example.com/liquor-land-image.jpg",
            "address": "333 Oak St, Winetown, USA",
            "category": "alcohol",
            "description": "A wide selection of spirits and more.",
            "user_id": 8,
            "miles_to_user": 2.64
        },
        {
            "name": "PharmaCare",
            "image": "https://example.com/pharmacare-image.jpg",
            "address": "444 Birch Ave, Healthville, USA",
            "category": "pharmacy",
            "description": "Your health is our priority.",
            "user_id": 3,
            "miles_to_user": 1.98
        },
        {
            "name": "Baby Bliss",
            "image": "https://example.com/baby-bliss-image.jpg",
            "address": "555 Spruce Dr, Parentville, USA",
            "category": "baby",
            "description": "Everything your baby needs.",
            "user_id": 6,
            "miles_to_user": 3.87
        },
        {
            "name": "Gourmet Delights",
            "image": "https://example.com/gourmet-delights-image.jpg",
            "address": "666 Olive Ln, Foodville, USA",
            "category": "specialtyFoods",
            "description": "Indulge in exquisite flavors.",
            "user_id": 10,
            "miles_to_user": 4.32
        },
        {
            "name": "Pet Paradise",
            "image": "https://example.com/pet-paradise-image.jpg",
            "address": "777 Walnut Ct, Petburg, USA",
            "category": "petSupplies",
            "description": "For the love of pets.",
            "user_id": 4,
            "miles_to_user": 2.18
        },
        {
            "name": "Blossom Breeze",
            "image": "https://example.com/blossom-breeze-image.jpg",
            "address": "888 Rose Ave, Floral City, USA",
            "category": "flowers",
            "description": "Bringing beauty to your life.",
            "user_id": 1,
            "miles_to_user": 1.67
        },
        {
            "name": "Fashion Haven",
            "image": "https://example.com/fashion-haven-image.jpg",
            "address": "999 Silk Rd, Styleville, USA",
            "category": "retail",
            "description": "Where style meets affordability.",
            "user_id": 9,
            "miles_to_user": 3.89
        },
        {
            "name": "Gadget Galaxy",
            "image": "https://example.com/gadget-galaxy-image.jpg",
            "address": "111 Tech Blvd, Innovatown, USA",
            "category": "electronics",
            "description": "Explore the latest tech wonders.",
            "user_id": 5,
            "miles_to_user": 4.75
        },
        {
            "name": "Sunny Side Café",
            "image": "https://example.com/sunny-side-cafe-image.jpg",
            "address": "222 Sunrise Ave, Morningtown, USA",
            "category": "deals",
            "description": "Start your day on the sunny side.",
            "user_id": 8,
            "miles_to_user": 2.32
        },
        {
            "name": "Health Nut",
            "image": "https://example.com/health-nut-image.jpg",
            "address": "333 Nutty Ln, Wellnessville, USA",
            "category": "grocery",
            "description": "Nutritious choices for a healthy life.",
            "user_id": 3,
            "miles_to_user": 3.56
        },
        {
            "name": "Speedy Mart",
            "image": "https://example.com/speedy-mart-image.jpg",
            "address": "444 Fast Rd, Rapidville, USA",
            "category": "convenience",
            "description": "Get what you need in a hurry.",
            "user_id": 7,
            "miles_to_user": 1.92
        },
        {
            "name": "Wine World",
            "image": "https://example.com/wine-world-image.jpg",
            "address": "555 Vineyard Ave, Vintagetown, USA",
            "category": "alcohol",
            "description": "Discover a world of fine wines.",
            "user_id": 2,
            "miles_to_user": 3.03
        },
        {
            "name": "MediCure Pharmacy",
            "image": "https://example.com/medicure-pharmacy-image.jpg",
            "address": "666 Remedy Rd, Cureville, USA",
            "category": "pharmacy",
                    "description": "Your well-being is our mission.",
            "user_id": 6,
            "miles_to_user": 4.45
        },
        {
            "name": "Tiny Tots Emporium",
            "image": "https://example.com/tiny-tots-emporium-image.jpg",
            "address": "777 Kids Ln, Playtown, USA",
            "category": "baby",
            "description": "Where childhood dreams come true.",
            "user_id": 1,
            "miles_to_user": 2.87
        },
        {
            "name": "Savory Delights",
            "image": "https://example.com/savory-delights-image.jpg",
            "address": "888 Spice Dr, Flavortown, USA",
            "category": "specialtyFoods",
            "description": "A symphony of tastes awaits.",
            "user_id": 9,
            "miles_to_user": 3.19
        },
        {
            "name": "Paws & Claws",
            "image": "https://example.com/paws-and-claws-image.jpg",
            "address": "999 Petal St, Petville, USA",
            "category": "petSupplies",
            "description": "Catering to your furry friends.",
            "user_id": 5,
            "miles_to_user": 1.34
        },
        {
            "name": "Flower Elegance",
            "image": "https://example.com/flower-elegance-image.jpg",
            "address": "111 Lily Ave, Bloomville, USA",
            "category": "flowers",
            "description": "Express your emotions with flowers.",
            "user_id": 8,
            "miles_to_user": 4.08
        },
        {
            "name": "Urban Threads",
            "image": "https://example.com/urban-threads-image.jpg",
            "address": "222 Fashion Rd, Trendyville, USA",
            "category": "retail",
            "description": "Where fashion meets the city.",
            "user_id": 4,
            "miles_to_user": 2.76
        },
        {
            "name": "Gizmo Gallery",
            "image": "https://example.com/gizmo-gallery-image.jpg",
            "address": "333 Tech Ave, Gadgetville, USA",
            "category": "electronics",
            "description": "Unveiling the future of tech.",
            "user_id": 10,
            "miles_to_user": 3.92
        },
        {
            "name": "Morning Bite Café",
            "image": "https://example.com/morning-bite-cafe-image.jpg",
            "address": "444 Dawn Rd, Riseville, USA",
            "category": "deals",
            "description": "Fueling your day with goodness.",
            "user_id": 6,
            "miles_to_user": 1.73
        },
        {
            "name": "Vitality Mart",
            "image": "https://example.com/vitality-mart-image.jpg",
            "address": "555 Wellness Ave, Fitville, USA",
            "category": "grocery",
            "description": "Your path to a healthier life.",
            "user_id": 2,
            "miles_to_user": 2.91
        },
        {
            "name": "Express Stop",
            "image": "https://example.com/express-stop-image.jpg",
            "address": "666 Rush St, Swiftville, USA",
            "category": "convenience",
            "description": "Your convenient shopping destination.",
            "user_id": 7,
            "miles_to_user": 4.25
        },
        {
            "name": "Spirited Haven",
            "image": "https://example.com/spirited-haven-image.jpg",
            "address": "777 Whiskey Ln, Drinksville, USA",
            "category": "alcohol",
            "description": "Elevating your drinking experience.",
            "user_id": 3,
            "miles_to_user": 2.09
        },
        {
            "name": "CureAll Pharmacy",
            "image": "https://example.com/cureall-pharmacy-image.jpg",
            "address": "888 Health Rd, Remedyville, USA",
            "category": "pharmacy",
            "description": "Empowering your journey to health.",
            "user_id": 1,
            "miles_to_user": 3.67
        },
        {
            "name": "Dreamy Nursery",
            "image": "https://example.com/dreamy-nursery-image.jpg",
            "address": "999 Cloud Dr, Napville, USA",
            "category": "baby",
            "description": "Creating dreamy spaces for little ones.",
            "user_id": 9,
            "miles_to_user": 1.45
        },
        {
            "name": "Savor Junction",
            "image": "https://example.com/savor-junction-image.jpg",
            "address": "111 Taste Blvd, Flavorville, USA",
            "category": "specialtyFoods",
            "description": "Embark on a culinary journey.",
            "user_id": 5,
            "miles_to_user": 4.03
        },
        {
            "name": "Furry Friends Emporium",
            "image": "https://example.com/furry-friends-emporium-image.jpg",
            "address": "222 Woof Rd, Petropolis, USA",
            "category": "petSupplies",
            "description": "Tail-wagging goodness for pets.",
            "user_id": 8,
            "miles_to_user": 2.22
        },
        {
            "name": "Blooming Bliss",
            "image": "https://example.com/blooming-bliss-image.jpg",
            "address": "333 Garden Ave, Blossomville, USA",
            "category": "flowers",
            "description": "Where flowers paint joy.",
            "user_id": 4,
            "miles_to_user": 3.64
        },
        {
            "name": "Urban Oasis",
            "image": "https://example.com/urban-oasis-image.jpg",
            "address": "444 Oasis St, Metropolis, USA",
            "category": "retail",
            "description": "Escape to an urban shopping paradise.",
            "user_id": 10,
            "miles_to_user": 2.37
        },
        {
            "name": "Eco-Tech Hub",
            "image": "https://example.com/eco-tech-hub-image.jpg",
            "address": "555 Eco Dr, Greenberg, USA",
            "category": "electronics",
            "description": "Innovating sustainably with tech.",
            "user_id": 6,
            "miles_to_user": 3.81
        },
        {
            "name": "Rise & Shine Café",
            "image": "https://example.com/rise-and-shine-cafe-image.jpg",
            "address": "666 Morning Rd, Sunnyville, USA",
            "category": "deals",
            "description": "Wake up to delightful deals.",
            "user_id": 2,
            "miles_to_user": 1.96
        },
        {
            "name": "Vital Mart",
            "image": "https://example.com/vital-mart-image.jpg",
            "address": "777 Health Ave, Wellnessville, USA",
            "category": "grocery",
            "description": "Fueling your vitality with quality.",
            "user_id": 1,
            "miles_to_user": 4.14
        },
        {
            "name": "Swift Stop",
            "image": "https://example.com/swift-stop-image.jpg",
            "address": "888 Speed Rd, Fastville, USA",
            "category": "convenience",
            "description": "Making life easier, one stop at a time.",
            "user_id": 3,
            "miles_to_user": 2.58
        },
        {
            "name": "Vine & Spirits",
            "image": "https://example.com/vine-and-spirits-image.jpg",
            "address": "999 Grape St, Wineville, USA",
            "category": "alcohol",
            "description": "Elevating your palate with finesse.",
            "user_id": 7,
            "miles_to_user": 3.97
        },
        {
            "name": "Healing Hands Pharmacy",
            "image": "https://example.com/healing-hands-pharmacy-image.jpg",
            "address": "111 Care Ave, Remedytown, USA",
            "category": "pharmacy",
            "description": "Your path to wellness starts here.",
            "user_id": 4,
            "miles_to_user": 2.11
        },
        {
            "name": "Little Angels Haven",
            "image": "https://example.com/little-angels-haven-image.jpg",
            "address": "222 Cloud Ln, Napland, USA",
            "category": "baby",
            "description": "Crafting spaces for little miracles.",
            "user_id": 6,
            "miles_to_user": 3.45
        },
        {
            "name": "Taste Trail",
            "image": "https://example.com/taste-trail-image.jpg",
            "address": "333 Spice St, Flavorville, USA",
            "category": "specialtyFoods",
            "description": "Embark on a journey of flavors.",
            "user_id": 8,
            "miles_to_user": 1.78
        },
        {
            "name": "Pet Haven",
            "image": "https://example.com/pet-haven-image.jpg",
            "address": "444 Paws Rd, Petopia, USA",
            "category": "petSupplies",
            "description": "Where pets are family.",
            "user_id": 5,
            "miles_to_user": 4.32
        },
        {
            "name": "Rose Radiance",
            "image": "https://example.com/rose-radiance-image.jpg",
            "address": "555 Blossom St, Roseville, USA",
            "category": "flowers",
            "description": "Radiating love through every petal.",
            "user_id": 10,
            "miles_to_user": 2.04
        },
        {
            "name": "City Couture",
            "image": "https://example.com/city-couture-image.jpg",
            "address": "666 Fashion Ave, Urbanville, USA",
            "category": "retail",
            "description": "Urban elegance at your fingertips.",
            "user_id": 2,
            "miles_to_user": 3.71
        },
    ]

    restaurant_names = [
    "Chick-fil-A",
    "Donut City",
    "Jackie's Ham & Eggs",
    "Jason's Deli",
    "McDonald's®",
    "Panera",
    "Smoothie King",
    "Sonic Drive-In",
    "Starbucks",
    "Subway",
    "Sunview Cafe - Lewisville",
    "Taco Bell",
    "Tom Thumb",
    "Wendy's",
    "Whataburger",
    "7-11",
    "Blu's Barbeque",
    "BoomerJack's Grill & Bar - Lewisville",
    "Buffalo Wild Wings",
    "Coconut Paradise",
    "Cotton Patch Cafe",
    "Dock Local -Harvest Hall",
    "Dumka",
    "Indian Vegan Cafe",
    "LA Burger",
    "Moms Cafe",
    "Popeyes",
    "Rajwadi",
    "Razzoo's Cajun Cafe",
    "Stop-N-Go Gyros",
    "The Gyro Bar",
    "Wayback Burger",
    "Wingstop",
    "Einstein Bros. Bagels",
    "Halal Fusionz",
    "Jakes Burgers and Beer - Grapevine",
    "KO! Chicken!",
    "La Crepe Des Rois - Harvest Hall",
    "Little Caesars",
    "Munchies Bites - Sandwiches",
    "Noodle Works",
    "Pho Bistro",
    "Samurai KO Addison",
    "Sushi Sakana - Coppell",
    "Valerie's Taco Shop - Flower Mound"
    ]
    restaurant_links = [
    "https://tb-static.uber.com/prod/image-proc/processed_images/14aecf3db7eea1dd2fe67a004a272ae2/97ef7458dde62fa918635bc21265d9f5.jpeg",
    "https://d1ralsognjng37.cloudfront.net/406d74c5-9f2a-4a06-a30b-d9941b28e723.jpeg",
    "https://d1ralsognjng37.cloudfront.net/c800121f-58c0-4f33-a309-d8df11067c2f.jpeg",
    "https://d1ralsognjng37.cloudfront.net/f7abfae7-1708-4039-9d5d-2b20d0ee1cff.jpeg",
    "https://tb-static.uber.com/prod/image-proc/processed_images/54554a83f0a2de9ac27c7ddc7d2ab616/97ef7458dde62fa918635bc21265d9f5.jpeg",
    "https://tb-static.uber.com/prod/image-proc/processed_images/4e266d7b19f43d6c500e34671cdd1db7/97ef7458dde62fa918635bc21265d9f5.jpeg",
    "https://d1ralsognjng37.cloudfront.net/004abf64-5e46-4682-bafd-6873568721a7.jpeg",
    "https://tb-static.uber.com/prod/image-proc/processed_images/433d30cee75a63de5d3795570a7ebf70/97ef7458dde62fa918635bc21265d9f5.jpeg",
    "https://tb-static.uber.com/prod/image-proc/processed_images/cc2c3b81f1e02e1dcbffa7e0c9fdd2a1/97ef7458dde62fa918635bc21265d9f5.jpeg",
    "https://tb-static.uber.com/prod/image-proc/processed_images/edfa0e1811f820886e231c62a67db03d/97ef7458dde62fa918635bc21265d9f5.jpeg",
    "https://d1ralsognjng37.cloudfront.net/e5c0c0ee-cb78-46e5-89d2-df7787dfc68e.jpeg",
    "https://tb-static.uber.com/prod/image-proc/processed_images/087213ee09a12d82eab4f192aa53b8cc/97ef7458dde62fa918635bc21265d9f5.jpeg",
    "https://tb-static.uber.com/prod/image-proc/processed_images/5829faa1e8aabd3312d9f2e236bb8908/97ef7458dde62fa918635bc21265d9f5.jpeg",
    "https://tb-static.uber.com/prod/image-proc/processed_images/f317c4311859fcfb0f1abd46af0477c1/97ef7458dde62fa918635bc21265d9f5.jpeg",
    "https://tb-static.uber.com/prod/image-proc/processed_images/1b800754a0a6b3fcebf270360975352f/ffd640b0f9bc72838f2ebbee501a5d4b.jpeg",
    "https://tb-static.uber.com/prod/image-proc/processed_images/546cf86519d7312c8dd5c7a929d8b2c3/97ef7458dde62fa918635bc21265d9f5.jpeg",
    "https://d1ralsognjng37.cloudfront.net/c2cf6359-7628-4981-a6ff-77b647e359a8.jpeg",
    "https://tb-static.uber.com/prod/image-proc/processed_images/e636ebda26c71dbac549638354c4f0e1/97ef7458dde62fa918635bc21265d9f5.jpeg",
    "https://tb-static.uber.com/prod/image-proc/processed_images/ae9e7b157908ed4f654e187b7eec3e82/97ef7458dde62fa918635bc21265d9f5.jpeg",
    "https://tb-static.uber.com/prod/image-proc/processed_images/f90825fd6d24b0d5fa082a10dca6a25d/ffd640b0f9bc72838f2ebbee501a5d4b.jpeg",
    "https://d1ralsognjng37.cloudfront.net/c5d957e6-4226-4df1-b8ea-558b25722ef0.jpeg",
    "https://tb-static.uber.com/prod/image-proc/processed_images/30c62cca7e70169297e24ce1f38f0f49/97ef7458dde62fa918635bc21265d9f5.jpeg",
    "https://d1ralsognjng37.cloudfront.net/ae32e4ea-7cea-4dd9-9c05-169398fee0cb.jpeg",
    "https://d1ralsognjng37.cloudfront.net/7bbffed3-8c65-4057-92f9-5b2019e4305d.jpeg",
    "https://d1ralsognjng37.cloudfront.net/523ae3ba-6629-4849-a511-6d6310ac32c8.jpeg",
    "https://tb-static.uber.com/prod/image-proc/processed_images/54554a83f0a2de9ac27c7ddc7d2ab616/97ef7458dde62fa918635bc21265d9f5.jpeg",
    "https://tb-static.uber.com/prod/image-proc/processed_images/34b4b59fb5e2c928547c165f12400453/ec1689ae3a25695f1b8e25c59bec5034.webp",
    "https://tb-static.uber.com/prod/image-proc/processed_images/e167e92c5ce50d917abc7604c3dd462c/97ef7458dde62fa918635bc21265d9f5.jpeg",
    "https://tb-static.uber.com/prod/image-proc/processed_images/f88ab0043621a008e761ac1f959dc8e1/ec1689ae3a25695f1b8e25c59bec5034.jpeg",
    "https://d1ralsognjng37.cloudfront.net/f8bccb34-6af4-4e05-a957-b086a752e939.jpeg",
    "https://d1ralsognjng37.cloudfront.net/db35ef92-52f5-4195-a732-0946c037f817.jpeg",
    "https://tb-static.uber.com/prod/image-proc/processed_images/087213ee09a12d82eab4f192aa53b8cc/97ef7458dde62fa918635bc21265d9f5.jpeg",
    "https://d1ralsognjng37.cloudfront.net/9a529866-0901-4b94-a841-66e29002ec21.jpeg",
    "https://duyt4h9nfnj50.cloudfront.net/sku/11ee6dcf54ac5a284b32a9672cb3b459",
    "https://tb-static.uber.com/prod/image-proc/processed_images/2fcc5e722964980e528a84becc3682a8/97ef7458dde62fa918635bc21265d9f5.jpeg",
    "https://tb-static.uber.com/prod/image-proc/processed_images/99818a4d4b7eb1876fc2ad5fbdf5f155/97ef7458dde62fa918635bc21265d9f5.jpeg",
    "https://tb-static.uber.com/prod/image-proc/processed_images/d81605762a714617f36d10d897a323d3/ec1689ae3a25695f1b8e25c59bec5034.jpeg",
    "https://tb-static.uber.com/prod/image-proc/processed_images/ea6c28091569d034cba693d1bc5d58fe/97ef7458dde62fa918635bc21265d9f5.jpeg",
    "https://tb-static.uber.com/prod/image-proc/processed_images/2806b5c77a93227cb4183246357300eb/ec1689ae3a25695f1b8e25c59bec5034.webp",
    "https://tb-static.uber.com/prod/image-proc/processed_images/f5af42c2310117c78d50857926f42778/97ef7458dde62fa918635bc21265d9f5.jpeg",
    "https://tb-static.uber.com/prod/image-proc/processed_images/a64891738d49769432a8e12c31d09ab1/ec1689ae3a25695f1b8e25c59bec5034.jpeg",
    "https://tb-static.uber.com/prod/image-proc/processed_images/75770113ea80c6c5d7be8f08ec287199/6a46de29c91d235bc2878fe87fd740f6.jpeg",
    "https://tb-static.uber.com/prod/image-proc/processed_images/a779cfcd2a6734e6f4ce3347ca7cb87a/ec1689ae3a25695f1b8e25c59bec5034.jpeg",
    "https://tb-static.uber.com/prod/image-proc/processed_images/4cde91f42de2b6be51378138464f0369/97ef7458dde62fa918635bc21265d9f5.jpeg",
    "https://tb-static.uber.com/prod/image-proc/processed_images/ee8b9ce639b698408e62baf37d3f8d68/97ef7458dde62fa918635bc21265d9f5.jpeg",
    "https://tb-static.uber.com/prod/image-proc/processed_images/33c856d5c806a76b460ab5137f775f4a/ec1689ae3a25695f1b8e25c59bec5034.webp",
    "https://tb-static.uber.com/prod/image-proc/processed_images/053d905ff5d6e4169077730212825bc5/97ef7458dde62fa918635bc21265d9f5.jpeg"
    ]

    for i in range(len(restaurants)):
        restaurants[i]['name']=restaurant_names[i]
        restaurants[i]['image']=restaurant_links[i]

    [db.session.add(Restaurant(**restaurant)) for restaurant in restaurants]
    db.session.commit()

def undo_restaurants():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.Restaurants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM Restaurants"))

    db.session.commit()

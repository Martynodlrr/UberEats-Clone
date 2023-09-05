import './index.css'

export default function Categories() {

    const categories = {
        1: {
            title: 'Deals',
            imgUrl: 'deals.png'
        },
        2: {
            title: 'Grocery',
            imgUrl: 'uber_grocery.png'
        },
        3: {
            title: 'Convenience',
            imgUrl: 'convenience.png'
        },
        4: {
            title: 'Fast Food',
            imgUrl: 'fastfood.png'
        },
        5: {
            title: 'Alcohol',
            imgUrl: 'alcohol.png'
        },
        6: {
            title: 'Pharmacy',
            imgUrl: 'pharmacy-v2.png'
        },
        7: {
            title: 'Baby',
            imgUrl: 'baby.png'
        },
        8: {
            title: 'Specialty Foods',
            imgUrl: 'specialy_transparent_background.png'
        },
        9: {
            title: 'Pet Supplies',
            imgUrl: 'pet_supplies.png'
        },
        10: {
            title: 'Flowers',
            imgUrl: 'flowers_transparent_background.png'
        },
        11: {
            title: 'Retail',
            imgUrl: 'retail-v2.png'
        },
        12: {
            title: 'Electronics',
            imgUrl: 'electronics.png'
        },
    }
    return (
        <div id='categories'>
            {
                Object.values(categories).map(category => {
                    return <div className="category">
                        <a href={`#${category.title}`} className="hrefs">
                            <img src={`/images/category-images/${category.imgUrl}`} className='category-image' />
                            <p className='category-title'>{category.title}</p>
                        </a>
                    </div>
                })
            }
        </div >
    )
}

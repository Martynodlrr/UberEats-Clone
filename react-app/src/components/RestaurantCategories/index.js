
import './index.css'
export default function RestaurantCategories() {

    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9,]

    return (
        <div id='restaurant-categories'>
            {
                arr.map(() => {
                    return <div className="restaurant-category">
                        <h1 className='category-name'>Category Name</h1>
                        <div className='restaurant-category-list'>
                            <div className='category-restaurant category-restaurant-margin'>
                                <img className='restaurant-category-image' src='https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvMWI4MDA3NTRhMGE2YjNmY2ViZjI3MDM2MDk3NTM1MmYvODIwODgzYTQ4NTY3NjcwYWNiZDcyMGJjNzYzOTEyOTEuanBlZw==' />
                                <p className='category-restaurant-name'>Restaurant Name</p>
                                <p>$100 Delivery Fee</p>
                            </div>
                            <div className='category-restaurant category-restaurant-margin'>
                                <img className='restaurant-category-image' src='https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvMWI4MDA3NTRhMGE2YjNmY2ViZjI3MDM2MDk3NTM1MmYvODIwODgzYTQ4NTY3NjcwYWNiZDcyMGJjNzYzOTEyOTEuanBlZw==' />
                                <p className='category-restaurant-name'>Restaurant Name</p>
                                <p>$100 Delivery Fee</p>
                            </div>
                            <div className='category-restaurant category-restaurant-margin'>
                                <img className='restaurant-category-image' src='https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvMWI4MDA3NTRhMGE2YjNmY2ViZjI3MDM2MDk3NTM1MmYvODIwODgzYTQ4NTY3NjcwYWNiZDcyMGJjNzYzOTEyOTEuanBlZw==' />
                                <p className='category-restaurant-name'>Restaurant Name</p>
                                <p>$100 Delivery Fee</p>
                            </div>
                            <div className='category-restaurant'>
                                <img className='restaurant-category-image' src='https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvMWI4MDA3NTRhMGE2YjNmY2ViZjI3MDM2MDk3NTM1MmYvODIwODgzYTQ4NTY3NjcwYWNiZDcyMGJjNzYzOTEyOTEuanBlZw==' />
                                <p className='category-restaurant-name'>Restaurant Name</p>
                                <p>$100 Delivery Fee</p>
                            </div>
                        </div>

                    </div>
                })
            }
        </div>
    )
}

import LaptopImage from "../assets/Images/joshua-reddekopp-SyYmXSDnJ54-unsplash.jpg"

export const ComingSoon = () => {
  return (
    <div className="min-h-screen  bg-light-bg dark:bg-dark-bg">
        <div className="w-full max-w-md md:p-10 h-80 md:h-100 mx-auto">
            <img src={LaptopImage} alt="Laptop" className="w-full h-full shadow-[0_0_30px_0] shadow-primary/20 object-cover" />
        </div>
        <div className="p-5 flex items-center flex-col justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-center font-technical font-bold text-black dark:text-white">The Future Of Performance</h1>
            <p className="text-center max-w-xl w-full text-sm md:text-xl text-secondary mt-4">Our new collection of high-performance laptops is on the horizon. Stay tuned for cutting-edge technology, sleek designs, and unparalleled power. Get ready to elevate your computing experience with us in 2026.</p>

            <div className="">
                <div className="">
                </div>
            </div>
        </div>
    </div>
  )
}

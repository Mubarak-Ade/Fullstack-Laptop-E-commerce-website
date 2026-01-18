interface Specs {
    screenSize: string,
    cpu: string,

    gpu: string,
    ram: string,
    storage: string,
    os: string,
    battery: string,
}
export interface Product {
    name: string,
    brand: string,
    stocks: number,
    rating: number,
    image: [ string ],

    specs: Specs
    numReviews: number,
    discountPrice: string,
    price: string,
}

export interface CreateProduct {
    data: Product
}

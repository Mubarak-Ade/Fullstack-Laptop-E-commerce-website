export interface Product {
    name: string,
    brand: string,
    screenSize: string,
    processor: string,
    graphics: string,
    memory: string,
    image: string,
    storage: string,
    weight: string,
    os: string,
    battery: string,
    price: string,
}

export interface Cart extends Product {
    idx: string
    spec?: string,
}
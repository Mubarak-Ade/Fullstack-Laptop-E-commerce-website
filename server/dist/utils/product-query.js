const asPositiveInt = (value, fallback) => {
    const parsed = Number(value);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};
const asNumber = (value) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
};
const asStringArray = (query, key) => {
    const directValue = query[key];
    const bracketValue = query[`${key}[]`];
    const source = directValue ?? bracketValue;
    if (Array.isArray(source)) {
        return source.map(String).map(v => v.trim()).filter(Boolean);
    }
    if (typeof source === 'string') {
        return source
            .split(',')
            .map(v => v.trim())
            .filter(Boolean);
    }
    return [];
};
const sortMap = {
    newest: { createdAt: -1 },
    'price-low': { price: 1, createdAt: -1 },
    'price-high': { price: -1, createdAt: -1 },
    discount: { discountPrice: 1, createdAt: -1 },
};
export const parseProductQuery = (query) => {
    const page = asPositiveInt(query.page, 1);
    const limit = asPositiveInt(query.limit, 5);
    const filter = {};
    const minPrice = asNumber(query.min);
    const maxPrice = asNumber(query.max);
    if (minPrice !== undefined || maxPrice !== undefined) {
        const priceFilter = {};
        if (minPrice !== undefined)
            priceFilter.$gte = minPrice;
        if (maxPrice !== undefined)
            priceFilter.$lte = maxPrice;
        filter.price = priceFilter;
    }
    const brands = asStringArray(query, 'brands');
    const cpus = asStringArray(query, 'cpu');
    const rams = asStringArray(query, 'ram');
    const storages = asStringArray(query, 'storage');
    if (brands.length)
        filter.brand = { $in: brands };
    if (cpus.length)
        filter.cpu = { $in: cpus };
    if (rams.length)
        filter.ram = { $in: rams };
    if (storages.length)
        filter.storage = { $in: storages };
    const search = typeof query.search === 'string' ? query.search.trim() : '';
    if (search) {
        filter.$or = [{ name: { $regex: search, $options: 'i' } }, { slug: { $regex: search, $options: 'i' } }];
    }
    const rawSort = typeof query.sort === 'string' ? query.sort : 'newest';
    const sortKey = rawSort in sortMap ? rawSort : 'newest';
    return {
        page,
        limit,
        filter,
        sort: sortMap[sortKey],
    };
};

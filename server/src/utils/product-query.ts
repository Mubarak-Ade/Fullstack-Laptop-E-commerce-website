type RawQuery = Record<string, unknown>;

const asPositiveInt = (value: unknown, fallback: number) => {
    const parsed = Number(value);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

const asNumber = (value: unknown) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
};

const asStringArray = (query: RawQuery, key: string): string[] => {
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

export type ProductSort = 'newest' | 'price-low' | 'price-high' | 'discount';

const sortMap: Record<ProductSort, Record<string, 1 | -1>> = {
    newest: { createdAt: -1 },
    'price-low': { price: 1, createdAt: -1 },
    'price-high': { price: -1, createdAt: -1 },
    discount: { discountPrice: 1, createdAt: -1 },
};

export const parseProductQuery = (query: RawQuery) => {
    const page = asPositiveInt(query.page, 1);
    const limit = asPositiveInt(query.limit, 5);

    const filter: Record<string, unknown> = {};
    const minPrice = asNumber(query.min);
    const maxPrice = asNumber(query.max);

    if (minPrice !== undefined || maxPrice !== undefined) {
        const priceFilter: Record<string, number> = {};
        if (minPrice !== undefined) priceFilter.$gte = minPrice;
        if (maxPrice !== undefined) priceFilter.$lte = maxPrice;
        filter.price = priceFilter;
    }

    const brands = asStringArray(query, 'brands');
    const cpus = asStringArray(query, 'cpu');
    const rams = asStringArray(query, 'ram');
    const storages = asStringArray(query, 'storage');

    if (brands.length) filter.brand = { $in: brands };
    if (cpus.length) filter.cpu = { $in: cpus };
    if (rams.length) filter.ram = { $in: rams };
    if (storages.length) filter.storage = { $in: storages };

    const search = typeof query.search === 'string' ? query.search.trim() : '';
    if (search) {
        filter.$or = [{ name: { $regex: search, $options: 'i' } }, { slug: { $regex: search, $options: 'i' } }];
    }

    const rawSort = typeof query.sort === 'string' ? query.sort : 'newest';
    const sortKey: ProductSort = rawSort in sortMap ? (rawSort as ProductSort) : 'newest';

    return {
        page,
        limit,
        filter,
        sort: sortMap[sortKey],
    };
};

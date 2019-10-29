const RED = '#c5474a';
const GREEN = '#01b050';
const YELLOW = '#ffc001';
const LIGHTGREEN = '#92d050';

export const data = {
    key: 'Bakery Snacks',
    value: 1,
    n: 300, 
    rank: 207,
    children: [
        {
            key: 'Planned',
            color: RED,
            value: 0.54,
            benchmark: 0.72,
            rank: 177,
            children: [
                {
                    key: 'No promotion',
                    color: RED,
                    value: 0.46,
                    benchmark: 0.65,
                    rank: 180,
                    children: [
                        {
                            key: 'Regular purchase',
                            color: RED,
                            value: 0.27,
                            benchmark: 0.52,
                            rank: 195,
                        },
                        {
                            key: 'Particular use',
                            value: 0.09,
                            benchmark: 0.11,
                            rank: 102,
                        },
                        {
                            key: 'Requested',
                            color: GREEN,
                            value: 0.14,
                            benchmark: 0.08,
                            rank: 29,
                        },
                        {
                            key: 'Try for a change',
                            value: 0.03,
                            benchmark: 0.02,
                            rank: 71,
                        },
                    ],
                },
                {
                    key: 'Promotion trigger',
                    color: RED,
                    value: 0.06,
                    benchmark: 0.09,
                    rank: 166,
                    children: [
                        {
                            key: 'Catalogue',
                            color: RED,
                            value: 0.04,
                            benchmark: 0.07,
                            rank: 169,
                        },
                        {
                            key: 'Advert',
                            value: 0.02,
                            benchmark: 0.02,
                            rank: 93,
                        },
                        {
                            key: 'Internet info',
                            color: YELLOW,
                            value: 0.001,
                            benchmark: 0.01,
                            rank: 160,
                        },
                        {
                            key: 'Coupon',
                            value: 0.001,
                            benchmark: 0.01,
                            rank: 106,
                        },
                    ],
                },
            ],
        },
        {
            key: 'Unplanned',
            color: GREEN,
            value: 0.46,
            benchmark: 0.29,
            rank: 31,
            children: [
                {
                    key: 'No promotion',
                    color: GREEN,
                    value: 0.22,
                    benchmark: 0.15,
                    rank: 46,
                },
                {
                    key: 'Promotion trigger',
                    color: GREEN,
                    value: 0.28,
                    benchmark: 0.16,
                    rank: 39,
                    children: [
                        {
                            key: 'Price/Specials',
                            color: LIGHTGREEN,
                            value: 0.12,
                            benchmark: 0.07,
                            rank: 43,
                        },
                        {
                            key: 'Display',
                            color: GREEN,
                            value: 0.20,
                            benchmark: 0.10,
                            rank: 21,
                        },
                        {
                            key: 'Info in store',
                            value: 0.01,
                            benchmark: 0.01,
                            rank: 111,
                        },
                        {
                            key: 'New',
                            value: 0.03,
                            benchmark: 0.01,
                            rank: 61,
                        },
                    ],
                },
            ],
        },
    ],
};

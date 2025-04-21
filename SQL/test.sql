CREATE TABLE tile_table(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    extent DOUBLE PRECISION [4] NOT NULL,
    center DOUBLE PRECISION [2],
    zoom DOUBLE PRECISION [2],
    projection VARCHAR(255) NOT NULL,
    thubmnailBase64Img TEXT
)
INSERT INTO tile_table (
        name,
        extent,
        center,
        zoom,
        projection,
        thubmnailBase64Img
    )
VALUES (
        'test',
        ARRAY [1, 2, 3, 4],
        ARRAY [1, 2],
        ARRAY [1, 2],
        'EPSG:4326',
        'test'
    ),
    (
        'test',
        ARRAY [1, 2, 3, 4],
        ARRAY [1, 2],
        ARRAY [1, 2],
        'EPSG:4326',
        'test'
    ),
    (
        'test',
        ARRAY [1, 2, 3, 4],
        ARRAY [1, 2],
        ARRAY [1, 2],
        'EPSG:4326',
        'test'
    ),
    (
        'test',
        ARRAY [1, 2, 3, 4],
        ARRAY [1, 2],
        ARRAY [1, 2],
        'EPSG:4326',
        'test'
    )
SELECT *
FROM tile_table;
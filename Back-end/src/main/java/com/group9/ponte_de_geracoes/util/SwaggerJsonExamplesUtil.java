package com.group9.ponte_de_geracoes.util;

public class SwaggerJsonExamplesUtil {

    public static final String ADRESSES_CITIES_PAGE_POPULATED_LIST_EXAMPLE = """
    {
        "content": [
            "Porto Alegre",
            "Rio Branco",
            "São Paulo"
        ],
        "page": {
            "size": 20,
            "number": 0,
            "totalElements": 3,
            "totalPages": 1
        }
    }
    """;

    public static final String ADRESSES_CITIES_PAGE_EMPTY_LIST_EXAMPLE = """
    {
        "content": [],
        "page": {
            "size": 20,
            "number": 0,
            "totalElements": 0,
            "totalPages": 0
        }
    }
    """;
    
}

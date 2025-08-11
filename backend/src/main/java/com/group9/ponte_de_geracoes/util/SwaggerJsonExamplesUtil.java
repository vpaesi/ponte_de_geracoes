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

    public static final String HELPERS_PAGE_POPULATED_LIST_EXAMPLE = """
    {
        "content": [
            {
                "id": 1,
                "name": "Jorge Doe",
                "birthDate": "2005-05-12",
                "rg": "123456789",
                "cpf": "123.456.789-10",
                "email": "luladoe@example.com",
                "phone": "(11) 98765-4321",
                "password": "password123",
                "skills": "Cozinheiro, Jardineiro",
                "availableDays": [
                    "Segunda, Quarta, Sexta"
                ],
                "aboutYou": "Adoro ajudar em tarefas domésticas e jardinagem.",
                "profileImageUrl": "/uploads/generic-icon.jpg",
                "address": {
                    "id": 1,
                    "city": "São Paulo",
                    "zipCode": "01000-000",
                    "street": "Rua Exemplo",
                    "number": "123",
                    "complement": "Apt. 45"
                },
                "available": true
            }
        ],
        "page": {
            "size": 10,
            "number": 0,
            "totalElements": 1,
            "totalPages": 1
        }
    }
    """;

    public static final String HELPERS_PAGE_EMPTY_LIST_EXAMPLE = """
    {
        "content": [],
        "page": {
            "size": 10,
            "number": 0,
            "totalElements": 0,
            "totalPages": 0
        }
    }
    """;

    public static final String ASSISTEDS_PAGE_POPULATED_LIST_EXAMPLE = """
    {
        "content": [
            {
                "id": 1,
                "userType": "assisted",
                "name": "Maria Silva",
                "email": "maria@email.com",
                "phone": "(11) 99999-9999",
                "birthDate": "1940-03-25",
                "cpf": "123.456.789-00",
                "profileImageUrl": "/uploads/assisted/maria.jpg",
                "isAvailable": true,
                "availableDays": ["Segunda", "Quarta", "Sexta"],
                "needsAndSkills": ["Compras", "Companhia"],
                "aboutYou": "Gosto de conversar e receber visitas",
                "address": {
                    "street": "Rua das Flores",
                    "number": "123",
                    "city": "São Paulo",
                    "zipCode": "01234-567"
                }
            }
        ],
        "pageable": {
            "sort": {
                "sorted": true,
                "unsorted": false,
                "empty": false
            },
            "pageNumber": 0,
            "pageSize": 10,
            "offset": 0,
            "paged": true,
            "unpaged": false
        },
        "totalElements": 1,
        "totalPages": 1,
        "last": true,
        "first": true,
        "numberOfElements": 1,
        "size": 10,
        "number": 0,
        "sort": {
            "sorted": true,
            "unsorted": false,
            "empty": false
        },
        "empty": false
    }
    """;

    public static final String ASSISTEDS_PAGE_EMPTY_LIST_EXAMPLE = """
    {
        "content": [],
        "pageable": {
            "sort": {
                "sorted": true,
                "unsorted": false,
                "empty": false
            },
            "pageNumber": 0,
            "pageSize": 10,
            "offset": 0,
            "paged": true,
            "unpaged": false
        },
        "totalElements": 0,
        "totalPages": 0,
        "last": true,
        "first": true,
        "numberOfElements": 0,
        "size": 10,
        "number": 0,
        "sort": {
            "sorted": true,
            "unsorted": false,
            "empty": false
        },
        "empty": true
    }
    """;
}

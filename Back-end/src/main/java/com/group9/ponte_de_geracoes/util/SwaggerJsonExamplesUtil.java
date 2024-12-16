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
                "name": "João Paulo",
                "birthDate": "2005-05-12",
                "rg": "123456789",
                "cpf": "123.456.789-10",
                "email": "joaopaulo@example.com",
                "phone": "(11) 98765-4321",
                "password": "password123",
                "needs": "Preciso de ajuda na Cozinha e tarefas básicas",
                "needsHelp": true,
                "profileImageUrl": "/uploads/generic-icon.jpg",
                "availableDays": [
                    "Segunda, Quarta, Sexta"
                ],
                "aboutYou": "Adoro ajudar em tarefas domésticas e jardinagem.",
                "address": {
                    "id": 3,
                    "city": "São Paulo",
                    "zipCode": "01000-000",
                    "street": "Rua Exemplo",
                    "number": "123",
                    "complement": "Apt. 45"
                }
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

    public static final String ASSISTEDS_PAGE_EMPTY_LIST_EXAMPLE = """
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



}

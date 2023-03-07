import Purchase from "../../src/models/Purchase"

export const PurchasesMock = [
    new Purchase(
        "371033e1-4fd6-4a0b-ae22-2277092e0767",
        "09e4fb34-1e4d-4037-8ff1-539f03dff6ab",
        1,
        1,
        6250.8,
        new Date(2023, 2, 15)),
    new Purchase(
        "1c4e8d56-cd21-425c-ae7c-20d776f2c21a",
        "0s0dg5-dsfsd-6513-tx7v3al-45df3-dfgj",
        2,
        2,
        500,
        new Date(2023, 2, 17)
    ),
    new Purchase(
        "acc7a5e4-ef18-4a54-85be-962d6801f643",
        "0s0dg5-dsfsd-6513-tx7v3al-45df3-dfgj",
        3,
        1,
        1390,
        new Date(2023, 2, 18)
    ),
]
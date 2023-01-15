const navbarLinks = [
    {
        id: 1,
        name: "Pc Gamer",
        url: "torres"
    },
    {
        id: 2,
        name: "Laptops",
        url: "laptops"
    },
    {
        id: 3,
        name: "Procesadores",
        url: "cpu"
    },
    {
        id: 4,
        name: "GPU",
        url: "gpu"
    },
    {
        id: 5,
        name: "Ram",
        url: "ram"
    },
    {
        id: 6,
        name: "Motherboards",
        url: "motherboard"
    },
    {
        id: 7,
        name: "Perifericos",
        url: "perifericos"
    },
]

export default function getItems() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(navbarLinks);
        }, 1);
    });
}

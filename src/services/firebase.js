import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc,
    query,
    where,
    setDoc,
    deleteDoc,
    orderBy,
    limit
} from "firebase/firestore";
import { useEffect } from "react";

const firebaseConfig = {
    apiKey: "AIzaSyB_ULCsfO3HQ60T9ZFvG2z0bl0Eyhm3eII",
    authDomain: "proyecto-web2-10906.firebaseapp.com",
    projectId: "proyecto-web2-10906",
    storageBucket: "proyecto-web2-10906.appspot.com",
    messagingSenderId: "597735482640",
    appId: "1:597735482640:web:f169449d7b6c738c773195"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const db = getFirestore(app);
const purchasesCollectionRef = collection(db, "purchases");

//obtiene todos los productos
export async function getItems() {
    const productsCollection = collection(db, "products");
    const q = query(
        productsCollection,
        orderBy("price"),
        limit(100)
    );

    const querySnapshot = await getDocs(q);
    const dataDocs = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    }));
    return dataDocs;
}

// Obtiene un producto
export async function getSingleItem(itemid) {
    const docRef = doc(db, "products", itemid);
    const snapshot = await getDoc(docRef);
    const docData = snapshot.data();
    docData.id = snapshot.id;
    return docData;
}

// items por categoria
export async function getItemsByCategory(categoryid) {
    const productsCollectionRef = collection(db, "products");
    const q = query(productsCollectionRef, where("category", "==", categoryid));
    const querySnapshot = await getDocs(q);
    const dataDocs = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    }));
    return dataDocs
}

// Agregar esta funcion en el useEffect de itemListContainer solo la primera vez para crear los productos en la bd
export async function exportData() {
    const productsCollectionRef = collection(db, "products");
    const products = [
        {
            id: 1,
            category: "laptops",
            marca: "HP",
            stock: 10,
            name: "Portatil HP Victus 15 RTX 3050Ti",
            price: 4536000,
            imgurl: "https://m.media-amazon.com/images/I/71h2AVQdfGL._AC_SX679_.jpg",
            detail:
                "HP Portátil para juegos Victus 15 2022, pantalla FHD de 15.6 pulgadas 144 Hz, AMD Ryzen 7 5800H (hasta 4.4 GHz), Nvidia RTX 3050Ti (32 GB de RAM | SSD de 1 TB)",
        },
        {
            id: 2,
            category: "gpu",
            stock: 5,
            name: "NVIDIA GeForce RTX 3060 V2",
            marca: "NVIDIA",
            price: 2392560,
            imgurl: "https://m.media-amazon.com/images/I/81m8ydoV6SL._AC_SX679_.jpg",
            detail:
                "ASUS TUF Gaming NVIDIA GeForce RTX 3060 V2 OC Edition Tarjeta gráfica (PCIe 4.0, 12GB GDDR6, HDMI 2.1, DisplayPort 1.4a",
        },
        {
            id: 3,
            category: "ram",
            stock: 6,
            marca: "TEAMGROUP",
            name: "Ram 16gb Teamgroup",
            price: 219000,
            imgurl:
                "https://http2.mlstatic.com/D_NQ_NP_853795-MCO48477278568_122021-O.webp",
            detail:
                "Teamgroup T-Force Vulcan Z DDR4 16 GB Kit (2x8GB) 3200MHz (PC4-25600) CL16 Módulo de memoria de escritorio Ram (gris)",
        },
        {
            id: 4,
            category: "motherboard",
            stock: 8,
            marca: "ASUS",
            name: "ASUS ROG Strix B550-F Gaming AMD",
            price: 930000,
            imgurl: "https://m.media-amazon.com/images/I/81Q-hxowAqL._AC_SX466_.jpg",
            detail:
                "ASUS ROG Strix B550-F Gaming AMD AM4 Zen 3 Ryzen 5000 y 3ª generación Ryzen ATX placa base para juegos (PCIe 4.0, LAN de 2.5 Gb, flash BIOS, HDMI 2.1, cabecera RGB direccionable Gen 2 y sincronización Aura)",
        },
        {
            id: 5,
            category: "torres",
            stock: 4,
            marca: "MYGADGEDSTORE",
            name: "Computadora de escritorio para videojuegos",
            price: 6345000,
            imgurl: "https://m.media-amazon.com/images/I/71h7ffM-l0L._AC_SX466_.jpg",
            detail:
                "Ryzen 5 5600X 3.7GHz, RTX 3060 TI 8G, SSD NVMe de 1 TB, DDR4 de 16 GB 3200 MHz, ventiladores RGB, Windows 10 Home de 64 bits, Wi-Fi 802.11CA, blanco",
        },
        {
            id: 6,
            category: "cpu",
            marca: "AMD",
            stock: 9,
            name: "AMD Ryzen 5 5600G",
            price: 629000,
            imgurl: "https://m.media-amazon.com/images/I/51f2hkWjTlL._AC_SX466_.jpg",
            detail:
                "AMD Ryzen 5 5600G - Procesador de escritorio desbloqueado de 6 núcleos de 12 hilos con gráficos Radeon",
        },
        {
            id: 7,
            category: "perifericos",
            marca: "LOGITECH",
            stock: 6,
            name: "Logitech G502 HERO",
            price: 243000,
            imgurl:
                "https://megacomputer.com.co/wp-content/uploads/2022/05/G502-KDA-02.jpg",
            detail:
                "Logitech G502 HERO - Mouse para juegos de alto rendimiento con cable, sensor HERO 25K, 25,600 ppp, RGB, pesos ajustables, 11 botones programables, memoria integrada, PC/Mac",
        },
        {
            id: 8,
            category: "perifericos",
            marca: "KEYCHRON",
            stock: 4,
            name: "Keychron K8 TKL Teclado mecánico para juegos",
            price: 390000,
            imgurl: "https://m.media-amazon.com/images/I/71I1H5VY7RL._AC_SX466_.jpg",
            detail:
                "Keychron K8 TKL Teclado mecánico para juegos inalámbrico/con cable, 87 teclas, RGB iluminado, Gateron G Pro Brown Switch, Windows Mac PC Gamer",
        },
        {
            id: 9,
            category: "gpu",
            marca: "AMD",
            stock: 7,
            name: "MSI AMD Radeon RX 6600 de 128 bits de 8 GB GDDR6",
            price: 1562000,
            imgurl: "https://m.media-amazon.com/images/I/71rir178OnL._AC_SX679_.jpg",
            detail:
                "MSI AMD Radeon RX 6600 de 128 bits de 8 GB GDDR6 DP/HDMI Dual Torx Fans FreeSync DirectX 12 VR Ready Tarjeta gráfica (RX 6600 MECH 2X 8G)",
        },
        {
            id: 10,
            category: "laptops",
            marca: "LENOVO",
            stock: 3,
            name: "Lenovo - Legion 5 - Laptop para juegos ",
            price: 5614010,
            imgurl: "https://m.media-amazon.com/images/I/81PbOX7ZtaL._AC_SX679_.jpg",
            detail:
                "Lenovo - Legion 5 - Laptop para juegos - AMD Ryzen 7 5800H - 16 GB de RAM - 512 GB de almacenamiento - NVIDIA GeForce RTX 3050Ti - Pantalla FHD de 15.6 pulgadas - Windows 11 Home",
        },
        {
            id: 11,
            category: "cpu",
            marca: "INTEL",
            stock: 5,
            name: "Intel Core i7-12700KF",
            price: 1351000,
            imgurl: "https://m.media-amazon.com/images/I/51o+isnQxdL._AC_SX466_.jpg",
            detail:
                "Intel Core i7-12700KF Procesador de escritorio 12 núcleos (8P+4E) de hasta 5.0 GHz desbloqueado LGA1700 Serie 600 Chipset de 125W",
        },
        {
            id: 12,
            category: "motherboard",
            marca: "ASUS",
            stock: 6,
            name: "ASUS TUF Gaming Z690-Plus WiFi",
            price: 1916000,
            imgurl: "https://m.media-amazon.com/images/I/81y-Yju6giL._AC_SX466_.jpg",
            detail:
                "ASUS TUF Gaming Z690-Plus WiFi LGA 1700 (Intel12ª generación) ATX Gaming Motherboard (PCIe 5.0, DDR5, 4xNVMe SSD, 14+2 etapas de potencia, WiFi 6, LAN de 2.5 GB, puertos USB frontales 3.2 Gen 2 tipo C, Thunderbolt 4)",
        },
        {
            id: 13,
            category: "gpu",
            marca: "NVIDIA",
            stock: 3,
            name: "ZOTAC Gaming GeForce RTX 4090",
            price: 10195000,
            imgurl: "https://m.media-amazon.com/images/I/81DvFNLU3HL._AC_SX679_.jpg",
            detail:
                "ZOTAC Gaming GeForce RTX 4090 Trinity OC 24GB GDDR6X 384-bit 21 Gbps PCIE 4.0 Tarjeta gráfica para juegos, IceStorm 3.0 Advanced Cooling, Spectra 2.0 RGB Lighting, ZT-D40900J-10P",
        },
        {
            id: 14,
            category: "perifericos",
            marca: "LOGITECH",
            stock: 4,
            name: "Logitech G305 LIGHTSPEED",
            price: 190000,
            imgurl: "https://corporativo.tecnoplaza.com.co/wp-content/uploads/2019/01/Caracteristicas-Mouse-G305--600x600.jpg",
            detail:
                "Logitech G Mouse inalámbrico para juegos 305 LIGHTSPEED, sensor Hero 12K, 12,000 DPI, ligero, 6 botones programables, batería de 250 horas, memoria a bordo, PC/Mac, color negro",
        },
        {
            id: 15,
            category: "perifericos",
            marca: "REDRAGON",
            stock: 6,
            name: "Redragon Teclado mecánico para juegos RGB ",
            price: 210000,
            imgurl: "https://m.media-amazon.com/images/I/71cngLX2xuL._AC_SX679_.jpg",
            detail:
                "Redragon Teclado mecánico para juegos RGB LED Rainbow retroiluminado con cable con interruptores rojos para Windows Gaming PC",
        },
    ];
    for (let item of products) {
        item.index = item.id;
        delete item.id;
        addDoc(productsCollectionRef, item).then((res) =>
            console.log("Documento creado:", res.id)
        );
    }
}

// Función para guardar una compra en la base de datos
export async function savePurchase(userUid, cart) {
    const purchaseData = {
        userId: userUid,
        items: cart.map((item) => ({
            productId: item.id,
            name: item.name,
            quantity: item.count,
            totalPrice: item.price * item.count,
        })),
        timestamp: new Date(),
    };

    // Agregar la compra a la colección "purchases"
    const docRef = await addDoc(purchasesCollectionRef, purchaseData);
    console.log("Compra guardada con ID:", docRef.id);
}

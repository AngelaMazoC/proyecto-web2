

export default function getItems() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(databaseItems);
    }, 10);
  });
}

export function getItemsByCategory(categoryid) {
  let itemsCat = databaseItems.filter((item) => item.category === categoryid);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(itemsCat);
    }, 200);
  });
}

export function getSingleItem(itemId) {
  let itemDetail = databaseItems.find((item) => {
    return item.id === parseInt(itemId);
  })

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (itemDetail !== undefined) resolve(itemDetail);
      else reject("Item no encontrado en la base de datos.");
    }, 200);
  });
}
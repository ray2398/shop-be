import DB from "../database/db.json";

/* Function to get all products. */

const getAll = async (
  lastVisible: number = 0,
  search?: string,
  limit: number = 5
) => {
  let data = DB;
  let allItems = data.productos[0].items;

  if (search && search !== "") {
    allItems = allItems.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(search) ||
        producto.categoria.toLowerCase().includes(search) ||
        producto.fechaCaducidad.includes(search)
    );
  }

  const paginatedItems = allItems.slice(lastVisible, lastVisible + limit);

  const lastVisibleId = lastVisible + paginatedItems.length;

  if (paginatedItems.length === 0) {
    throw new Error("No products found");
  }

  return {
    results: paginatedItems,
    lastVisibleId,
    totalProducts: allItems.length,
  };
};

export { getAll };

import DB from "../database/db.json";

/* Function to get all products. */

const getAll = async (
  lastVisible: number = 0,
  search?: string,
  limit: number = 5
) => {
  let data = DB;
  let allItems = data.productos[0].items

  const paginatedItems = allItems.slice(lastVisible, lastVisible + limit);

  const lastVisibleId = lastVisible + paginatedItems.length;

  if (paginatedItems.length === 0) {
    throw new Error('No products found');
  }
  
  return {
    results: paginatedItems,
    lastVisibleId,
    totalProducts: allItems.length
  };
};

export { getAll };

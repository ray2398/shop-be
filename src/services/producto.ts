import DB from "../database/db.json";

const parseDate = (dateString: string): Date | null => {
  if (!dateString) return null;
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const filterProductos = (
  items: any[],
  category: string,
  searchText: string,
  dateStart: string,
  dateFinish: string
): any[] => {
  const startDate = parseDate(dateStart);
  const endDate = parseDate(dateFinish);

  return items.filter((item) => {
    // Filter by category
    if (
      category !== "" &&
      item.categoria.toLowerCase() !== category.toLowerCase()
    ) {
      return false;
    }

    // Filter by text
    if (
      searchText !== "" &&
      !(
        item.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
        item.categoria.toLowerCase().includes(searchText.toLowerCase()) ||
        item.fechaCaducidad.includes(searchText)
      )
    ) {
      return false;
    }

    // Filter by start and end dates
    const itemDate = parseDate(item.fechaCaducidad);

    if (startDate && itemDate && itemDate < startDate) {
      return false;
    }

    if (endDate && itemDate && itemDate > endDate) {
      return false;
    }

    return true;
  });
};

/* Function to get all products. */
const getAll = async (
  lastVisible: number = 0,
  search: string = "",
  category: string = "",
  dateStart: string = "",
  dateFinish: string = "",
  limit: number = 5
) => {
  let data = DB;
  let allItems = data.productos[0].items;

  allItems = filterProductos(allItems, category, search, dateStart, dateFinish);

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

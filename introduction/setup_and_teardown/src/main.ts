type City = {
  name: string;
  foods: string[];
};
const cities: City[] = [
  { name: 'Vienna', foods: ['Wiener Schnitzel'] },
  { name: 'San Juan', foods: ['Mofongo'] },
];

const isValidCityFoodPair = (name: string, food: string): boolean => {
  const idx = db.cities.findIndex((city) => city.name === name);
  if (idx == -1) return false;
  return db.cities[idx].foods.includes(food);
};

let db = {
  cities,
};

const initializeCityDatabase = async () => {
  db = { cities };
};
const clearCityDatabase = async () => {
  db = { cities };
};

const initializeFoodDatabase = async () => {
  db = { cities };
};

const isCity = async (city: string) => {
  // DBから検索
  return db.cities.map(({ name }) => name).includes(city);
};

export {
  initializeCityDatabase,
  clearCityDatabase,
  isCity,
  isValidCityFoodPair,
  initializeFoodDatabase,
};

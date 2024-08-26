const baseURL = "https://www.themealdb.com/api/json/v1/1"

const urls = {
    categories: "/categories.php",
    meals: (id: string) => `/filter.php?c=${id}`,
    meal: (id: string) => `/lookup.php?i=${id}`,
    search: (name: string) => `/search.php?s=${name}`
}
export {
    baseURL,
    urls
}
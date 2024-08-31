const mainSelector = (store) => store.store

export default mainSelector

export const totalCountResults = (store) => mainSelector(store).total_count

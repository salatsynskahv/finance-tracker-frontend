import {create} from 'zustand';

export const useAppStore = create((set) => (
        {
            username: '',
            allExpences: [],
            categories: [],
            categoryExpences: [],
            sumByCategories: {},
            initUsername: (username) => set({ username }),
            initAllExpences : (allExpences) => set({allExpences: allExpences}),
            initCategories: (categories) => set({categories: categories}),
            initCategoryExpences: (categoryExpences) => set({categoryExpences : categoryExpences}),
            initSumByCategories: (sumByCategories) => set({sumByCategories: sumByCategories})
        })
);

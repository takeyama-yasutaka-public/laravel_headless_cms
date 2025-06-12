/*********************************
    状態管理
*********************************/

import { create } from 'zustand';

//Drawer
interface DrawerState {
    drawerDuration: number;
    drawerState: boolean;
    drawerWidthReset: boolean;
    drawerToggle: () => void;
    drawerClose: () => void;
    drawerWidthResetOn: () => void;
    drawerWidthResetOff: () => void;
}
export const useDrawerStore = create<DrawerState>()((set) => ({
    drawerDuration: 300,
    drawerState: false,
    drawerWidthReset: false,
    drawerToggle: () => set((state) => ({ drawerState: !state.drawerState })),
    drawerClose: () => set((state) => ({ drawerState: false })),
    drawerWidthResetOn: () => set((state) => ({ drawerWidthReset: true })),
    drawerWidthResetOff: () => set((state) => ({ drawerWidthReset: false })),
}));

//DrawerItem
interface DrawerItemState {
    drawerItemState: boolean;
    DrawerChildWidth: number;
    drawerItemOpen: () => void;
    drawerItemClose: () => void;
    setDrawerChildWidth: (num: number) => void;
}
export const useDrawerItemStore = create<DrawerItemState>()((set) => ({
    drawerItemState: false,
    DrawerChildWidth: 0,
    drawerItemOpen: () => set((state) => ({ drawerItemState: true })),
    drawerItemClose: () => set((state) => ({ drawerItemState: false })),
    setDrawerChildWidth: (num: number) =>
        set((state) => ({ DrawerChildWidth: num })),
}));

//DrawerChildItem
interface DrawerChildItemState {
    drawerChildItemState: boolean;
    DrawerGrandchildWidth: number;
    drawerChildItemOpen: () => void;
    drawerChildItemClose: () => void;
    setDrawerGrandchildWidth: (num: number) => void;
}
export const useDrawerChildItemStore = create<DrawerChildItemState>()(
    (set) => ({
        drawerChildItemState: false,
        DrawerGrandchildWidth: 0,
        drawerChildItemOpen: () =>
            set((state) => ({ drawerChildItemState: true })),
        drawerChildItemClose: () =>
            set((state) => ({ drawerChildItemState: false })),
        setDrawerGrandchildWidth: (num: number) =>
            set((state) => ({ DrawerGrandchildWidth: num })),
    }),
);

//HeaderReset
interface HeaderResetState {
    headerResetState: boolean;
    headerResetOn: () => void;
    headerResetOff: () => void;
}
export const useHeaderResetStore = create<HeaderResetState>()((set) => ({
    headerResetState: false,
    headerResetOn: () => set((state) => ({ headerResetState: true })),
    headerResetOff: () => set((state) => ({ headerResetState: false })),
}));

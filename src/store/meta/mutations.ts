import {saveMenuToggle} from "@/plugins/menu";

export default {
    setPageTitle: (state: any, title?: string) => state.pageTitle = title !== undefined ? title : null,

    menuRailToggle: (state: any, value: boolean) => {
        state.menu.rail = value

        saveMenuToggle()
    }
}

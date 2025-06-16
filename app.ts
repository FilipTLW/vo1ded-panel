import { App } from "astal/gtk3"
import style from "./style.scss"
import Bar from "./widget/Bar"
import {SettingsMenu} from "./widget/Settings";
import {WirePlumberMenu} from "./widget/WirePlumber";

App.start({
    css: style,
    main() {
        App.get_monitors().map(Bar);
        App.get_monitors().map(SettingsMenu);
        App.get_monitors().map(WirePlumberMenu);
    },
})

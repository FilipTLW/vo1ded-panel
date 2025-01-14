import Tray from "gi://AstalTray"
import {App, Gdk, Gtk} from "astal/gtk3";
import {bind} from "astal";
import Astal from "gi://Astal?version=3.0";

const tray = Tray.get_default();

export default function SystemTray() {
  return <box>
    {bind(tray, 'items').as(t => {
      return t.map(item => {
        if (item.icon_theme_path != null) {
          App.add_icons(item.icon_theme_path);
        }

        if (item.gicon === null && item.title === null) {
          return null;
        }
        return <button
          tooltip_markup={bind(item, 'tooltip_markup')}
          valign={Gtk.Align.CENTER}
          halign={Gtk.Align.CENTER}
          onClickRelease={(self, event) => {
            switch (event.button) {
              case Astal.MouseButton.PRIMARY:
                if (item.is_menu) {
                  item.activate(0, 0);
                }
                break;
              case Astal.MouseButton.SECONDARY:
                const menu = Gtk.Menu.new_from_model(item.menu_model);
                menu.insert_action_group('dbusmenu', item.actionGroup);
                menu.popup_at_widget(self, Gdk.Gravity.NORTH, Gdk.Gravity.SOUTH, null);
            }
          }}
        >
          <icon gicon={bind(item, 'gicon')}></icon>
        </button>
      }).filter(item => item !== null);
    })}
  </box>
}
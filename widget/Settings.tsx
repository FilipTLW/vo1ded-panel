import {App, Gdk, Gtk} from "astal/gtk3";
import Astal from "gi://Astal?version=3.0";

const {WindowAnchor} = Astal


export function SettingsMenu() {
  return <window
    visible={false}
    className='settings-menu'
    name='Settings'
    namespace='settings'
    layer={Astal.Layer.TOP}
    application={App}
    anchor={WindowAnchor.TOP | WindowAnchor.RIGHT }
    onKeyPressEvent={(_, key) => {
      if (key.get_keyval()[1] === Gdk.KEY_Escape) {
        App.toggle_window('Settings');
      }
    }}
    window_position={Gtk.WindowPosition.MOUSE}
  >
    <box>
      <box
        halign={Gtk.Align.START}
        valign={Gtk.Align.START}
        vexpand={false}
      >
        <button
          onClickRelease='systemctl poweroff'
        >
          Shutdown
        </button>
      </box>
      <box
        halign={Gtk.Align.END}
        valign={Gtk.Align.START}
        vexpand={false}
      >
        <button
          onClickRelease='systemctl reboot'
        >
          Reboot
        </button>
      </box>
    </box>
  </window>
}

export default function Settings() {
  return <box>
    <button onClickRelease={() => {
      App.toggle_window('Settings');
    }}>
      <label></label>
    </button>
  </box>
}
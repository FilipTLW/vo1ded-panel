import {App, Gdk} from "astal/gtk3";
import Astal from "gi://Astal?version=3.0";
import {Variable} from "astal";
import {exec} from "astal/process";
import {ConfirmationDialog} from "./ConfirmationDialog";

const {WindowAnchor} = Astal;

const visible = Variable(false);

export function SettingsMenu() {
  return <window
    visible={visible()}
    name='Settings'
    namespace='settings'
    className={'settings-window'}
    layer={Astal.Layer.TOP}
    exclusivity={Astal.Exclusivity.IGNORE}
    application={App}
    anchor={WindowAnchor.TOP | WindowAnchor.RIGHT | WindowAnchor.LEFT | WindowAnchor.BOTTOM }

    onKeyPressEvent={(_, key) => {
      if (key.get_keyval()[1] === Gdk.KEY_Escape) {
        App.toggle_window('Settings');
      }
    }}
  >
    <box
    >
      <eventbox
        hexpand={true}
        onClick={() => visible.set(false)}>
      </eventbox>
      <box vertical={true}>
        <eventbox
          height_request={64}
          onClick={() => visible.set(false)}>
        </eventbox>
        <box
          className={'settings-menu'}
          vertical={true}
        >
          <box
          >
            <button
              // onClickRelease='systemctl poweroff'
              onClickRelease={() => ConfirmationDialog('Are you sure?', 'Do you want to shut down now?', () => exec('systemctl poweroff'))}
              width_request={128}
            >
              Shutdown
            </button>
          </box>
          <box
            className='zero-margin zero-padding'
          >
            <button
              onClickRelease={() => ConfirmationDialog('Are you sure?', 'Do you want to reboot now?', () => exec('systemctl reboot'))}
              width_request={128}
            >
              Reboot
            </button>
          </box>
          <box
          >
            <button
              onClickRelease={() => ConfirmationDialog('Are you sure?', 'Do you want to log out now?', () => exec('hyprctl dispatch exit 1'))}
              width_request={128}
            >
              Logout
            </button>
          </box>
        </box>
        <eventbox
          vexpand={true}
          onClick={() => visible.set(false)}>
        </eventbox>
      </box>
      <eventbox
        width_request={10}
        onClick={() => visible.set(false)}>
      </eventbox>
    </box>
  </window>
}

export default function Settings() {
  return <box>
    <button
      width_request={42}
      onClickRelease={() => {
        visible.set(!visible.get());
      }}
    >
      <label></label>
    </button>
  </box>
}
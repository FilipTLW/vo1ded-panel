import {App, Gdk} from "astal/gtk3";
import Astal from "gi://Astal?version=3.0";
import {Variable} from "astal";
import Gtk from "gi://Gtk?version=3.0";

const {WindowAnchor} = Astal;

export function ConfirmationDialog(title: string, message: string, confirm?: () => void, cancel?: () => void) {
  const window = <window
    visible={true}
    name={"Confirmation"}
    namespace={"confirmation"}
    className={"confirmation-window"}
    layer={Astal.Layer.TOP}
    exclusivity={Astal.Exclusivity.IGNORE}
    application={App}
    anchor={WindowAnchor.TOP | WindowAnchor.RIGHT | WindowAnchor.LEFT | WindowAnchor.BOTTOM }
  >
    <box>
      <eventbox
        hexpand={true}
        onClick={() => window.destroy()}
      >
      </eventbox>
      <box
        vertical={true}
      >
        <eventbox
          vexpand={true}
          onClick={() => window.destroy()}
        >
        </eventbox>
        <box
          width_request={300}
          className={'confirmation-dialog-container'}
          vertical={true}
        >
          <centerbox
            className={'confirmation-dialog-title'}
          >
            <label
              label={title}
            ></label>
          </centerbox>
          <box
            className={'confirmation-dialog-message-container'}
            vertical={true}
          >
            <label
              label={message}
            ></label>
          </box>
          <box
            className={'confirmation-dialog-buttons-container'}
            hexpand={false}
          >
            <button
              onClickRelease={() => {
                window.destroy();
                confirm?.();
              }}
              width_request={130}
            >Ok</button>
            <box
              hexpand={true}
            ></box>
            <button
              onClickRelease={() => {
                window.destroy();
                cancel?.();
              }}
              width_request={130}
            >Cancel</button>
          </box>
        </box>
        <eventbox
          vexpand={true}
          onClick={() => window.destroy()}
        >
        </eventbox>
      </box>
      <eventbox
        hexpand={true}
        onClick={() => window.destroy()}
      >
      </eventbox>
    </box>
  </window>

  return window;
}
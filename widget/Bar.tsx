import {App, Astal, Gtk, Gdk, astalify} from "astal/gtk3"
import {Variable} from "astal"
import Launcher from "./Launcher";
import SystemTray from "./SystemTray";

const time = Variable("").poll(1000, 'date "+%Y-%m-%d %H:%M:%S"')

const Separator = astalify(Gtk.Separator)

function Start() {
    return <box
      halign={Gtk.Align.START}>
        <Launcher></Launcher>
    </box>
}

function Center() {
    return <box
        className="center-container"
        halign={Gtk.Align.CENTER}>
        <box>
            <label label={time()}></label>
        </box>
        <Separator orientation={Gtk.Orientation.VERTICAL} visible={true}/>
        <box>
            <SystemTray/>
        </box>
    </box>
}

export default function Bar(gdkmonitor: Gdk.Monitor) {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

    return <window
        className="Bar"
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={TOP | LEFT | RIGHT}
        application={App}>
        <centerbox>
            <Start></Start>
            <Center></Center>
        </centerbox>
    </window>
}
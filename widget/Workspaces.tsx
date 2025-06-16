import AstalHyprland from "gi://AstalHyprland?version=0.1";
import {bind} from "astal";
import {Gtk} from "astal/gtk3";

const hyprland = AstalHyprland.Hyprland.get_default()!

function getClassName(i: number, focused: AstalHyprland.Workspace) {
  let className = `workspace-btn workspace-${i}`;
  if (focused.id === i + 1) {
    className += ' workspace-focused';
  }
  if (hyprland.get_workspace(i + 1)?.get_clients().length > 0) {
    className += ' workspace-occupied';
  }
  return className;
}

export default function Workspaces() {
  return <box
    className='workspaces-container'
    valign={Gtk.Align.CENTER}
  >
    {bind(hyprland, 'clients').as(_ =>
      [...Array(20).keys()].map(i =>
        <button
          onClickRelease={`hyprctl dispatch workspace ${i + 1}`}
          className={bind(hyprland, 'focused_workspace').as(focused => getClassName(i, focused))}
          valign={Gtk.Align.CENTER}
          halign={Gtk.Align.CENTER}
          vexpand={false}
        />
      ))
    }
  </box>
}
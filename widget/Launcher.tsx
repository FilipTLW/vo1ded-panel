export default function Launcher() {
  return <box
    className="launcher-container">
    <button onClicked="rofi -show run">
      <label></label>
    </button>
  </box>
}
import {bind, Variable} from "astal";
import AstalWp from "gi://AstalWp?version=0.1"
import Astal from "gi://Astal?version=3.0";
import {App, Gdk, Gtk} from "astal/gtk3";
import {Separator} from "./Bar";

const {WindowAnchor} = Astal;

const wp = AstalWp.get_default() as AstalWp.Wp;
const visible = Variable(false);


export function WirePlumberMenu() {
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
      {bind(wp, 'audio').as(audioService => {
        return <>
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
            {bind(audioService, 'default_speaker').as(defaultSpeaker => <box vertical={true}>
              {bind(audioService, 'speakers').as(speakers => speakers
                .sort(speaker => speaker.id === defaultSpeaker.id ? -1 : 0)
                .map(speaker => {
                  return <box>
                    <label label={speaker.description} width_request={384}></label>
                    <icon icon={bind(speaker, "volumeIcon")} />
                    <slider
                      value={bind(speaker, 'volume')}
                      max={1.5}
                      width_request={256}
                      onValueChanged={(slider) => {
                        speaker.volume = slider.value;
                      }}></slider>
                    <label label={bind(speaker, 'volume').as(v => (v * 100).toFixed(0) + '%')} width_request={32}></label>
                  </box>
                }))}
              </box>
            )}
            <Separator orientation={Gtk.Orientation.HORIZONTAL} visible={true}/>
            {bind(audioService, 'microphones').as(microphones => microphones.map(microphone => {
              return <box>
                <label label={microphone.description} width_request={384}></label>
                <icon icon={bind(microphone, "volumeIcon")} />
                <slider
                  value={bind(microphone, 'volume')}
                  max={1.5}
                  width_request={256}
                  onValueChanged={(slider) => {
                    microphone.volume = slider.value;
                  }}></slider>
                <label label={bind(microphone, 'volume').as(v => (v * 100).toFixed(0) + '%')} width_request={32}></label>
              </box>
            }))}
            <Separator orientation={Gtk.Orientation.HORIZONTAL} visible={true}/>
            {bind(audioService, 'streams').as(streams => streams.map(stream => {
              return <box>
                <label label={bind(stream, 'description')} width_request={384}></label>
                <icon icon={bind(stream, "volumeIcon")} />
                <slider
                  value={bind(stream, 'volume')}
                  max={1.5}
                  width_request={256}
                  onValueChanged={(slider) => {
                    stream.set_volume(slider.value);
                  }}
                ></slider>
                <label label={bind(stream, 'volume').as(v => (v * 100).toFixed(0) + '%')} width_request={32}></label>
              </box>
            }))}
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
        </>
      })}
    </box>
  </window>
}

export default function WirePlumber() {
  const audioService = wp.audio;
  const defaultSpeaker = audioService.default_speaker;

  return <box>
    <button
      width_request={76}
      onClickRelease={() => {
        visible.set(!visible.get());
      }}
      onScroll={(_, ev) => {
        let vol_percentage = defaultSpeaker.volume * 100;
        if (ev.delta_y < 0) {
          vol_percentage += 2;
        } else if (ev.delta_y > 0) {
          vol_percentage -= 2;
        }
        defaultSpeaker.volume = Math.round(vol_percentage) / 100;
      }}
    >
      <box className='volume-button-box'>
        <icon icon={bind(defaultSpeaker, "volumeIcon")} />
        <label label={bind(defaultSpeaker, 'volume').as(v => (v * 100).toFixed(0) + '%')}></label>
      </box>
    </button>
  </box>
}

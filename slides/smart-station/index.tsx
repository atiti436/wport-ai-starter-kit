import type { Page, SlideMeta } from '@open-slide/core';
import type { ReactNode } from 'react';
import david from './assets/david.png';
import eric from './assets/eric.png';
import gugu from './assets/gugu.png';
import logoIcon from './assets/logo-icon.png';

const TALENT_HUB_EVENT_URL =
  'https://hypelink.app/@wport/events/wport-talent-hub-3?utm_source=university';
const SMART_STATION_VENUE_URL = 'https://maps.app.goo.gl/WKPHvWLCd4h9V2UTA';

export const meta: SlideMeta = {
  title: '聰電站 · 講座橫幅',
  createdAt: '2026-06-05T16:51:05.525Z',
};

const SHARED_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500;700;900&family=Space+Grotesk:wght@600;700&display=swap');
.cong-root {
  --teal: #7ec8c8;
  --teal-bright: #79e6da;
  --teal-soft: #a9dcdc;
  --teal-deep: #2a6b6e;
  --ink: #eef5f6;
  --ink-dim: rgba(226, 240, 241, 0.72);
  --display: "Space Grotesk", "Noto Sans TC", sans-serif;
  --tc: "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif;
}
.cong-root .banner {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  container-type: inline-size;
  container-name: bn;
  font-family: var(--tc);
  color: var(--ink);
  -webkit-font-smoothing: antialiased;
}
.cong-root .banner * { box-sizing: border-box; }
.cong-root .bn-logo { display: block; object-fit: contain; }
.cong-root .bn-a {
  background:
    radial-gradient(120% 90% at 88% 12%, rgba(126, 200, 200, 0.16) 0%, transparent 55%),
    linear-gradient(155deg, #0a1726 0%, #0c2236 52%, #081522 100%);
}
.cong-root .bn-a::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(126, 200, 200, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(126, 200, 200, 0.05) 1px, transparent 1px);
  background-size: 7cqw 7cqw;
  -webkit-mask-image: radial-gradient(120% 100% at 80% 30%, #000 0%, transparent 75%);
  mask-image: radial-gradient(120% 100% at 80% 30%, #000 0%, transparent 75%);
  pointer-events: none;
}
.cong-root .bn-a::after {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 0.28cqw;
  background: linear-gradient(90deg, var(--teal-bright), rgba(126, 200, 200, 0) 60%);
  pointer-events: none;
}
.cong-root .bn-a .a-grid { position: relative; z-index: 2; height: 100%; display: grid; grid-template-columns: 55fr 45fr; }
.cong-root .bn-a .a-left { display: flex; flex-direction: column; justify-content: center; gap: 2.4cqw; padding: 6cqw 3cqw 6cqw 6.5cqw; }
.cong-root .bn-a .a-logorow { display: flex; align-items: center; gap: 1.4cqw; }
.cong-root .bn-a .bn-logo { width: 6.4cqw; height: 6.4cqw; }
.cong-root .bn-a .a-wordmark { display: flex; flex-direction: column; line-height: 1; }
.cong-root .bn-a .a-wordmark b { font-size: 2cqw; font-weight: 900; letter-spacing: 0.14em; }
.cong-root .bn-a .a-wordmark span { font-family: var(--display); font-size: 1.02cqw; font-weight: 600; letter-spacing: 0.42em; color: var(--teal); margin-top: 0.45em; }
.cong-root .bn-a .a-chip { align-self: flex-start; display: inline-flex; align-items: center; gap: 0.7cqw; padding: 0.55cqw 1.4cqw; border: 1px solid rgba(126, 200, 200, 0.45); border-radius: 999px; font-size: 1.28cqw; font-weight: 700; letter-spacing: 0.08em; color: var(--teal-soft); background: rgba(126, 200, 200, 0.06); white-space: nowrap; }
.cong-root .bn-a .a-chip i { width: 0.7cqw; height: 0.7cqw; border-radius: 50%; background: var(--teal-bright); box-shadow: 0 0 0.8cqw var(--teal-bright); }
.cong-root .bn-a .a-title { margin: 0; display: flex; flex-direction: column; gap: 0.06em; }
.cong-root .bn-a .a-title span { font-size: 4.35cqw; font-weight: 900; line-height: 1.12; letter-spacing: 0.02em; }
.cong-root .bn-a .a-title em { font-style: normal; color: var(--teal); }
.cong-root .bn-a .a-meta { display: flex; flex-direction: column; gap: 0.9cqw; margin-top: 0.6cqw; }
.cong-root .bn-a .a-metarow { display: flex; align-items: center; gap: 1cqw; font-size: 1.3cqw; }
.cong-root .bn-a .a-metarow svg { width: 1.5cqw; height: 1.5cqw; fill: none; stroke: var(--teal); stroke-width: 1.8; flex: 0 0 auto; }
.cong-root .bn-a .a-metarow b { font-family: var(--display); font-weight: 600; letter-spacing: 0.02em; }
.cong-root .bn-a .a-metarow .dim { color: var(--ink-dim); font-weight: 500; }
.cong-root .bn-a .a-right { position: relative; display: flex; align-items: center; justify-content: center; padding: 4cqw 5cqw 4cqw 1cqw; }
.cong-root .bn-a .a-right::before { content: ""; position: absolute; left: 0; top: 18%; bottom: 18%; width: 1px; background: linear-gradient(transparent, rgba(126,200,200,0.4), transparent); }
.cong-root .bn-a .a-cast { display: flex; align-items: flex-end; gap: 2.2cqw; }
.cong-root .bn-a .a-card { --speaker-size: 16cqw; display: flex; flex-direction: column; align-items: center; gap: 0.9cqw; width: var(--speaker-size); flex: 0 0 auto; }
.cong-root .bn-a .a-card:nth-child(2) { margin-bottom: 2.4cqw; }
.cong-root .bn-a .a-ring { position: relative; flex: 0 0 auto; width: var(--speaker-size); aspect-ratio: 1; border-radius: 50%; padding: 0.32cqw; overflow: hidden; background: conic-gradient(from 210deg, var(--teal-bright), var(--teal-deep), var(--teal)); box-shadow: 0 0.8cqw 2cqw rgba(0,0,0,0.45), 0 0 3cqw rgba(126,200,200,0.16); }
.cong-root .bn-a .a-ring .bn-photo { display: block; width: 100%; aspect-ratio: 1; border-radius: 50%; object-fit: cover; }
.cong-root .bn-a .a-name { font-family: var(--display); font-size: 2.1cqw; font-weight: 700; letter-spacing: 0.02em; color: var(--ink); }
.cong-root .bn-a .a-role { font-size: 1.05cqw; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--teal); margin-top: -0.5cqw; }
.cong-root .bn-b { background: radial-gradient(90% 120% at 8% 100%, rgba(126, 200, 200, 0.14) 0%, transparent 50%), linear-gradient(180deg, #070e16 0%, #060c14 100%); padding: 5cqw 5.5cqw; }
.cong-root .bn-b .b-num { position: absolute; right: 3cqw; top: -3cqw; font-family: var(--display); font-weight: 700; font-size: 34cqw; line-height: 1; color: rgba(126, 200, 200, 0.05); letter-spacing: -0.04em; pointer-events: none; user-select: none; }
.cong-root .bn-b .b-inner { position: relative; z-index: 2; height: 100%; display: grid; grid-template-columns: 56fr 44fr; gap: 4cqw; }
.cong-root .bn-b .b-col-l { display: flex; flex-direction: column; }
.cong-root .bn-b .b-head { display: flex; align-items: center; gap: 1.1cqw; }
.cong-root .bn-b .b-head .bn-logo { width: 4.4cqw; height: 4.4cqw; }
.cong-root .bn-b .b-head b { font-size: 1.7cqw; font-weight: 900; letter-spacing: 0.16em; }
.cong-root .bn-b .b-head span { margin-left: auto; font-family: var(--display); font-size: 1cqw; font-weight: 600; letter-spacing: 0.38em; color: var(--teal); }
.cong-root .bn-b .b-kicker { margin-top: 3.2cqw; font-family: var(--display); font-size: 1.15cqw; font-weight: 600; letter-spacing: 0.34em; color: var(--teal); text-transform: uppercase; }
.cong-root .bn-b .b-rule { width: 6cqw; height: 0.22cqw; background: var(--teal); margin-top: 1.2cqw; }
.cong-root .bn-b .b-title { margin: 1.4cqw 0 0; display: flex; flex-direction: column; gap: 0.04em; }
.cong-root .bn-b .b-title span { font-size: 4.6cqw; font-weight: 900; line-height: 1.1; letter-spacing: 0.01em; }
.cong-root .bn-b .b-title em { font-style: normal; color: var(--teal); }
.cong-root .bn-b .b-foot { margin-top: auto; display: flex; align-items: center; gap: 1.6cqw; }
.cong-root .bn-b .b-foot .pinline { display: flex; align-items: center; gap: 0.7cqw; font-family: var(--display); font-size: 1.35cqw; font-weight: 600; }
.cong-root .bn-b .b-foot svg { width: 1.5cqw; height: 1.5cqw; fill: none; stroke: var(--teal); stroke-width: 1.8; }
.cong-root .bn-b .b-foot .div { width: 1px; height: 1.6cqw; background: rgba(126,200,200,0.4); }
.cong-root .bn-b .b-foot .place { font-size: 1.1cqw; color: var(--ink-dim); font-weight: 500; max-width: 22cqw; }
.cong-root .bn-b .b-col-r { display: flex; align-items: center; justify-content: center; gap: 1.4cqw; }
.cong-root .bn-b .b-port { position: relative; width: 13.5cqw; }
.cong-root .bn-b .b-port:first-child { margin-top: 3cqw; }
.cong-root .bn-b .b-portframe { position: relative; width: 100%; aspect-ratio: 3/4; border-radius: 1.6cqw; overflow: hidden; border: 1px solid rgba(126, 200, 200, 0.35); box-shadow: 0 1.4cqw 3cqw rgba(0,0,0,0.5); }
.cong-root .bn-b .b-portframe .bn-photo { width: 100%; height: 100%; display: block; }
.cong-root .bn-b .b-plate { position: absolute; left: 0; right: 0; bottom: 0; padding: 2.6cqw 1.2cqw 1.1cqw; background: linear-gradient(transparent, rgba(6, 12, 20, 0.92) 55%); }
.cong-root .bn-b .b-plate b { display: block; font-family: var(--display); font-size: 1.85cqw; font-weight: 700; }
.cong-root .bn-b .b-plate span { display: block; font-size: 0.92cqw; font-weight: 600; letter-spacing: 0.12em; color: var(--teal); text-transform: uppercase; margin-top: 0.2cqw; }
.cong-root .bn-c { background: radial-gradient(85% 70% at 50% 38%, rgba(126, 200, 200, 0.24) 0%, transparent 58%), radial-gradient(100% 80% at 50% 0%, rgba(20, 60, 70, 0.55) 0%, transparent 50%), linear-gradient(180deg, #081320 0%, #050b13 100%); }
.cong-root .bn-c::after { content: ""; position: absolute; inset: 0; pointer-events: none; background: radial-gradient(95% 90% at 50% 48%, transparent 58%, rgba(0, 0, 0, 0.42) 100%); }
.cong-root .bn-c .c-wrap { position: relative; z-index: 2; height: 100%; display: grid; grid-template-rows: auto minmax(0, 1fr) auto; align-content: stretch; padding: 3.8cqw 4.2cqw 3.2cqw; gap: 1.4cqw; }
.cong-root .bn-c .c-top { display: flex; flex-direction: column; align-items: center; gap: 1.6cqw; text-align: center; width: 100%; }
.cong-root .bn-c .c-brandrow { display: flex; align-items: center; gap: 1.4cqw; }
.cong-root .bn-c .c-brandrow .bn-logo { width: 6.5cqw; height: 6.5cqw; }
.cong-root .bn-c .c-brandrow b { font-size: 2.65cqw; font-weight: 900; letter-spacing: 0.18em; }
.cong-root .bn-c .c-brandrow .v { font-family: var(--display); font-size: 1.45cqw; font-weight: 600; letter-spacing: 0.28em; color: var(--teal); border-left: 1px solid rgba(126, 200, 200, 0.45); padding-left: 1.1cqw; }
.cong-root .bn-c .c-title { margin: 0; display: flex; flex-direction: column; gap: 0.2em; width: 100%; max-width: 92cqw; }
.cong-root .bn-c .c-title-line { display: block; font-size: 5.6cqw; font-weight: 900; line-height: 1.1; letter-spacing: 0.02em; }
.cong-root .bn-c .c-title em { font-style: normal; color: var(--teal); }
.cong-root .bn-c .c-cast { display: flex; align-items: center; justify-content: center; gap: 4.5cqw; margin: 0; min-height: 0; }
.cong-root .bn-c .c-card { --speaker-size: 26cqw; display: flex; flex-direction: column; align-items: center; gap: 1.2cqw; width: var(--speaker-size); flex: 0 0 auto; }
.cong-root .bn-c .c-halo { position: relative; flex: 0 0 auto; width: var(--speaker-size); aspect-ratio: 1; }
.cong-root .bn-c .c-halo::before { content: ""; position: absolute; inset: -12%; border-radius: 50%; background: radial-gradient(circle, rgba(126, 200, 200, 0.42) 0%, transparent 68%); filter: blur(1.2cqw); }
.cong-root .bn-c .c-disc { position: absolute; inset: 0; border-radius: 50%; padding: 0.35cqw; overflow: hidden; background: linear-gradient(160deg, var(--teal-bright), var(--teal-deep) 70%); box-shadow: 0 1.4cqw 3cqw rgba(0, 0, 0, 0.5); }
.cong-root .bn-c .c-disc .bn-photo { display: block; width: 100%; aspect-ratio: 1; border-radius: 50%; object-fit: cover; }
.cong-root .bn-c .c-name { font-family: var(--display); font-size: 3.7cqw; font-weight: 700; letter-spacing: 0.02em; }
.cong-root .bn-c .c-role { font-size: 1.55cqw; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--teal); margin-top: -0.4cqw; }
.cong-root .bn-c .c-bar { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 1.2cqw 1.8cqw; width: 100%; max-width: 96cqw; margin: 0 auto; padding: 0.9cqw 2.4cqw; border-radius: 999px; background: rgba(126, 200, 200, 0.1); border: 1px solid rgba(126, 200, 200, 0.32); line-height: 1.35; }
.cong-root .bn-c .c-bar-schedule { display: inline-flex; align-items: center; gap: 0.75cqw; font-family: var(--display); font-size: 1.95cqw; font-weight: 600; }
.cong-root .bn-c .c-bar-schedule svg { width: 2cqw; height: 2cqw; flex: 0 0 auto; fill: none; stroke: var(--teal); stroke-width: 1.8; }
.cong-root .bn-c .c-bar-place { display: inline-flex; align-items: center; gap: 0.5cqw; }
.cong-root .bn-c .c-bar-place svg { width: 1.45cqw; height: 1.45cqw; flex: 0 0 auto; fill: none; stroke: var(--teal); stroke-width: 1.8; }
.cong-root .bn-c .c-bar .div { width: 1px; height: 1.5cqw; background: rgba(126, 200, 200, 0.45); flex-shrink: 0; }
.cong-root .bn-c .c-bar .place { font-family: var(--tc); font-size: 1.35cqw; font-weight: 500; color: var(--ink-dim); }
.cong-root .bn-photo { background: #0b1a28; object-fit: cover; object-position: center 22%; }
.cong-root .bn-photo--eric { object-position: 52% 32%; }
`;

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

const PinIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

function CongFrame({
  children,
  width = '100%',
  height = '100%',
}: {
  children: ReactNode;
  width?: number | string;
  height?: number | string;
}) {
  return (
    <div
      className="cong-root"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#050a12',
      }}
    >
      <style>{SHARED_CSS}</style>
      <div style={{ width, height, overflow: 'hidden' }}>{children}</div>
    </div>
  );
}

const BannerA: Page = () => (
  <CongFrame>
    <div className="banner bn-a">
      <div className="a-grid">
        <div className="a-left">
          <div className="a-logorow">
            <img className="bn-logo" src={logoIcon} alt="聰電站" />
            <div className="a-wordmark">
              <b>聰電站</b>
              <span>VOL.4</span>
            </div>
          </div>
          <div className="a-chip">
            <i />
            聰電站 #4-台北場
          </div>
          <h1 className="a-title">
            <span>軟體人陪你一起</span>
            <span>
              Vibe <em>Coding</em>
            </span>
          </h1>
          <div className="a-meta">
            <div className="a-metarow">
              <ClockIcon />
              <b>2026 / 06 / 07 (日)</b>
              <span className="dim">13:00 – 19:00</span>
            </div>
            <div className="a-metarow">
              <PinIcon />
              <span className="dim">
                熊熊幹大事辦公室 · 臺北市中正區梅花里忠孝東路一段49巷17 號3樓
              </span>
            </div>
          </div>
        </div>
        <div className="a-right">
          <div className="a-cast">
            <div className="a-card">
              <div className="a-ring">
                <img className="bn-photo bn-photo--eric" src={eric} alt="Eric" />
              </div>
              <div className="a-name">Eric</div>
              <div className="a-role">青蛙首領</div>
            </div>
            <div className="a-card">
              <div className="a-ring">
                <img className="bn-photo" src={gugu} alt="古古" />
              </div>
              <div className="a-name">古古</div>
              <div className="a-role">熊熊首領</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </CongFrame>
);

const BannerB: Page = () => (
  <CongFrame>
    <div className="banner bn-b">
      <div className="b-num">03</div>
      <div className="b-inner">
        <div className="b-col-l">
          <div className="b-head">
            <img className="bn-logo" src={logoIcon} alt="聰電站" />
            <b>聰電站</b>
            <span>VOL.3</span>
          </div>
          <div className="b-kicker">AI 實作工作坊 · WORKSHOP</div>
          <div className="b-rule" />
          <h1 className="b-title">
            <span>沒有資科背景的人</span>
            <span>也能實作的</span>
            <span>
              <em>AI 課程</em>
            </span>
          </h1>
          <div className="b-foot">
            <div className="pinline">
              <ClockIcon />
              2026 / 06 / 26 (五)　19:00 – 22:00
            </div>
            <div className="div" />
            <div className="place">想享一隅共享空間 · 桃園蘆竹</div>
          </div>
        </div>
        <div className="b-col-r">
          <div className="b-port">
            <div className="b-portframe">
              <img className="bn-photo bn-photo--eric" src={eric} alt="Eric" />
              <div className="b-plate">
                <b>Eric</b>
                <span>WPORT PM</span>
              </div>
            </div>
          </div>
          <div className="b-port">
            <div className="b-portframe">
              <img className="bn-photo" src={david} alt="David" />
              <div className="b-plate">
                <b>David</b>
                <span>後端工程師</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </CongFrame>
);

const BannerC: Page = () => (
  <CongFrame width={1440} height={1080}>
    <div className="banner bn-c">
      <div className="c-wrap">
        <div className="c-top">
          <div className="c-brandrow">
            <img className="bn-logo" src={logoIcon} alt="聰電站" />
            <b>聰電站</b>
            <span className="v">VOL.3</span>
          </div>
          <h1 className="c-title">
            <a
              href={TALENT_HUB_EVENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="aj-interactive-link"
              style={{ color: 'inherit', textDecoration: 'none', display: 'inline-block' }}
            >
              <span className="c-title-line">沒有資科背景的人</span>
              <span className="c-title-line">
                也能實作的 <em>AI 課程</em>
              </span>
            </a>
          </h1>
        </div>
        <div className="c-cast">
          <div className="c-card">
            <div className="c-halo">
              <div className="c-disc">
                <img className="bn-photo bn-photo--eric" src={eric} alt="Eric" />
              </div>
            </div>
            <div className="c-name">Eric</div>
            <div className="c-role">WPORT PM</div>
          </div>
          <div className="c-card">
            <div className="c-halo">
              <div className="c-disc">
                <img className="bn-photo" src={david} alt="David" />
              </div>
            </div>
            <div className="c-name">David</div>
            <div className="c-role">後端工程師</div>
          </div>
        </div>
        <div className="c-bar">
          <span className="c-bar-schedule">
            <ClockIcon />
            <span>2026 / 06 / 26 (五)　19:00 – 22:00</span>
          </span>
          <span className="div" />
          <span className="c-bar-place">
            <PinIcon />
            <a
              href={SMART_STATION_VENUE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="aj-interactive-link place"
              style={{ color: 'inherit', textDecoration: 'none', display: 'inline-block' }}
            >
              想享一隅共享空間 · 桃園蘆竹
            </a>
          </span>
        </div>
      </div>
    </div>
  </CongFrame>
);

export { BannerC as SmartStationVol3 };

export default [BannerA, BannerB, BannerC] satisfies Page[];

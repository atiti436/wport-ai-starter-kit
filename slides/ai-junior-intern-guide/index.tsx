import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { useEffect, useRef, useState } from 'react';
import { SmartStationVol3 } from '../smart-station/index';

export const design: DesignSystem = {
  palette: { bg: '#FFFFFF', text: '#5D5D5D', accent: '#56C7BB' },
  fonts: {
    display: '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif',
    body: '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif',
  },
  typeScale: { hero: 132, body: 27 },
  radius: 8,
};

const c = {
  primary: '#56C7BB',
  primaryHover: '#4EBCB1',
  primaryLight: '#EAF8F7',
  primaryMuted: '#A8E4DF',
  ink: '#2E2E2E',
  body: '#5D5D5D',
  muted: '#9A9A9A',
  border: '#D7D7D7',
  tint: '#F8F7F7',
  white: '#FFFFFF',
};

const mono = '"JetBrains Mono", "Fira Code", monospace';
const PAD = { top: 104, right: 132, bottom: 96, left: 132 };

const AI_JUNIOR_STARTER_KIT_URL = 'https://github.com/ericlu-sys/ai-junior-starter-kit';
const AI_JUNIOR_STARTER_KIT_LABEL = 'ericlu-sys/ai-junior-starter-kit';
const WPORT_AGENTS_REPO_URL = 'https://github.com/hotfire-digital/wport-agents';
const WPORT_AGENTS_REPO_LABEL = 'hotfire-digital/wport-agents';
const OBSIDIAN_URL = 'https://obsidian.md/';
const GIT_INIT = 'git init';
const GIT_REMOTE = 'git remote add origin <your-private-repo>';
const GIT_PUSH = 'git push';

if (typeof document !== 'undefined') {
  const fontId = 'ai-junior-intern-guide-fonts';
  if (!document.getElementById(fontId)) {
    const link = document.createElement('link');
    link.id = fontId;
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Noto+Sans+TC:wght@400;500;700;900&display=swap';
    document.head.appendChild(link);
  }
  const styleId = 'ai-junior-intern-guide-deck-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      input[type="range"].aj-sl {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        height: 6px;
        border-radius: 999px;
        background: ${c.border};
        outline: none;
        cursor: pointer;
      }
      input[type="range"].aj-sl::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 34px;
        height: 34px;
        border-radius: 999px;
        background: ${c.primary};
        border: 4px solid #fff;
        box-shadow: 0 0 0 1px ${c.primary};
        cursor: pointer;
      }
      input[type="range"].aj-sl::-moz-range-thumb {
        width: 34px;
        height: 34px;
        border-radius: 999px;
        background: ${c.primary};
        border: 4px solid #fff;
        cursor: pointer;
      }
      @keyframes ajPop {
        0% { transform: scale(1); }
        45% { transform: scale(1.09); }
        100% { transform: scale(1); }
      }
      .aj-pop { animation: ajPop 0.32s cubic-bezier(0.34, 1.56, 0.64, 1); }
      @keyframes ajLinkWiggle {
        0%, 100% { transform: rotate(0deg) translateY(0); }
        20% { transform: rotate(-2.2deg) translateY(-1px); }
        40% { transform: rotate(2deg) translateY(0); }
        60% { transform: rotate(-1.6deg) translateY(-1px); }
        80% { transform: rotate(1.4deg) translateY(0); }
      }
      .aj-interactive-link,
      .aj-link-motion-scope a[href] {
        animation: ajLinkWiggle 2.6s ease-in-out infinite;
        transform-origin: center center;
        cursor: pointer;
      }
      .aj-interactive-link {
        display: inline-block;
      }
      .aj-link-motion-scope a[href] {
        display: inline-block;
      }
      .aj-interactive-link:hover,
      .aj-link-motion-scope a[href]:hover {
        animation-play-state: paused;
      }
      @keyframes ajCursorBlink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
      @keyframes ajMsgIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes ajDotPulse {
        0%, 80%, 100% { opacity: 0.25; transform: scale(0.85); }
        40% { opacity: 1; transform: scale(1); }
      }
      .aj-chat-cursor { animation: ajCursorBlink 0.75s step-end infinite; }
      .aj-chat-msg { animation: ajMsgIn 0.28s ease-out both; }
      .aj-chat-dot:nth-child(1) { animation: ajDotPulse 1.2s ease-in-out infinite; }
      .aj-chat-dot:nth-child(2) { animation: ajDotPulse 1.2s ease-in-out 0.15s infinite; }
      .aj-chat-dot:nth-child(3) { animation: ajDotPulse 1.2s ease-in-out 0.3s infinite; }
    `;
    document.head.appendChild(style);
  }
}

type ShellVariant = 'default' | 'tint' | 'dark';

const shellBg = (variant: ShellVariant) => {
  if (variant === 'dark') return c.ink;
  if (variant === 'tint') return c.tint;
  return c.white;
};

const SlideShell = ({
  variant = 'default',
  children,
}: {
  variant?: ShellVariant;
  children: React.ReactNode;
}) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      padding: `${PAD.top}px ${PAD.right}px ${PAD.bottom}px ${PAD.left}px`,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      background: shellBg(variant),
      color: variant === 'dark' ? '#C9C9C9' : c.body,
      fontFamily: 'var(--osd-font-body)',
    }}
  >
    {children}
  </div>
);

const TopBar = ({
  num,
  eyebrow,
  dark = false,
}: {
  num: string;
  eyebrow: string;
  dark?: boolean;
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      marginBottom: 56,
      flexShrink: 0,
    }}
  >
    <span
      style={{
        fontFamily: mono,
        fontSize: 24,
        fontWeight: 700,
        color: dark ? c.primaryMuted : c.primary,
        letterSpacing: '0.04em',
      }}
    >
      {num}
    </span>
    <span
      style={{
        fontFamily: mono,
        fontSize: 19,
        fontWeight: 500,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: dark ? '#8a8a8a' : c.muted,
        whiteSpace: 'nowrap',
      }}
    >
      {eyebrow}
    </span>
    <span
      style={{
        flex: 1,
        height: 1,
        background: dark ? '#4a4a4a' : c.border,
      }}
    />
    <span
      style={{
        fontFamily: mono,
        fontSize: 18,
        fontWeight: 500,
        letterSpacing: '0.08em',
        color: dark ? '#8a8a8a' : c.muted,
      }}
    >
      <b style={{ color: dark ? c.primaryMuted : c.primary, fontWeight: 700 }}>w</b>port
    </span>
  </div>
);

const Title = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <h1
    style={{
      fontSize: 66,
      fontWeight: 700,
      lineHeight: 1.18,
      color: dark ? '#fff' : c.ink,
      letterSpacing: '-0.01em',
      margin: 0,
      flexShrink: 0,
    }}
  >
    {children}
  </h1>
);

const Accent = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: c.primary }}>{children}</span>
);

const Subhead = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      fontSize: 22,
      fontFamily: mono,
      fontWeight: 700,
      letterSpacing: '0.08em',
      color: c.primary,
      marginBottom: 28,
      display: 'flex',
      alignItems: 'center',
      gap: 14,
    }}
  >
    <span style={{ width: 26, height: 3, background: c.primary, display: 'inline-block' }} />
    {children}
  </div>
);

const Body = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <p style={{ fontSize: 27, lineHeight: 1.7, color: c.body, margin: 0, ...style }}>{children}</p>
);

const Ink = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: c.ink, fontWeight: 700 }}>{children}</span>
);

const InlineCode = ({ children }: { children: React.ReactNode }) => (
  <code
    style={{
      fontFamily: mono,
      background: c.primaryLight,
      color: c.primaryHover,
      padding: '3px 12px',
      borderRadius: 4,
      fontSize: '0.86em',
    }}
  >
    {children}
  </code>
);

const INTERACTIVE_LINK_CLASS = 'aj-interactive-link';

const LinkMotionScope = ({ children }: { children: React.ReactNode }) => (
  <div
    className="aj-link-motion-scope"
    style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {children}
  </div>
);

const ExternalLink = ({
  href,
  children,
  style,
  mono: useMono = false,
}: {
  href: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  mono?: boolean;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={INTERACTIVE_LINK_CLASS}
    style={{
      color: c.primaryHover,
      textDecoration: 'none',
      borderBottom: `2px solid ${c.primaryMuted}`,
      ...(useMono ? { fontFamily: mono } : {}),
      ...style,
    }}
  >
    {children}
  </a>
);

const ObsidianLink = ({
  children = 'Obsidian',
  dark = false,
  mono = false,
  style,
}: {
  children?: React.ReactNode;
  dark?: boolean;
  mono?: boolean;
  style?: React.CSSProperties;
}) => (
  <ExternalLink
    href={OBSIDIAN_URL}
    mono={mono}
    style={{
      color: dark ? c.primaryMuted : c.primaryHover,
      fontWeight: 700,
      ...style,
    }}
  >
    {children}
  </ExternalLink>
);

const RepoCallout = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <ExternalLink
    href={href}
    mono
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 14,
      fontSize: 26,
      background: c.primaryLight,
      border: `1px solid ${c.primaryMuted}`,
      borderRadius: 8,
      padding: '20px 30px',
      borderBottom: `1px solid ${c.primaryMuted}`,
    }}
  >
    {children}
  </ExternalLink>
);

const ToolkitCard = ({
  num,
  title,
  href,
  repo,
  desc,
  badge,
}: {
  num: string;
  title: string;
  href: string;
  repo: string;
  desc: React.ReactNode;
  badge?: string;
}) => (
  <div
    style={{
      border: `1px solid ${c.border}`,
      borderLeft: `4px solid ${c.primary}`,
      borderRadius: 8,
      padding: '22px 26px',
      background: c.white,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
      <span
        style={{
          fontFamily: mono,
          fontSize: 20,
          fontWeight: 700,
          color: c.primary,
        }}
      >
        {num}
      </span>
      <span style={{ fontSize: 28, fontWeight: 700, color: c.ink }}>{title}</span>
      {badge ? (
        <span
          style={{
            fontFamily: mono,
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: c.primaryHover,
            background: c.primaryLight,
            border: `1px solid ${c.primaryMuted}`,
            borderRadius: 999,
            padding: '4px 12px',
          }}
        >
          {badge}
        </span>
      ) : null}
    </div>
    <ExternalLink href={href} mono style={{ fontSize: 22, alignSelf: 'flex-start' }}>
      {repo}
    </ExternalLink>
    <div style={{ fontSize: 22, lineHeight: 1.55, color: c.body }}>{desc}</div>
  </div>
);

const DarkInlineCode = ({ children }: { children: React.ReactNode }) => (
  <code
    style={{
      fontFamily: mono,
      background: 'rgba(86,199,187,0.16)',
      color: c.primaryMuted,
      padding: '3px 12px',
      borderRadius: 4,
      fontSize: '0.86em',
    }}
  >
    {children}
  </code>
);

const Def = ({ term, desc }: { term: string; desc: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <div style={{ fontSize: 30, fontWeight: 700, color: c.ink }}>{term}</div>
    <div style={{ fontSize: 25, lineHeight: 1.62, color: c.body }}>{desc}</div>
  </div>
);

const BulletList = ({ items }: { items: React.ReactNode[] }) => (
  <ul
    style={{
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 22,
    }}
  >
    {items.map((item, i) => (
      <li
        key={String(i)}
        style={{
          position: 'relative',
          paddingLeft: 40,
          fontSize: 27,
          lineHeight: 1.6,
          color: c.body,
        }}
      >
        <span
          style={{
            position: 'absolute',
            left: 0,
            top: 18,
            width: 18,
            height: 3,
            background: c.primary,
          }}
        />
        {item}
      </li>
    ))}
  </ul>
);

const StepItem = ({ n, title, desc }: { n: number; title: string; desc: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 36, alignItems: 'flex-start' }}>
    <div
      style={{
        flexShrink: 0,
        fontFamily: mono,
        fontSize: 28,
        fontWeight: 700,
        color: c.primary,
        width: 88,
        height: 88,
        border: `2px solid ${c.primary}`,
        borderRadius: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {n}
    </div>
    <div style={{ paddingTop: 6 }}>
      <div style={{ fontSize: 31, fontWeight: 700, color: c.ink, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 25, lineHeight: 1.6, color: c.body }}>{desc}</div>
    </div>
  </div>
);

const CodeBlock = ({
  children,
  tint = false,
  dark = false,
}: {
  children: React.ReactNode;
  tint?: boolean;
  dark?: boolean;
}) => (
  <div
    style={{
      fontFamily: mono,
      background: dark ? c.tint : tint ? c.white : c.tint,
      border: `1px solid ${c.border}`,
      borderLeft: `4px solid ${c.primary}`,
      borderRadius: 6,
      padding: '28px 36px',
      fontSize: 26,
      lineHeight: 1.7,
      color: c.ink,
    }}
  >
    {children}
  </div>
);

const CopyIcon = () => (
  <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect x="7" y="7" width="12" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copied ? '已複製' : '複製指令'}
      style={{
        flexShrink: 0,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        fontFamily: mono,
        fontSize: 17,
        fontWeight: 600,
        letterSpacing: '0.04em',
        color: copied ? c.primaryHover : c.muted,
        background: copied ? c.white : 'transparent',
        border: `1px solid ${copied ? c.primaryMuted : c.border}`,
        borderRadius: 6,
        padding: '8px 14px',
        cursor: 'pointer',
        transition: 'color 0.15s, border-color 0.15s, background 0.15s',
      }}
    >
      {copied ? (
        <>
          <span style={{ color: c.primary, fontSize: 15 }}>✓</span>
          已複製
        </>
      ) : (
        <>
          <CopyIcon />
          複製
        </>
      )}
    </button>
  );
};

const CopyableCodeLine = ({
  command,
  children,
}: {
  command: string;
  children: React.ReactNode;
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 20,
    }}
  >
    <span>{children}</span>
    <CopyButton text={command} />
  </div>
);

const Quote = ({ children, small }: { children: React.ReactNode; small?: string }) => (
  <div
    style={{
      borderLeft: `5px solid ${c.primary}`,
      paddingLeft: 44,
      fontSize: 44,
      lineHeight: 1.5,
      fontWeight: 700,
      color: c.ink,
    }}
  >
    {children}
    {small ? (
      <span
        style={{
          display: 'block',
          fontSize: 24,
          fontWeight: 500,
          color: c.muted,
          marginTop: 28,
          fontFamily: mono,
          letterSpacing: '0.04em',
        }}
      >
        {small}
      </span>
    ) : null}
  </div>
);

const ToolCol = ({
  label,
  name,
  href,
  sections,
}: {
  label?: string;
  name: string;
  href?: string;
  sections: { heading: string; body: string }[];
}) => (
  <div
    style={{
      border: `1px solid ${c.border}`,
      borderTop: `4px solid ${c.primary}`,
      borderRadius: 8,
      padding: '44px 40px',
      display: 'flex',
      flexDirection: 'column',
      gap: 26,
      background: c.white,
    }}
  >
    {label ? (
      <div
        style={{
          fontFamily: mono,
          fontSize: 18,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: c.muted,
          marginBottom: 4,
        }}
      >
        {label}
      </div>
    ) : null}
    {href ? (
      <ExternalLink
        href={href}
        mono
        style={{
          fontSize: 36,
          fontWeight: 700,
          color: c.ink,
        }}
      >
        {name}
      </ExternalLink>
    ) : (
      <div style={{ fontSize: 36, fontWeight: 700, color: c.ink, fontFamily: mono }}>{name}</div>
    )}
    {sections.map((s) => (
      <div key={s.heading || s.body} style={{ fontSize: 24, lineHeight: 1.55, color: c.body }}>
        {s.heading ? (
          <b
            style={{
              color: c.primaryHover,
              display: 'block',
              marginBottom: 6,
              fontSize: 19,
              fontFamily: mono,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {s.heading}
          </b>
        ) : null}
        {s.body}
      </div>
    ))}
  </div>
);

const CmpRow = ({ name, tag, desc }: { name: string; tag: string; desc: React.ReactNode }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '360px 200px 1fr',
      gap: 48,
      alignItems: 'center',
      padding: '38px 0',
      borderBottom: `1px solid ${c.border}`,
    }}
  >
    <div style={{ fontSize: 34, fontWeight: 700, color: c.ink, fontFamily: mono }}>{name}</div>
    <div
      style={{
        fontSize: 22,
        fontWeight: 700,
        color: c.primaryHover,
        background: c.primaryLight,
        borderRadius: 999,
        padding: '8px 18px',
        textAlign: 'center',
        letterSpacing: '0.02em',
      }}
    >
      {tag}
    </div>
    <div style={{ fontSize: 25, lineHeight: 1.55, color: c.body }}>{desc}</div>
  </div>
);

const Cover: Page = () => (
  <SlideShell variant="dark">
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
      <div
        style={{
          fontFamily: mono,
          fontSize: 24,
          letterSpacing: '0.26em',
          textTransform: 'uppercase',
          color: c.primary,
          marginBottom: 40,
        }}
      >
        3-Hour Hands-on Workshop · Industry-Ready Skills
      </div>
      <h1
        style={{
          fontSize: 132,
          fontWeight: 700,
          lineHeight: 1.04,
          color: '#fff',
          letterSpacing: '-0.02em',
          margin: '0 0 40px',
        }}
      >
        AI 實習生
        <br />
        速成指南
      </h1>
      <p
        style={{
          fontSize: 34,
          lineHeight: 1.55,
          color: '#C9C9C9',
          maxWidth: 1280,
          margin: '0 0 64px',
        }}
      >
        企業主親授：如何利用 <b style={{ color: c.primaryMuted, fontWeight: 700 }}>AI</b>、
        <ObsidianLink dark /> 與{' '}
        <b style={{ color: c.primaryMuted, fontWeight: 700 }}>CLI</b>
        <br />
        打造你的「個人核心競爭力」。
      </p>
      <div
        style={{
          display: 'flex',
          gap: 56,
          alignItems: 'center',
          paddingTop: 44,
          borderTop: '1px solid #4a4a4a',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: mono,
              fontSize: 20,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#7a7a7a',
              marginBottom: 10,
            }}
          >
            講師 / Instructor
          </div>
          <div style={{ fontSize: 26, color: '#e8e8e8', fontWeight: 500 }}>Eric Lu</div>
        </div>
        <div>
          <div
            style={{
              fontFamily: mono,
              fontSize: 20,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#7a7a7a',
              marginBottom: 10,
            }}
          >
            對象 / Audience
          </div>
          <div style={{ fontSize: 26, color: '#e8e8e8', fontWeight: 500 }}>
            開南大學 · 實戰培訓教材
          </div>
        </div>
        <div>
          <div
            style={{
              fontFamily: mono,
              fontSize: 20,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#7a7a7a',
              marginBottom: 10,
            }}
          >
            出品 / By
          </div>
          <div style={{ fontSize: 26, color: '#e8e8e8', fontWeight: 500 }}>wport</div>
        </div>
      </div>
    </div>
  </SlideShell>
);

const WhyHere: Page = () => (
  <SlideShell>
    <TopBar num="02" eyebrow="引言與痛點" />
    <Title>
      為什麼你今天<Accent>在這裡</Accent>？
    </Title>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 72,
        marginTop: 64,
        flex: 1,
      }}
    >
      <div>
        <Subhead>企業對實習生的真實期待</Subhead>
        <Body style={{ marginBottom: 32 }}>
          當教授問我：「招募實習生需要什麼能力？」時——<Ink>這堂課，就是你的面試答案卷。</Ink>
        </Body>
        <Body>
          企業不需要只會「手動複製貼上」的臨時工。我們需要具備
          <span style={{ color: c.primary, fontWeight: 700 }}>工程師思維</span>的 AI 協作即戰力。
        </Body>
      </div>
      <div>
        <Subhead>今日解藥</Subhead>
        <Body style={{ marginBottom: 28 }}>
          現場帶走兩套<Ink>開箱即用的工具包</Ink>——這不只是一個 Repo，這是你進入職場的加速器。
        </Body>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <ToolkitCard
            num="01"
            title="AI 新手包"
            href={AI_JUNIOR_STARTER_KIT_URL}
            repo={AI_JUNIOR_STARTER_KIT_LABEL}
            badge="Fork"
            desc="PRD、Storybook、CLI Executor Skills 教學沙盒——請 Fork 成自己的副本再開始練習。"
          />
          <ToolkitCard
            num="02"
            title="wport-agents"
            href={WPORT_AGENTS_REPO_URL}
            repo={WPORT_AGENTS_REPO_LABEL}
            desc="職涯 Skills 插件庫：用 SKILL 定義 AI 專家能力，用 @wport/cli 串接真實職缺資料。"
          />
        </div>
      </div>
    </div>
  </SlideShell>
);

const SSOT: Page = () => (
  <SlideShell variant="tint">
    <TopBar num="03" eyebrow="知識管理觀念" />
    <Title>
      大腦的<Accent>單一事實來源</Accent>：SSOT 與 <ObsidianLink />
    </Title>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 72,
        marginTop: 60,
        flex: 1,
      }}
    >
      <div>
        <Subhead>什麼是 SSOT？</Subhead>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
          <Def
            term="Single Source of Truth"
            desc="單一事實來源。拒絕將資訊散落在 Line、桌面與無數個筆記本。"
          />
          <Def
            term="大腦只留索引"
            desc="所有知識、工作紀錄、API Key 與流程，只存在於唯一、最權威的地方。"
          />
        </div>
      </div>
      <div>
        <Subhead>
          為什麼選擇 <ObsidianLink />？
        </Subhead>
        <BulletList
          items={[
            <>
              基於 <strong style={{ color: c.ink }}>Markdown</strong>{' '}
              的純文字資料庫，不被任何廠商綁架。
            </>,
            <>
              <strong style={{ color: c.ink }}>高擴充性</strong>：能與各種開發工具（IDE）無縫結合。
            </>,
            <>
              <strong style={{ color: c.ink }}>雙向連結</strong>
              ：像人類大腦一樣，建立網狀的知識圖譜。
            </>,
          ]}
        />
        <div style={{ marginTop: 28 }}>
          <RepoCallout href={OBSIDIAN_URL}>obsidian.md</RepoCallout>
        </div>
      </div>
    </div>
  </SlideShell>
);

const GitHubSync: Page = () => (
  <SlideShell>
    <TopBar num="04" eyebrow="Obsidian 進階應用" />
    <Title>
      打造完全免費、極度安全的 <Accent>GitHub 雲端同步</Accent>
    </Title>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 72,
        marginTop: 56,
        flex: 1,
      }}
    >
      <div>
        <Subhead>
          <ObsidianLink /> 本質就是一個資料夾
        </Subhead>
        <Body style={{ marginBottom: 36 }}>
          你的所有筆記，在電腦裡都只是 <InlineCode>.md</InlineCode> 純文字檔案——這代表它天生契合
          <Ink>「版本控制」</Ink>。
        </Body>
        <CodeBlock tint>
          <span style={{ color: c.muted, display: 'block', marginBottom: 16 }}>
            # 在本地 Obsidian 資料夾
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <CopyableCodeLine command={GIT_INIT}>
              <span style={{ color: c.primary, fontWeight: 700 }}>$</span> {GIT_INIT}
            </CopyableCodeLine>
            <CopyableCodeLine command={GIT_REMOTE}>
              <span>
                <span style={{ color: c.primary, fontWeight: 700 }}>$</span> git remote add origin{' '}
                <span style={{ color: c.primaryHover }}>&lt;your-private-repo&gt;</span>
              </span>
            </CopyableCodeLine>
            <CopyableCodeLine command={GIT_PUSH}>
              <span style={{ color: c.primary, fontWeight: 700 }}>$</span> {GIT_PUSH}
            </CopyableCodeLine>
          </div>
        </CodeBlock>
      </div>
      <div>
        <Subhead>如何成為你的專屬 Repo</Subhead>
        <BulletList
          items={[
            <>
              在本地 Obsidian 資料夾初始化 Git（<strong style={{ color: c.ink }}>git init</strong>
              ）。
            </>,
            <>
              連結至個人的 GitHub <strong style={{ color: c.ink }}>Private Repo</strong>，確保隱私。
            </>,
            <>
              透過 Git 進行版本控制，每次修改都<strong style={{ color: c.ink }}>有跡可循</strong>。
            </>,
          ]}
        />
        <Body style={{ marginTop: 36 }}>
          <span style={{ color: c.primary, fontWeight: 700 }}>結果：</span>
          完全免費、極度安全、跨裝置的無縫同步。
        </Body>
      </div>
    </div>
  </SlideShell>
);

const IdeObsidian: Page = () => (
  <SlideShell variant="tint">
    <TopBar num="05" eyebrow="工具整合" />
    <Title>
      用工程師思維整理資訊：<Accent>IDE + <ObsidianLink /></Accent>
    </Title>
    <p
      style={{ fontSize: 30, lineHeight: 1.65, color: c.body, maxWidth: 1180, margin: '36px 0 0' }}
    >
      為什麼要用 <Ink>VS Code / Cursor</Ink> 等 IDE 開啟你的 <ObsidianLink />
      筆記？打破傳統筆記框架的三大整合優勢——
    </p>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 40,
        marginTop: 56,
      }}
    >
      <ToolCol
        label="優勢 01"
        name="結構化管理"
        sections={[
          {
            heading: '',
            body: '利用 IDE 的極速全域搜尋與 Regex（正規表達式）快速調用知識。',
          },
        ]}
      />
      <ToolCol
        label="優勢 02"
        name="自動化排版"
        sections={[
          {
            heading: '',
            body: '利用 Markdown Linter、Snippets 快速產生結構優雅、格式統一的筆記。',
          },
        ]}
      />
      <ToolCol
        label="優勢 03"
        name="AI 本地協作"
        sections={[
          {
            heading: '',
            body: '讓 IDE 內的 AI Copilot 直接讀取筆記資料夾續寫、糾錯，使 Obsidian 成為 AI Agent 的知識底座。',
          },
        ]}
      />
    </div>
  </SlideShell>
);

const IdeToolbox: Page = () => (
  <SlideShell>
    <TopBar num="06" eyebrow="工具對比" />
    <Title>
      2026 新世代 <Accent>AI 優先</Accent> 的 IDE 工具箱
    </Title>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 40,
        marginTop: 60,
        flex: 1,
      }}
    >
      <ToolCol
        name="Antigravity 2.0"
        href="https://antigravity.google/product/antigravity-2"
        sections={[
          { heading: '核心特色', body: 'Google 推出的 AI 優先 Desktop 開發環境。' },
          { heading: '實習生優勢', body: '整合 Gemini 高算力，適合快速構建 UI 與專案邏輯分析。' },
        ]}
      />
      <ToolCol
        name="Kiro IDE"
        href="https://kiro.dev/downloads/"
        sections={[
          { heading: '核心特色', body: 'AWS 支援、Spec-First（規格書驅動）環境。' },
          { heading: '實習生優勢', body: '內建 MCP 支援與自動化 commit 訊息生成。' },
        ]}
      />
      <ToolCol
        name="Codex IDE"
        href="https://chatgpt.com/zh-Hant/download/"
        sections={[
          { heading: '核心特色', body: 'OpenAI 推出的 AI 優先 IDE，深度整合 Codex 程式助理。' },
          {
            heading: '實習生優勢',
            body: '在編輯器內直接對話、改碼與除錯，降低從想法到實作的切換成本。',
          },
        ]}
      />
    </div>
  </SlideShell>
);

const HandsOn01: Page = () => (
  <SlideShell variant="tint">
    <TopBar num="07" eyebrow="實作流程 · Step-by-Step" />
    <Title>
      實戰演練 01：從 AI 到 <ObsidianLink /> 的<Accent>知識流</Accent>
    </Title>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 96,
        marginTop: 48,
        flex: 1,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 30, justifyContent: 'center' }}>
        <StepItem
          n={1}
          title="AI 協作生成"
          desc="用免費的 ChatGPT / Gemini，輸入你的經歷與專長，請 AI 整理出結構化的「自我介紹與求職履歷」。"
        />
        <StepItem
          n={2}
          title="人工校對與修改"
          desc="修改、潤飾並精煉 AI 的生成結果，確保真實性與個人特色。"
        />
        <StepItem
          n={3}
          title="沉澱至本地資料庫"
          desc={
            <>
              將精煉後的內容以 <InlineCode>Markdown</InlineCode> 格式儲存到你的{' '}
              <ObsidianLink /> 本地資料庫（SSOT）。
            </>
          }
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Quote small="// thinking point">
          這不只是寫履歷，而是建立你與 AI 協作的
          <span style={{ color: c.primary }}> 第一個結構化知識節點</span>。
        </Quote>
      </div>
    </div>
  </SlideShell>
);

const SkillCli: Page = () => (
  <SlideShell>
    <TopBar num="08" eyebrow="技術觀念拆解" />
    <Title>
      解密 Repo 靈魂：什麼是 <Accent>Skill</Accent> 與 <Accent>CLI</Accent>？
    </Title>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 72,
        marginTop: 48,
        flex: 1,
      }}
    >
      <div>
        <Subhead>01 — 什麼是 Skill（技能包）</Subhead>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Def
            term="定義"
            desc={
              <>
                存在 <InlineCode>.cursor/skills/&lt;name&gt;/SKILL.md</InlineCode>{' '}
                的指令檔，定義 AI Agent 的特化能力與輸出規範。
              </>
            }
          />
          <Def
            term="作用"
            desc={
              <>
                讓普通 AI 擁有專家邏輯——例如{' '}
                <InlineCode>gen-resume</InlineCode>、<InlineCode>interviewer-ai</InlineCode>
                ——<Ink>避免 AI 講廢話。</Ink>
              </>
            }
          />
        </div>
      </div>
      <div>
        <Subhead>02 — 什麼是 CLI（命令列介面）</Subhead>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Def
            term="Command Line Interface"
            desc={
              <>
                用鍵盤輸入純文字指令的執行通道，例如 <InlineCode>wport jobs search</InlineCode>、
                <InlineCode>gh pr create</InlineCode>。
              </>
            }
          />
          <Def
            term="作用"
            desc={
              <>
                Agent 透過 CLI 拿真實資料、改檔案、部署專案——
                <Ink>而不是手動複製貼上。</Ink>
              </>
            }
          />
        </div>
      </div>
    </div>
    <div
      style={{
        marginTop: 36,
        padding: '22px 28px',
        background: c.primaryLight,
        border: `1px solid ${c.primaryMuted}`,
        borderRadius: 8,
        fontSize: 24,
        lineHeight: 1.55,
        color: c.body,
        flexShrink: 0,
      }}
    >
      <strong style={{ color: c.ink }}>本課範例：</strong>
      <ExternalLink href={WPORT_AGENTS_REPO_URL} mono style={{ fontSize: 22, marginLeft: 8 }}>
        {WPORT_AGENTS_REPO_LABEL}
      </ExternalLink>
      — Agent 讀 Skills、跑 <InlineCode>@wport/cli</InlineCode>，產出履歷 HTML、面試題與職涯報告。
    </div>
  </SlideShell>
);

const CliMcpApi: Page = () => (
  <SlideShell variant="tint">
    <TopBar num="09" eyebrow="觀念架構對比" />
    <Title>
      核心觀念對決：<Accent>CLI</Accent> vs <Accent>MCP</Accent> vs <Accent>API</Accent>
    </Title>
    <div
      style={{
        marginTop: 36,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div style={{ borderTop: `1px solid ${c.border}` }}>
        <CmpRow
          name="CLI"
          tag="執行通道"
          desc={
            <>
              使用者或 Agent 在<strong style={{ color: c.ink }}>本地執行命令</strong>
              的通道。例如：輸入一行指令，直接啟動打包或優化。
            </>
          }
        />
        <CmpRow
          name="MCP"
          tag="手與眼"
          desc={
            <>
              讓 AI 大模型直接<strong style={{ color: c.ink }}>連接外部資料源</strong>
              （本地檔案、資料庫）的橋樑，給予 AI 讀寫本地工具的權限。
            </>
          }
        />
        <CmpRow
          name="API"
          tag="傳輸管道"
          desc={
            <>
              程式與<strong style={{ color: c.ink }}>遠端雲端服務</strong>（OpenAI / Gemini
              伺服器）進行資料傳輸、接收生成內容的標準管道。
            </>
          }
        />
      </div>
    </div>
  </SlideShell>
);

const CliPower: Page = () => (
  <SlideShell>
    <TopBar num="10" eyebrow="實務痛點分析" />
    <Title>
      為什麼頂尖極客<Accent>不愛 GUI</Accent>？
    </Title>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 72,
        marginTop: 56,
        flex: 1,
      }}
    >
      <div>
        <Subhead>GUI（圖形介面）的硬傷</Subhead>
        <Body>
          需要在網頁、瀏覽器、Finder／檔案總管、軟體視窗之間<Ink>繁複切換</Ink>
          ——極度浪費時間與專注力。
        </Body>
      </div>
      <div>
        <Subhead>CLI 的壓倒性優勢</Subhead>
        <BulletList
          items={[
            <>
              <strong style={{ color: c.ink }}>自動化操作</strong>：一句指令，Agent
              就能在背景默默幫你完成任務。
            </>,
            <>
              <strong style={{ color: c.ink }}>工具鏈整合</strong>：將 Git、編譯器、AI Agent
              串聯在同一個終端機視窗。
            </>,
            <>
              <strong style={{ color: c.ink }}>輕量快速</strong>：不佔用多餘的記憶體與顯示資源。
            </>,
          ]}
        />
      </div>
    </div>
  </SlideShell>
);

const WportCliResume: Page = () => (
  <SlideShell variant="tint">
    <TopBar num="11" eyebrow="工作流實踐" />
    <Title>
      終極實戰：<Accent>wport cli</Accent> + skill 一鍵履歷生成
    </Title>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 88,
        marginTop: 44,
        flex: 1,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <StepItem
          n={1}
          title="知識沉澱"
          desc={
            <>
              <ObsidianLink /> 中已儲存你請 AI 潤飾好的履歷 Markdown 檔案（SSOT）。
            </>
          }
        />
        <StepItem
          n={2}
          title="載入 Skill"
          desc="載入 starter kit 中的專屬 skill，讓 AI 理解履歷打包規則與視覺美感。"
        />
        <StepItem
          n={3}
          title="終端執行"
          desc={
            <>
              在 Repo 目錄下執行 <InlineCode>wport cli</InlineCode>。
            </>
          }
        />
        <StepItem
          n={4}
          title="完美輸出"
          desc="CLI 自動抓取筆記與 Skill，一鍵生成精美、可直接部署的求職履歷網頁！"
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <CodeBlock tint>
          <span style={{ color: c.muted }}># Repo 目錄下</span>
          <br />
          <span style={{ color: c.primary, fontWeight: 700 }}>$</span> wport cli
          <br />
          <br />
          <span style={{ color: c.primaryHover }}>→</span> reading obsidian/resume.md
          <br />
          <span style={{ color: c.primaryHover }}>→</span> loading skill: resume-builder
          <br />
          <span style={{ color: c.primaryHover }}>→</span> rendering …
          <br />
          <span style={{ color: c.ink }}>✓</span> resume.html{' '}
          <span style={{ color: c.muted }}>deployed</span>
        </CodeBlock>
      </div>
    </div>
  </SlideShell>
);

const WfItem = ({ n, children }: { n: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 22, alignItems: 'flex-start' }}>
    <span
      style={{
        fontFamily: mono,
        fontSize: 24,
        fontWeight: 700,
        color: c.primary,
        flexShrink: 0,
        paddingTop: 2,
      }}
    >
      {n}
    </span>
    <span style={{ fontSize: 25, lineHeight: 1.5, color: '#C9C9C9' }}>{children}</span>
  </div>
);

const FlowStep = ({ n, children, compact = false }: { n: number; children: React.ReactNode; compact?: boolean }) => (
  <div
    style={{
      display: 'flex',
      gap: compact ? 16 : 22,
      alignItems: 'flex-start',
      background: c.white,
      border: `1px solid ${c.border}`,
      borderLeft: `4px solid ${c.primary}`,
      borderRadius: 8,
      padding: compact ? '14px 18px' : '22px 26px',
    }}
  >
    <div
      style={{
        flexShrink: 0,
        fontFamily: mono,
        fontSize: compact ? 18 : 22,
        fontWeight: 700,
        color: c.primary,
        width: compact ? 40 : 48,
        height: compact ? 40 : 48,
        border: `2px solid ${c.primary}`,
        borderRadius: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {n}
    </div>
    <div style={{ fontSize: compact ? 21 : 24, lineHeight: 1.55, color: c.body, paddingTop: compact ? 0 : 2 }}>
      {children}
    </div>
  </div>
);

type ChatMsg = { role: 'user' | 'bot'; text: string };

const CLI_CHAT_STEPS = [
  {
    cmd: 'obsidian cli read resume.md',
    reply: '→ 自動讀取本地最權威的履歷 markdown ✓',
  },
  {
    cmd: 'google cli push docs://resume',
    reply: '→ 已上傳 Google Docs，導師與朋友可線上共編 ✓',
  },
  {
    cmd: 'wport cli search "桃園地區最新 PM 職缺"',
    reply: '→ 聯網搜尋完成，找到 12 筆符合職缺 ✓',
  },
  {
    cmd: 'load skill interviewer',
    reply: '→ 面試官 skill 已載入，生成 10 題高頻面試 Q&A ✓',
  },
  {
    cmd: 'run resume-optimizer --keywords',
    reply: '→ 針對關鍵字產出 100% 客製化履歷 ✓',
  },
  {
    cmd: 'wport list | google sheet | vercel deploy',
    reply: '→ 職缺 Sheet 已建立 · 網站一鍵部署上架 ✓',
  },
] as const;

const CliChatDemo = ({ variant = 'light' }: { variant?: 'light' | 'dark' }) => {
  const dark = variant === 'dark';
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [draft, setDraft] = useState('');
  const [stepIdx, setStepIdx] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'bot' | 'pause'>('typing');
  const [botTyping, setBotTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, draft, botTyping]);

  useEffect(() => {
    const step = CLI_CHAT_STEPS[stepIdx];
    if (phase === 'typing') {
      if (draft.length < step.cmd.length) {
        const t = setTimeout(() => setDraft(step.cmd.slice(0, draft.length + 1)), 28);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => {
        setMessages((m) => [...m, { role: 'user', text: step.cmd }]);
        setDraft('');
        setBotTyping(true);
        setPhase('bot');
      }, 320);
      return () => clearTimeout(t);
    }
    if (phase === 'bot') {
      const t = setTimeout(() => {
        setMessages((m) => [...m, { role: 'bot', text: step.reply }]);
        setBotTyping(false);
        setPhase('pause');
      }, 680);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      const next = (stepIdx + 1) % CLI_CHAT_STEPS.length;
      if (next === 0) setMessages([]);
      setStepIdx(next);
      setPhase('typing');
    }, 1400);
    return () => clearTimeout(t);
  }, [phase, draft, stepIdx]);

  const panelBg = dark ? '#1a1a1a' : c.white;
  const panelBorder = dark ? '#3a3a3a' : c.border;
  const headerBg = dark ? '#252525' : c.tint;
  const userBubble = dark ? 'rgba(86,199,187,0.18)' : c.primaryLight;
  const botBubble = dark ? '#2e2e2e' : c.tint;
  const textColor = dark ? '#e8e8e8' : c.ink;
  const mutedColor = dark ? '#8a8a8a' : c.muted;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 0,
        borderRadius: 14,
        border: `1px solid ${panelBorder}`,
        background: panelBg,
        boxShadow: dark ? '0 24px 64px rgba(0,0,0,0.45)' : '0 16px 48px rgba(0,0,0,0.08)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '16px 22px',
          background: headerBg,
          borderBottom: `1px solid ${panelBorder}`,
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', gap: 8 }}>
          {['#ff5f57', '#febc2e', '#28c840'].map((dot) => (
            <span
              key={dot}
              style={{ width: 12, height: 12, borderRadius: 999, background: dot, opacity: dark ? 0.85 : 1 }}
            />
          ))}
        </div>
        <span
          style={{
            fontFamily: mono,
            fontSize: 17,
            fontWeight: 600,
            color: mutedColor,
            letterSpacing: '0.04em',
            marginLeft: 8,
          }}
        >
          wport agent · cli runner
        </span>
        <span
          style={{
            marginLeft: 'auto',
            fontFamily: mono,
            fontSize: 14,
            color: c.primary,
            background: dark ? 'rgba(86,199,187,0.12)' : c.primaryLight,
            padding: '4px 10px',
            borderRadius: 999,
          }}
        >
          live
        </span>
      </div>

      <div
        ref={scrollRef}
        style={{
          flex: 1,
          minHeight: 0,
          overflow: 'hidden',
          padding: '22px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        {messages.length === 0 && phase === 'typing' && draft.length === 0 && (
          <div style={{ fontSize: 18, color: mutedColor, fontFamily: mono, textAlign: 'center', marginTop: 24 }}>
            等待指令…
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={`${msg.role}-${i}-${msg.text.slice(0, 12)}`}
            className="aj-chat-msg"
            style={{
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '92%',
              fontFamily: mono,
              fontSize: 17,
              lineHeight: 1.55,
              padding: '12px 16px',
              borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
              background: msg.role === 'user' ? userBubble : botBubble,
              color: msg.role === 'user' ? (dark ? c.primaryMuted : c.primaryHover) : textColor,
              border: msg.role === 'bot' ? `1px solid ${panelBorder}` : 'none',
            }}
          >
            {msg.role === 'user' ? (
              <>
                <span style={{ color: c.primary, fontWeight: 700 }}>$ </span>
                {msg.text}
              </>
            ) : (
              msg.text
            )}
          </div>
        ))}
        {botTyping && (
          <div
            className="aj-chat-msg"
            style={{
              alignSelf: 'flex-start',
              display: 'flex',
              gap: 6,
              padding: '14px 18px',
              borderRadius: '14px 14px 14px 4px',
              background: botBubble,
              border: `1px solid ${panelBorder}`,
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="aj-chat-dot"
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 999,
                  background: c.primary,
                  display: 'inline-block',
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div
        style={{
          flexShrink: 0,
          borderTop: `1px solid ${panelBorder}`,
          padding: '16px 20px',
          background: headerBg,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontFamily: mono,
            fontSize: 17,
            color: textColor,
            background: dark ? '#141414' : c.white,
            border: `1px solid ${panelBorder}`,
            borderRadius: 10,
            padding: '14px 16px',
            minHeight: 48,
          }}
        >
          <span style={{ color: c.primary, fontWeight: 700, flexShrink: 0 }}>$</span>
          <span style={{ flex: 1, wordBreak: 'break-all' }}>
            {draft}
            {phase === 'typing' && <span className="aj-chat-cursor">▌</span>}
          </span>
        </div>
        <div
          style={{
            marginTop: 10,
            fontSize: 14,
            fontFamily: mono,
            color: mutedColor,
            letterSpacing: '0.06em',
          }}
        >
          step {String(stepIdx + 1).padStart(2, '0')} / {String(CLI_CHAT_STEPS.length).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

const UltimateWorkflow: Page = () => (
  <SlideShell variant="dark">
    <TopBar num="12" eyebrow="企業級 AI 實習生" dark />
    <Title dark>
      未來終極想像：當 <Accent>Skill + Agent + CLI</Accent> 聯手
    </Title>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 480px',
        gap: 56,
        marginTop: 28,
        flex: 1,
        minHeight: 0,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <p
          style={{
            fontSize: 28,
            lineHeight: 1.65,
            color: '#C9C9C9',
            margin: 0,
            maxWidth: 900,
          }}
        >
          把今天學的工具全部串接——這是你能在 2026 實現的「
          <span style={{ color: '#fff', fontWeight: 700 }}>秒級求職自動化流</span>」。
        </p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            marginTop: 28,
            flex: 1,
            minHeight: 0,
          }}
        >
          <WfItem n="01">
            <DarkInlineCode>obsidian cli</DarkInlineCode> 自動讀取本地最權威的履歷 markdown。
          </WfItem>
          <WfItem n="02">
            <DarkInlineCode>google cli</DarkInlineCode> 上傳至 Google Docs，導師與朋友線上共編。
          </WfItem>
          <WfItem n="03">
            <DarkInlineCode>wport cli</DarkInlineCode> 聯網搜尋「桃園地區最新 PM 職缺」。
          </WfItem>
          <WfItem n="04">
            載入 <DarkInlineCode>面試官 skill</DarkInlineCode>，自動生成 10 題高頻面試 Q&amp;A。
          </WfItem>
          <WfItem n="05">
            <DarkInlineCode>resume-optimizer skill</DarkInlineCode> 針對關鍵字，產出 100% 客製化履歷。
          </WfItem>
          <WfItem n="06">
            <DarkInlineCode>wport</DarkInlineCode> 列出職缺 →{' '}
            <DarkInlineCode>google cli</DarkInlineCode> 做成 Sheet →{' '}
            <DarkInlineCode>vercel cli</DarkInlineCode> 一鍵部署上架！
          </WfItem>
        </div>
        <div style={{ paddingTop: 20, borderTop: '1px solid #4a4a4a', marginTop: 'auto', flexShrink: 0 }}>
          <p style={{ fontSize: 26, color: '#fff', fontWeight: 700, margin: 0 }}>
            一鍵執行，<span style={{ color: c.primary }}>10 秒</span>搞定別人要花 3 天的手動地獄。
            <span style={{ color: '#C9C9C9', fontWeight: 500 }}> 這就是為什麼企業搶著要你。</span>
          </p>
        </div>
      </div>
      <CliChatDemo variant="dark" />
    </div>
  </SlideShell>
);

const Closing: Page = () => (
  <SlideShell>
    <TopBar num="14" eyebrow="總結與行動 · Call to Action" />
    <Title>
      你的<Accent>下一步</Accent>。
    </Title>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 72,
        marginTop: 56,
        flex: 1,
      }}
    >
      <div>
        <Subhead>立即動手</Subhead>
        <BulletList
          items={[
            <>
              <strong style={{ color: c.ink }}>Fork</strong> AI 新手包：
              <ExternalLink href={AI_JUNIOR_STARTER_KIT_URL} mono>
                {AI_JUNIOR_STARTER_KIT_LABEL}
              </ExternalLink>
            </>,
            <>
              Clone wport-agents 並 symlink Skills：
              <ExternalLink href={WPORT_AGENTS_REPO_URL} mono>
                {WPORT_AGENTS_REPO_LABEL}
              </ExternalLink>
            </>,
            <>
              下載 <ObsidianLink mono>obsidian.md</ObsidianLink> 並建立知識庫，再
              <strong style={{ color: c.ink }}>同步至 GitHub</strong>。
            </>,
            <>
              實作一鍵履歷生成，<strong style={{ color: c.ink }}>發佈你的個人網頁</strong>！
            </>,
          ]}
        />
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <RepoCallout href={AI_JUNIOR_STARTER_KIT_URL}>{AI_JUNIOR_STARTER_KIT_LABEL}</RepoCallout>
          <RepoCallout href={WPORT_AGENTS_REPO_URL}>{WPORT_AGENTS_REPO_LABEL}</RepoCallout>
          <RepoCallout href={OBSIDIAN_URL}>obsidian.md</RepoCallout>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Quote small="— 企業主給你的寄語">
          掌握工具的人，將取代只會使用勞力的人。
          <br />用 AI 幫你工作，<span style={{ color: c.primary }}>把時間留給思考。</span>
        </Quote>
      </div>
    </div>
  </SlideShell>
);

const CalcSlider = ({
  label,
  sub,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  sub: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
      <span style={{ fontSize: 26, fontWeight: 700, color: c.ink, whiteSpace: 'nowrap' }}>
        {label}{' '}
        <span
          style={{
            fontFamily: mono,
            fontSize: 19,
            color: c.muted,
            fontWeight: 500,
            marginLeft: 12,
            letterSpacing: '0.04em',
          }}
        >
          {sub}
        </span>
      </span>
      <span
        style={{
          fontFamily: mono,
          fontSize: 40,
          fontWeight: 700,
          color: c.primary,
          width: 70,
          textAlign: 'right',
        }}
      >
        {value}
      </span>
    </div>
    <input
      type="range"
      className="aj-sl"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  </div>
);

const CombinatoricsCalculator: Page = () => {
  const [ssot, setSsot] = useState(5);
  const [agent, setAgent] = useState(3);
  const [skill, setSkill] = useState(6);
  const [cli, setCli] = useState(4);
  const [pop, setPop] = useState(false);
  const total = ssot * agent * skill * cli;

  const bumpPop = () => {
    setPop(false);
    requestAnimationFrame(() => setPop(true));
  };

  const setSsotVal = (v: number) => {
    setSsot(v);
    bumpPop();
  };
  const setAgentVal = (v: number) => {
    setAgent(v);
    bumpPop();
  };
  const setSkillVal = (v: number) => {
    setSkill(v);
    bumpPop();
  };
  const setCliVal = (v: number) => {
    setCli(v);
    bumpPop();
  };

  return (
    <SlideShell>
      <TopBar num="15" eyebrow="Finale · Combinatorics Calculator" />
      <Title>
        你的工作流，是一道<Accent>乘法題</Accent>。
      </Title>
      <p
        style={{
          fontSize: 30,
          lineHeight: 1.65,
          color: c.body,
          maxWidth: 1180,
          margin: '24px 0 0',
        }}
      >
        拉動滑桿，親眼看見你手上的工具能組合出多少種自動化實習生工作流——
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          marginTop: 24,
          flex: 1,
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 38 }}>
          <CalcSlider
            label="SSOT 筆記"
            sub="obsidian"
            value={ssot}
            min={1}
            max={12}
            onChange={setSsotVal}
          />
          <CalcSlider
            label="Agent"
            sub="agents"
            value={agent}
            min={1}
            max={10}
            onChange={setAgentVal}
          />
          <CalcSlider
            label="Skill"
            sub="skills"
            value={skill}
            min={1}
            max={12}
            onChange={setSkillVal}
          />
          <CalcSlider
            label="CLI 工具"
            sub="cli"
            value={cli}
            min={1}
            max={10}
            onChange={setCliVal}
          />
        </div>
        <div
          style={{
            background: c.tint,
            border: `1px solid ${c.border}`,
            borderRadius: 14,
            padding: '64px 56px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: mono,
              fontSize: 30,
              color: c.body,
              marginBottom: 18,
              letterSpacing: '0.02em',
            }}
          >
            {ssot} <span style={{ color: c.primary, fontWeight: 700 }}>×</span> {agent}{' '}
            <span style={{ color: c.primary, fontWeight: 700 }}>×</span> {skill}{' '}
            <span style={{ color: c.primary, fontWeight: 700 }}>×</span> {cli}{' '}
            <span style={{ color: c.primary, fontWeight: 700 }}>=</span>
          </div>
          <div
            className={pop ? 'aj-pop' : undefined}
            style={{
              fontSize: 200,
              fontWeight: 700,
              lineHeight: 1,
              color: c.primary,
              letterSpacing: '-0.03em',
            }}
          >
            {total.toLocaleString('en-US')}
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, color: c.ink, marginTop: 8 }}>
            種完全不同的自動化工作流
          </div>
          <p style={{ fontSize: 24, lineHeight: 1.6, color: c.body, marginTop: 28, maxWidth: 560 }}>
            當你手上有 <strong style={{ color: c.ink }}>{ssot} 個 SSOT 筆記</strong>、
            <strong style={{ color: c.ink }}> {agent} 個 Agent</strong>、
            <strong style={{ color: c.ink }}> {skill} 個 Skills</strong>、
            <strong style={{ color: c.ink }}> {cli} 個 CLI</strong>，你就能創造出{' '}
            <strong style={{ color: c.ink }}>{total.toLocaleString('en-US')} 種</strong>
            完全不同的實習生工作流。這，就是你的個人核心競爭力。
          </p>
        </div>
      </div>
    </SlideShell>
  );
};

export const WhatYouCanDo: Page = () => (
  <SlideShell variant="tint">
    <TopBar num="13" eyebrow="實戰路線圖 · What You Can Build" />
    <Title>
      具體來說，你可以<Accent>做到這些</Accent>
    </Title>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 480px',
        gap: 48,
        marginTop: 24,
        flex: 1,
        minHeight: 0,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <p
          style={{
            fontSize: 26,
            lineHeight: 1.6,
            color: c.body,
            margin: 0,
            maxWidth: 900,
          }}
        >
          從 <ObsidianLink /> 個人資料到網站上線、寄信給教授——今天就能跑通的完整六步驟。
        </p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            marginTop: 22,
            flex: 1,
            minHeight: 0,
          }}
        >
          <FlowStep n={1} compact>
            <ObsidianLink /> 讀取個人資訊——履歷、自傳與專長筆記，作為唯一權威資料源（SSOT）。
          </FlowStep>
          <FlowStep n={2} compact>
            在 IDE 載入 <InlineCode>wport skill</InlineCode>
            ，以此資訊一鍵產生結構化、可部署的個人履歷。
          </FlowStep>
          <FlowStep n={3} compact>
            以 <ObsidianLink /> 資料呼叫 <InlineCode>靜態網站 skill</InlineCode>
            ，製作個人作品集網站。
          </FlowStep>
          <FlowStep n={4} compact>
            透過 <InlineCode>google speed cli</InlineCode> 檢查網站速度，依報告迭代優化後再更新。
          </FlowStep>
          <FlowStep n={5} compact>
            使用 <InlineCode>vercel cli</InlineCode> 將靜態網站一鍵上架，取得公開網址。
          </FlowStep>
          <FlowStep n={6} compact>
            使用 <InlineCode>google workspace cli</InlineCode>
            ，網站上線後自動寄信通知教授你的作品連結。
          </FlowStep>
        </div>
      </div>
      <CliChatDemo variant="light" />
    </div>
  </SlideShell>
);

const SmartStationVol3Page: Page = () => (
  <LinkMotionScope>
    <SmartStationVol3 />
  </LinkMotionScope>
);

export const meta: SlideMeta = {
  title: 'AI 實習生速成指南',
  createdAt: '2026-06-14T14:54:44.234Z',
};

export default [
  Cover,
  WhyHere,
  SSOT,
  GitHubSync,
  IdeObsidian,
  IdeToolbox,
  HandsOn01,
  SkillCli,
  CliMcpApi,
  CliPower,
  WportCliResume,
  UltimateWorkflow,
  WhatYouCanDo,
  Closing,
  CombinatoricsCalculator,
  SmartStationVol3Page,
] satisfies Page[];

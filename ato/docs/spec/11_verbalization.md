# Verbalization

## Business Viability

At this stage, the product is developed as a personal project with no focus on revenue. I am the user, and the criterion for design decisions is whether I would want to use it every day. If users gather after launch, data sync and AI features could become natural monetization points (the Obsidian model).

## Concept

Japanese typesetting + Git + AI + Markdown.

Carry your own private study wherever you go. An editor for focused writing, powered by beautiful Japanese and cutting-edge technology.

A study is a sanctuary for the mind. Amid the noise of the city, in a bustling cafe, deep in a rustling mountain forest — it is always there, unchanged. Where emotion and utility intertwine, it becomes someone's "trusted tool."

*Based on the direction of the editor "stone," with added cross-platform and AI capabilities. As stone is open source, the frontend repository will be made public as a tribute.

## Target Audience

People familiar with technologies like AI, Git, and Markdown who write long-form Japanese text such as blogs and essays.

## Marketing

What communities should be exposed to this?

## Value

The value of a "study" is defined as follows and realized through features. By defining symbols that embody each element, the identity of the product is made clear.

- **To (戸 / Door)**: A focused environment, shut off from the noise of the outside world
  - Low cognitive-cost UI
- **Fude (筆 / Brush)**: A favorite tool, custom-tailored just for you
  - Japanese typesetting
  - Fully customizable UI elements
- **Shiori (栞 / Bookmark)**: A place that welcomes you back in the same state as yesterday
  - Persistent workspace across all devices
  - Cross-platform (open the app and it's right there)
- **Tana (棚 / Shelf)**: Past information, accumulated and ready to be leveraged
  - AI agent
  - Git integration
  - Publishing features (Note, Zenn, etc.)

## Monetization

Existing editors use a one-time purchase model, which prevents the natural purchasing behavior of "experiencing writing before considering a purchase." By introducing a freemium model, the priority is placed on letting people try it first.

## Japanese Typesetting

### Overview

Japanese typesetting (和文組版) is a systematic framework for arranging Japanese text beautifully and legibly. It is defined by JIS X 4051.

### Kinsoku (Line-Break Restrictions)

Rules governing which characters must not appear at the beginning or end of a line.

- **Start-of-line prohibition**: Punctuation (。、), closing brackets (」』）】〉), ？！, prolonged sound marks (ー), small kana (っゃゅょ), …― etc. must not appear at the start of a line
- **End-of-line prohibition**: Opening brackets (「『（【〈) etc. must not appear at the end of a line
- **Non-breaking rules**: Ellipses (……), em dashes (——), decimals (3.14), digit grouping (1,000), numbers with units (5kg) etc. must not be split across lines

### Letter Spacing

- **Solid setting (ベタ組み)**: All characters are set at full-width, monospaced. The standard for body text. Provides stable readability
- **Proportional setting (ツメ組み)**: Characters are set proportionally based on individual widths. Suited for headings and titles

### Punctuation Spacing (Aki) Handling

The most complex aspect of Japanese typesetting. Punctuation marks (periods, commas, brackets, etc.) are half-width characters but occupy full-width space due to surrounding aki (whitespace).

```
Character width (half) + Aki (half) = Full-width

Example: 「文章」
  「 → half-width character + half-width aki after = full-width
  」 → half-width aki before + half-width character = full-width
```

When punctuation marks are consecutive (」「 or 。」), the aki overlaps and must be reduced:

```
✕: ○○」　「○○  (full-width gap from overlapping aki)
○: ○○」「○○    (half-width reduction)
```

### Kinsoku Adjustment Methods

- **Oi-komi (Tucking in)**: Reduce the aki of punctuation on the previous line to fit the restricted character into that line
- **Oi-dashi (Pushing out)**: Move the last character of the line to the next line and evenly expand the letter spacing to compensate

### Notes on Web Implementation

CSS properties `word-break`, `line-break`, and `overflow-wrap` offer partial control, but punctuation spacing (half-width reduction, etc.) cannot be fully handled by CSS alone. Full Japanese typesetting requires JavaScript-based character spacing control or a dedicated engine.

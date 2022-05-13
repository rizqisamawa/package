#!/usr/bin/env node

const figlet = require("figlet");
const center = require("center-align");
const justify = require("justified");
const wrap = require("word-wrap");
const art = require("ascii-art");
const fs = require("fs");
const path = require("path");
const credits = require("./credits.js");
const centerAlign = require("center-align");

// pl/pr=padding-left/right
const [pl, pr, width, marks] = [
  "   ",
  "   ",
  67,
  {
    nw: "╔",
    n: "═",
    ne: "╗",
    e: "║",
    se: "╝",
    s: "═",
    sw: "╚",
    w: "║",
  },
];

const r = (str, count) => str.repeat(count);

const bx = (title, body) => {
  let o =
    pl +
    `${marks.nw}${marks.n}${title}${r(marks.n, width - title.length - 4)}${
      marks.ne
    }\n`;

  const bs = body.trim().split("\n");

  const bl = pl + marks.w + r(" ", width - 3) + marks.w + "\n";

  o += bl;
  bs.forEach((l) => {
    const t = l.trim();
    const restTotal = width - t.length - (pl + pr).length - 3;
    const rest = restTotal > -2 ? r(" ", restTotal) : "";

    o += pl + marks.w + pl + t + rest + pr + marks.w + "\n";
  });
  o += bl;

  o += pl + `${marks.sw}${r(marks.s, width - 3)}${marks.se}\n`;

  return o;
};

const data = fs.readFileSync(path.join(__dirname, "3d.flf"), "utf8");
figlet.parseFont("3dFont", data);

figlet.text(
  credits.header,
  {
    // font: "Isometric2",
    // font: "Crawford2",
    font: "ANSI Shadow",
  },
  function (err, headerText) {
    console.log(
      center(headerText, width),
      "\n",
      center(credits.tagline, width),
      "\n"
    );

    credits.sections.forEach(({ title, body }) => {
      console.log(bx(title, center(body)));
    });
  }
);

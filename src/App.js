import React, { useState, useEffect, useRef } from "react";

const QUOTES = [
  { text: "The impediment to action advances action. What stands in the way becomes the way.", source: "Marcus Aurelius, Meditations" },
  { text: "You have power over your mind, not outside events. Realize this, and you will find strength.", source: "Marcus Aurelius, Meditations" },
  { text: "Waste no more time arguing what a good man should be. Be one.", source: "Marcus Aurelius, Meditations" },
  { text: "The body must be treated more rigorously, that it may not be disobedient to the mind.", source: "Seneca, Letters to Lucilius" },
  { text: "It is not because things are difficult that we do not dare; it is because we do not dare that they are difficult.", source: "Seneca, Letters to Lucilius" },
  { text: "No man was ever wise by chance.", source: "Seneca, Letters to Lucilius" },
  { text: "He who is brave is free.", source: "Seneca, Letters to Lucilius" },
  { text: "Difficulties strengthen the mind, as labor does the body.", source: "Seneca, Letters to Lucilius" },
  { text: "Luck is what happens when preparation meets opportunity.", source: "Seneca" },
  { text: "Begin at once to live, and count each separate day as a separate life.", source: "Seneca, Letters to Lucilius" },
  { text: "We suffer more in imagination than in reality.", source: "Seneca" },
  { text: "First say to yourself what you would be; then do what you have to do.", source: "Epictetus, Discourses" },
  { text: "Make the best use of what is in your power, and take the rest as it happens.", source: "Epictetus, Enchiridion" },
  { text: "Seek not the good in external things; seek it in yourselves.", source: "Epictetus, Discourses" },
  { text: "Men are disturbed not by things, but by the opinions about things.", source: "Epictetus, Enchiridion" },
  { text: "Wealth consists not in having great possessions, but in having few wants.", source: "Epictetus" },
  { text: "If you want to improve, be content to be thought foolish and stupid.", source: "Epictetus, Enchiridion" },
  { text: "Know thyself.", source: "Socrates, via Plato" },
  { text: "The unexamined life is not worth living.", source: "Socrates, Apology" },
  { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", source: "Aristotle, Nicomachean Ethics" },
  { text: "Courage is the first of human qualities because it is the quality which guarantees all others.", source: "Aristotle" },
  { text: "Knowing yourself is the beginning of all wisdom.", source: "Aristotle" },
  { text: "Quality is not an act. It is a habit.", source: "Aristotle" },
  { text: "What does not kill me makes me stronger.", source: "Friedrich Nietzsche, Twilight of the Idols" },
  { text: "He who has a why to live can bear almost any how.", source: "Friedrich Nietzsche" },
  { text: "Man must surpass himself.", source: "Friedrich Nietzsche, Thus Spoke Zarathustra" },
  { text: "Iron rusts from disuse; water loses its purity from stagnation. Even so does inaction sap the vigor of the mind.", source: "Leonardo da Vinci" },
  { text: "Learning never exhausts the mind.", source: "Leonardo da Vinci" },
  { text: "This above all: to thine own self be true.", source: "William Shakespeare, Hamlet" },
  { text: "To dare is to lose one's footing momentarily. To not dare is to lose oneself.", source: "Søren Kierkegaard" },
  { text: "Life can only be understood backwards; but it must be lived forwards.", source: "Søren Kierkegaard" },
  { text: "Do not go where the path may lead, go instead where there is no path and leave a trail.", source: "Ralph Waldo Emerson, Self-Reliance" },
  { text: "Nothing great was ever achieved without enthusiasm.", source: "Ralph Waldo Emerson, Circles" },
  { text: "Go confidently in the direction of your dreams. Live the life you have imagined.", source: "Henry David Thoreau, Walden" },
  { text: "Do what you can, with what you have, where you are.", source: "Theodore Roosevelt" },
  { text: "It is not the critic who counts. The credit belongs to the man who is actually in the arena.", source: "Theodore Roosevelt, Citizenship in a Republic" },
  { text: "Comparison is the thief of joy.", source: "Theodore Roosevelt" },
  { text: "In the middle of difficulty lies opportunity.", source: "Albert Einstein" },
  { text: "Life is like riding a bicycle. To keep your balance, you must keep moving.", source: "Albert Einstein" },
  { text: "Follow your bliss and the universe will open doors where there were only walls.", source: "Joseph Campbell" },
  { text: "The cave you fear to enter holds the treasure you seek.", source: "Joseph Campbell" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", source: "Winston Churchill" },
  { text: "If you're going through hell, keep going.", source: "Winston Churchill" },
  { text: "Strength does not come from physical capacity. It comes from an indomitable will.", source: "Mahatma Gandhi" },
  { text: "The mind is everything. What you think, you become.", source: "Buddha" },
  { text: "The journey of a thousand miles begins with a single step.", source: "Laozi, Tao Te Ching" },
  { text: "Mastering others is strength; mastering yourself is true power.", source: "Laozi, Tao Te Ching" },
  { text: "It always seems impossible until it's done.", source: "Nelson Mandela" },
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", source: "Nelson Mandela" },
  { text: "Absorb what is useful, discard what is useless, and add what is specifically your own.", source: "Bruce Lee" },
  { text: "Do not pray for an easy life; pray for the strength to endure a difficult one.", source: "Bruce Lee" },
  { text: "The successful warrior is the average man, with laser-like focus.", source: "Bruce Lee" },
  { text: "Some people want it to happen, some wish it would happen, others make it happen.", source: "Michael Jordan" },
  { text: "Champions are made from something deep inside — a desire, a dream, a vision.", source: "Muhammad Ali" },
  { text: "I hated every minute of training, but I said: don't quit. Suffer now and live the rest of your life as a champion.", source: "Muhammad Ali" },
  { text: "You do not rise to the level of your goals. You fall to the level of your systems.", source: "James Clear, Atomic Habits" },
  { text: "Every action you take is a vote for the type of person you wish to become.", source: "James Clear, Atomic Habits" },
  { text: "Discipline is the bridge between goals and accomplishment.", source: "Jim Rohn" },
  { text: "Take care of your body. It's the only place you have to live.", source: "Jim Rohn" },
  { text: "Don't wish it were easier. Wish you were better.", source: "Jim Rohn" },
  { text: "Whether you think you can, or you think you can't — you're right.", source: "Henry Ford" },
  { text: "The secret of getting ahead is getting started.", source: "Mark Twain" },
  { text: "Inspiration exists, but it has to find you working.", source: "Pablo Picasso" },
  { text: "Stay hungry, stay foolish.", source: "Steve Jobs, Stanford Commencement Address" },
  { text: "I have not failed. I've just found 10,000 ways that won't work.", source: "Thomas Edison" },
  { text: "Whatever you are, be a good one.", source: "Abraham Lincoln" },
  { text: "Hard work beats talent when talent doesn't work hard.", source: "Tim Notke" },
  { text: "Before enlightenment, chop wood, carry water. After enlightenment, chop wood, carry water.", source: "Zen proverb" },
  { text: "Work hard in silence; let success be your noise.", source: "Frank Ocean" },
];

const WORKOUT_DAYS = {
  legs: { label: "Legs", color: "#8B7355", exercises: [{ name: "Squats", repRange: "4-6" }, { name: "Leg Press", repRange: "6-8" }, { name: "Leg Extension", repRange: "8-10" }, { name: "Leg Curls", repRange: "8-10" }] },
  push: { label: "Push", color: "#6B8CAE", exercises: [{ name: "Bench Press", repRange: "4-6" }, { name: "Shoulder Press", repRange: "4-6" }, { name: "Incline Dumbbell Press", repRange: "6-8" }, { name: "Front-Side Raises", repRange: "8-10" }] },
  pull: { label: "Pull", color: "#7A8B6F", exercises: [{ name: "Deadlifts", repRange: "4-6" }, { name: "Incline Dumbbell Rows", repRange: "8-10" }, { name: "Bent-Over Lateral Raise", repRange: "8-10" }, { name: "Lat Pull Down", repRange: "8-10" }] },
  arms: { label: "Arms & Abs", color: "#9B7B8A", exercises: [{ name: "Hammer Curl", repRange: "8-10" }, { name: "Skull Crusher", repRange: "6-8" }, { name: "Cable Curl", repRange: "6-8" }, { name: "Close-Grip Bench Press", repRange: "4-6" }, { name: "Cable Crunch", repRange: "" }, { name: "Decline Situp", repRange: "" }, { name: "Leg Raise", repRange: "" }] },
};

const DAY_ORDER = ["legs", "push", "pull", "arms"];
const WARMUP_EXERCISES = ["Squats", "Bench Press", "Shoulder Press", "Deadlifts", "Hammer Curl", "Skull Crusher"];
const BARBELL_EXERCISES = ["Squats", "Bench Press", "Shoulder Press", "Deadlifts"];
const STANDARD_PLATES = [45, 35, 25, 10, 5, 2.5, 1.25];

const roundToValidPlates = (weight) => {
  if (weight <= 0) return 0;
  let total = 0, remaining = weight;
  for (const plate of STANDARD_PLATES) {
    while (remaining >= plate - 0.001) { total += plate; remaining -= plate; remaining = Math.round(remaining * 1000) / 1000; }
  }
  return Math.round(total * 1000) / 1000;
};
const calcAside = (w) => w <= 45 ? null : roundToValidPlates((w - 45) / 2);
const getWarmupSets = (exName, x) => {
  const w1 = x / 2, w2 = x * 0.75, isB = BARBELL_EXERCISES.includes(exName);
  if (isB) return [{ reps: 10, weight: w1, aside: calcAside(w1), bar: w1 <= 45 }, { reps: 10, weight: w1, aside: calcAside(w1), bar: w1 <= 45 }, { reps: 5, weight: w2, aside: calcAside(w2), bar: w2 <= 45 }];
  return [{ reps: 10, weight: w1 }, { reps: 10, weight: w1 }, { reps: 5, weight: w2 }];
};
const fmtW = (w) => `${Math.round(w * 4) / 4}`;
const getWeekKey = (date) => {
  const d = new Date(date + "T12:00:00"), day = d.getDay();
  const m = new Date(d); m.setDate(d.getDate() - day + (day === 0 ? -6 : 1));
  return m.toISOString().split("T")[0];
};
const getWeekLabel = (wk) => {
  const s = new Date(wk + "T12:00:00"), e = new Date(s); e.setDate(e.getDate() + 6);
  const o = { month: "short", day: "numeric" };
  return `Week of ${s.toLocaleDateString("en-US", o)} – ${e.toLocaleDateString("en-US", o)}`;
};
const formatDate = (d) => new Date(d + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
const getGreeting = () => { const h = new Date().getHours(); return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening"; };
const getDailyQuote = () => { const n = new Date(); return QUOTES[(n.getFullYear() * 365 + n.getMonth() * 31 + n.getDate()) % QUOTES.length]; };
const today = () => new Date().toISOString().split("T")[0];
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Josefin+Sans:wght@200;300;400&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  :root{
    --black:#0a0907;--deep:#111009;--stone:#1e1c17;--marble:#252320;
    --warm-gray:#5a5548;--ash:#8a8070;--parchment:#c4b99a;--cream:#e8dcc8;
    --white:#f5f2ed;--gold:#c9a84c;--gold-glow:rgba(201,168,76,0.35);
    --sepia:#a08060;--red:#8B4040;--blue:#6B8CAE;
    --fd:'Cormorant Garamond',serif;--fb:'Josefin Sans',sans-serif;
  }
  html,body,#root{height:100%;background:var(--black);}
  .app{max-width:430px;margin:0 auto;min-height:100vh;background:var(--black);color:var(--cream);font-family:var(--fb);position:relative;}
  .grain{position:fixed;top:0;left:0;right:0;bottom:0;pointer-events:none;z-index:100;opacity:0.025;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");}

  .bnav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;background:rgba(10,9,7,0.97);backdrop-filter:blur(24px);border-top:1px solid rgba(255,255,255,0.07);display:flex;z-index:50;padding-bottom:env(safe-area-inset-bottom,8px);}
  .ni{flex:1;display:flex;flex-direction:column;align-items:center;padding:14px 0 10px;gap:5px;background:none;border:none;cursor:pointer;color:var(--warm-gray);font-family:var(--fb);font-size:9px;letter-spacing:0.18em;text-transform:uppercase;transition:color 0.2s;}
  .ni.active{color:var(--gold);}
  .ni svg{width:19px;height:19px;}

  .screen{padding-bottom:90px;min-height:100vh;}
  .hdr{padding:52px 24px 24px;border-bottom:1px solid rgba(255,255,255,0.06);margin-bottom:8px;position:relative;}
  .hdr-label{font-family:var(--fb);font-size:9px;letter-spacing:0.35em;color:var(--ash);text-transform:uppercase;margin-bottom:10px;}
  .hdr-title{font-family:var(--fd);font-size:44px;font-weight:300;color:var(--white);line-height:1.05;}
  .hdr-sub{font-family:var(--fd);font-style:italic;font-size:15px;color:var(--sepia);margin-top:6px;}
  .plus-btn{position:absolute;top:52px;right:24px;width:40px;height:40px;background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.35);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s;color:var(--gold);font-size:22px;line-height:1;}
  .plus-btn:hover{background:rgba(201,168,76,0.2);}

  .quote{margin:16px 20px 8px;padding:18px 20px;border-left:2px solid var(--gold);background:rgba(201,168,76,0.03);}
  .quote-text{font-family:var(--fd);font-style:italic;font-size:14px;color:var(--parchment);line-height:1.75;}
  .quote-src{margin-top:10px;font-size:9px;letter-spacing:0.2em;color:var(--warm-gray);text-transform:uppercase;}

  .slabel{font-size:9px;letter-spacing:0.32em;color:var(--warm-gray);text-transform:uppercase;padding:24px 24px 10px;}

  .card{margin:0 16px 12px;background:var(--stone);border:1px solid rgba(255,255,255,0.08);border-radius:3px;padding:20px;position:relative;}
  .card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent);}

  /* BATTLE PLAN */
  .bp-wrap{padding:0 16px;}
  .bp-wrap.complete{border-radius:6px;padding:12px;background:rgba(201,168,76,0.05);border:1px solid rgba(201,168,76,0.4);box-shadow:0 0 30px rgba(201,168,76,0.08),inset 0 0 30px rgba(201,168,76,0.03);animation:bpGlow 3s ease-in-out infinite;}
  @keyframes bpGlow{0%,100%{box-shadow:0 0 20px rgba(201,168,76,0.1),inset 0 0 20px rgba(201,168,76,0.03);}50%{box-shadow:0 0 40px rgba(201,168,76,0.2),inset 0 0 40px rgba(201,168,76,0.06);}}
  .bp-complete-label{text-align:center;font-family:var(--fd);font-style:italic;font-size:13px;color:var(--gold);letter-spacing:0.15em;padding:0 0 10px;animation:fadeUp 0.8s ease;}
  .bp-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
  .bp-card{border-radius:3px;padding:20px 18px;cursor:pointer;display:flex;flex-direction:column;gap:8px;transition:all 0.25s;position:relative;overflow:hidden;text-align:left;border:1px solid rgba(255,255,255,0.07);background:var(--stone);user-select:none;}
  .bp-card.empty{border-style:dashed;border-color:rgba(255,255,255,0.12);background:rgba(255,255,255,0.02);}
  .bp-card.empty:hover{border-color:rgba(201,168,76,0.35);background:rgba(201,168,76,0.03);}
  .bp-card.logged{background:linear-gradient(135deg,rgba(201,168,76,0.1),rgba(201,168,76,0.04));border-color:rgba(201,168,76,0.35);}
  .bp-card.logged::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent);}
  .bp-label{font-family:var(--fd);font-size:20px;font-weight:300;}
  .bp-card.empty .bp-label{color:rgba(255,255,255,0.45);}
  .bp-card.logged .bp-label{color:var(--white);}
  .bp-meta{font-size:8px;letter-spacing:0.18em;text-transform:uppercase;}
  .bp-card.empty .bp-meta{color:rgba(255,255,255,0.2);}
  .bp-card.logged .bp-meta{color:var(--gold);}
  .bp-icon{position:absolute;bottom:14px;right:16px;font-size:16px;}
  .bp-card.empty .bp-icon{color:rgba(255,255,255,0.15);font-size:22px;}
  .bp-card.logged .bp-icon{color:var(--gold);}

  /* SWIM PANEL */
  .swim-panel{margin-top:10px;border-radius:3px;padding:18px 20px;cursor:pointer;display:flex;align-items:center;gap:14px;transition:all 0.25s;position:relative;overflow:hidden;border:1px solid rgba(107,140,174,0.2);background:rgba(107,140,174,0.06);user-select:none;}
  .swim-panel:hover{border-color:rgba(107,140,174,0.4);background:rgba(107,140,174,0.1);}
  .swim-panel-left{flex:1;}
  .swim-panel-title{font-family:var(--fd);font-size:20px;font-weight:300;color:var(--white);}
  .swim-panel-meta{font-size:8px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(107,140,174,0.7);margin-top:4px;}
  .swim-star{font-size:18px;color:rgba(107,140,174,0.3);transition:all 0.3s;}
  .swim-star.lit{color:#6B8CAE;text-shadow:0 0 12px rgba(107,140,174,0.6);}

  /* LOG PICKER */
  .log-picker-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.88);z-index:200;display:flex;align-items:flex-end;}
  .log-picker-sheet{background:var(--deep);border-top:1px solid rgba(255,255,255,0.08);width:100%;max-width:430px;margin:0 auto;padding:28px 20px 48px;border-radius:4px 4px 0 0;}
  .log-picker-title{font-family:var(--fd);font-size:22px;font-weight:300;color:var(--white);margin-bottom:16px;padding:0 4px;}
  .log-picker-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;}
  .log-picker-btn{background:var(--stone);border:1px solid rgba(255,255,255,0.08);border-radius:3px;padding:18px 16px;cursor:pointer;text-align:left;transition:all 0.2s;position:relative;overflow:hidden;}
  .log-picker-btn::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--acc,var(--gold));opacity:0;transition:opacity 0.2s;}
  .log-picker-btn:hover::before{opacity:1;}
  .log-picker-label{font-family:var(--fd);font-size:19px;font-weight:300;color:var(--white);}
  .log-picker-sub{font-size:8px;letter-spacing:0.18em;color:var(--warm-gray);text-transform:uppercase;margin-top:5px;}
  .log-picker-swim{background:rgba(107,140,174,0.07);border:1px solid rgba(107,140,174,0.2);border-radius:3px;padding:16px 18px;cursor:pointer;width:100%;text-align:left;transition:all 0.2s;}
  .log-picker-swim:hover{background:rgba(107,140,174,0.14);}
  .log-picker-swim-label{font-family:var(--fd);font-size:19px;font-weight:300;color:var(--white);}
  .log-picker-swim-sub{font-size:8px;letter-spacing:0.18em;color:rgba(107,140,174,0.7);text-transform:uppercase;margin-top:4px;}
  .log-picker-cancel{width:100%;background:none;border:1px solid rgba(255,255,255,0.08);border-radius:3px;padding:14px;color:var(--ash);font-family:var(--fb);font-size:9px;letter-spacing:0.2em;text-transform:uppercase;cursor:pointer;margin-top:10px;}

  /* DATE ROW */
  .date-row{display:flex;align-items:center;gap:10px;padding:0 16px;margin-bottom:16px;}
  .date-label{font-size:9px;letter-spacing:0.25em;color:var(--warm-gray);text-transform:uppercase;flex-shrink:0;}
  .date-input{flex:1;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.14);border-radius:3px;padding:10px 14px;color:var(--white);font-family:var(--fb);font-size:12px;outline:none;transition:border-color 0.2s;}
  .date-input:focus{border-color:rgba(255,255,255,0.4);}

  /* EXERCISE BLOCK */
  .exblock{margin:0 16px 14px;background:var(--stone);border:1px solid rgba(255,255,255,0.07);border-radius:3px;overflow:hidden;}
  .exhdr{padding:16px 20px 12px;border-bottom:1px solid rgba(255,255,255,0.06);}
  .exhdr-top{display:flex;justify-content:space-between;align-items:center;gap:12px;}
  .exname{font-family:var(--fd);font-size:19px;font-weight:400;color:var(--white);}
  .rrbadge{font-size:8px;letter-spacing:0.15em;color:var(--gold);border:1px solid rgba(201,168,76,0.3);padding:3px 9px;border-radius:2px;text-transform:uppercase;white-space:nowrap;flex-shrink:0;}
  .prev-log-note{font-family:var(--fd);font-style:italic;font-size:12px;color:var(--ash);margin-top:8px;line-height:1.5;}
  .warmup-btn{font-size:8px;letter-spacing:0.15em;text-transform:uppercase;border-radius:2px;padding:4px 10px;cursor:pointer;transition:all 0.2s;font-family:var(--fb);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.25);background:none;}
  .warmup-btn.active{border-color:rgba(201,168,76,0.5);color:var(--gold);background:rgba(201,168,76,0.08);}

  /* SETS */
  .sets-area{padding:14px 20px 16px;}
  .set-row{display:flex;align-items:center;gap:8px;margin-bottom:8px;}
  .set-num{font-size:9px;letter-spacing:0.15em;color:var(--warm-gray);width:18px;text-align:center;flex-shrink:0;}
  .sinput{flex:1;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.18);border-radius:2px;padding:11px 10px;color:var(--white);font-family:var(--fb);font-size:14px;text-align:center;outline:none;transition:border-color 0.2s,background 0.2s;min-width:0;}
  .sinput:focus{border-color:rgba(255,255,255,0.55);background:rgba(255,255,255,0.11);}
  .sinput::placeholder{color:rgba(255,255,255,0.25);font-size:10px;}
  .sinput.committed{border-color:rgba(201,168,76,0.4);color:var(--gold);background:rgba(201,168,76,0.07);}
  .sinput.committed:focus{border-color:rgba(255,255,255,0.55);background:rgba(255,255,255,0.11);color:var(--white);}
  .del-set-btn{width:28px;height:28px;background:none;border:none;cursor:pointer;color:rgba(255,255,255,0.2);font-size:16px;display:flex;align-items:center;justify-content:center;transition:color 0.2s;flex-shrink:0;}
  .del-set-btn:hover{color:var(--red);}
  .add-set-btn{width:100%;background:rgba(255,255,255,0.03);border:1px dashed rgba(255,255,255,0.12);border-radius:2px;padding:9px;color:rgba(255,255,255,0.3);font-family:var(--fb);font-size:9px;letter-spacing:0.22em;text-transform:uppercase;cursor:pointer;transition:all 0.2s;margin-top:6px;}
  .add-set-btn:hover{border-color:rgba(201,168,76,0.4);color:var(--gold);}

  /* SAVE */
  .save-btn{display:block;width:calc(100% - 32px);margin:16px 16px 8px;background:var(--gold);border:none;border-radius:3px;padding:18px 24px;color:var(--black);font-family:var(--fb);font-size:10px;letter-spacing:0.3em;text-transform:uppercase;cursor:pointer;transition:all 0.2s;text-align:center;font-weight:400;}
  .save-btn:hover{background:var(--white);}
  .save-btn.saved{background:rgba(201,168,76,0.15);border:1px solid rgba(201,168,76,0.4);color:var(--gold);cursor:default;}
  .delete-session-btn{display:block;width:calc(100% - 32px);margin:4px 16px 8px;background:none;border:1px solid rgba(139,64,64,0.3);border-radius:3px;padding:14px 24px;color:rgba(139,64,64,0.7);font-family:var(--fb);font-size:9px;letter-spacing:0.28em;text-transform:uppercase;cursor:pointer;transition:all 0.2s;text-align:center;}
  .delete-session-btn:hover{border-color:var(--red);color:var(--red);}

  /* SWIM LOG FORM */
  .swim-form-wrap{padding:0 16px;}
  .swim-dist-input{width:100%;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.18);border-radius:3px;padding:20px;color:var(--white);font-family:var(--fd);font-size:48px;font-weight:300;outline:none;text-align:center;transition:border-color 0.2s,background 0.2s;margin-bottom:8px;}
  .swim-dist-input:focus{border-color:rgba(107,140,174,0.6);background:rgba(107,140,174,0.06);}
  .swim-dist-input::placeholder{color:rgba(255,255,255,0.15);font-size:24px;}
  .swim-dist-label{text-align:center;font-size:9px;letter-spacing:0.25em;color:var(--ash);text-transform:uppercase;margin-bottom:24px;}
  .swim-this-week{margin-top:24px;}
  .swim-week-item{display:flex;justify-content:space-between;align-items:center;padding:13px 0;border-bottom:1px solid rgba(255,255,255,0.05);}
  .swim-week-date{font-size:10px;letter-spacing:0.1em;color:var(--warm-gray);}
  .swim-week-dist{font-family:var(--fd);font-size:17px;color:var(--parchment);}
  .swim-week-del{background:none;border:none;color:rgba(255,255,255,0.2);cursor:pointer;font-size:12px;padding:4px 8px;transition:color 0.2s;}
  .swim-week-del:hover{color:var(--red);}

  /* TOAST */
  .toast{position:fixed;top:24px;left:50%;transform:translateX(-50%);background:var(--stone);border:1px solid rgba(201,168,76,0.4);border-radius:3px;padding:12px 24px;font-family:var(--fd);font-style:italic;font-size:14px;color:var(--gold);z-index:300;animation:toastIn 0.3s ease;white-space:nowrap;}
  @keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(-8px);}to{opacity:1;transform:translateX(-50%) translateY(0);}}

  /* PROGRESS BAR */
  .pbar-wrap{margin:16px 0 0;height:2px;background:rgba(255,255,255,0.06);border-radius:2px;overflow:hidden;}
  .pbar-fill{height:100%;background:linear-gradient(90deg,var(--sepia),var(--gold));border-radius:2px;transition:width 0.6s cubic-bezier(0.4,0,0.2,1);}
  .pbar-fill.done{animation:gGlow 2s ease-in-out infinite;}
  @keyframes gGlow{0%,100%{box-shadow:0 0 6px var(--gold-glow);}50%{box-shadow:0 0 20px var(--gold-glow),0 0 40px rgba(201,168,76,0.12);}}
  .glow-msg{text-align:center;font-family:var(--fd);font-style:italic;font-size:14px;color:var(--gold);margin-top:10px;animation:fadeUp 0.8s ease;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(5px);}to{opacity:1;transform:none;}}

  /* WATER */
  .water-wrap{padding:24px 20px;}
  .water-big{font-family:var(--fd);font-size:68px;font-weight:300;text-align:center;line-height:1;}
  .water-unit-label{font-size:11px;color:var(--ash);letter-spacing:0.25em;text-align:center;margin-top:4px;text-transform:uppercase;}
  .water-goal-label{font-size:9px;color:var(--warm-gray);letter-spacing:0.18em;text-align:center;margin-top:6px;text-transform:uppercase;}
  .quick-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:24px 0 14px;}
  .qbtn{background:var(--stone);border:1px solid rgba(255,255,255,0.1);border-radius:3px;padding:15px 8px;cursor:pointer;transition:all 0.2s;text-align:center;}
  .qbtn:hover{border-color:rgba(201,168,76,0.4);background:rgba(201,168,76,0.05);}
  .qbtn-label{font-size:7px;letter-spacing:0.2em;color:var(--warm-gray);text-transform:uppercase;margin-bottom:5px;}
  .qbtn-val{font-family:var(--fb);font-size:13px;color:var(--white);}
  .custom-row{display:flex;gap:8px;}
  .winput{flex:1;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.18);border-radius:3px;padding:14px 16px;color:var(--white);font-family:var(--fd);font-size:22px;outline:none;transition:border-color 0.2s,background 0.2s;}
  .winput:focus{border-color:rgba(255,255,255,0.45);background:rgba(255,255,255,0.1);}
  .winput::placeholder{color:rgba(255,255,255,0.22);font-size:14px;font-family:var(--fb);}
  .add-btn{background:var(--gold);border:none;border-radius:3px;padding:14px 22px;color:var(--black);font-family:var(--fb);font-size:10px;letter-spacing:0.2em;text-transform:uppercase;cursor:pointer;transition:all 0.2s;font-weight:400;}
  .add-btn:hover{background:var(--white);}
  .wlog-list{margin-top:24px;}
  .wlog-item{display:flex;justify-content:space-between;align-items:center;padding:13px 0;border-bottom:1px solid rgba(255,255,255,0.05);}
  .wlog-time{font-size:10px;letter-spacing:0.1em;color:var(--warm-gray);}
  .wlog-amt{font-family:var(--fd);font-size:17px;color:var(--parchment);}
  .delbtn{background:none;border:none;color:rgba(255,255,255,0.2);cursor:pointer;font-size:12px;padding:4px 8px;transition:color 0.2s;}
  .delbtn:hover{color:var(--red);}

  /* BODY WEIGHT */
  .bw-row{display:flex;gap:8px;padding:0 16px;margin-bottom:20px;}
  .bwinput{flex:1;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.18);border-radius:3px;padding:16px;color:var(--white);font-family:var(--fd);font-size:26px;outline:none;text-align:center;transition:border-color 0.2s;}
  .bwinput:focus{border-color:rgba(255,255,255,0.45);}
  .bwinput::placeholder{color:rgba(255,255,255,0.22);font-size:14px;font-family:var(--fb);}
  .logbtn{background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.18);border-radius:3px;padding:16px 20px;color:var(--white);font-family:var(--fb);font-size:9px;letter-spacing:0.22em;text-transform:uppercase;cursor:pointer;transition:all 0.2s;}
  .logbtn:hover{background:rgba(255,255,255,0.12);}

  /* CHART */
  .chart-wrap{padding:0 16px 8px;}
  .chart-svg{width:100%;overflow:visible;}

  /* HISTORY */
  .week-header{padding:20px 24px 8px;font-size:9px;letter-spacing:0.28em;color:var(--warm-gray);text-transform:uppercase;}
  .history-row-wrap{position:relative;overflow:hidden;}
  .history-row{display:flex;justify-content:space-between;align-items:center;padding:15px 24px;border-bottom:1px solid rgba(255,255,255,0.04);cursor:pointer;transition:transform 0.25s ease,background 0.2s;background:var(--black);position:relative;z-index:1;}
  .history-row:hover{background:rgba(255,255,255,0.02);}
  .history-row.swiped{transform:translateX(-80px);}
  .history-del-reveal{position:absolute;right:0;top:0;bottom:0;width:80px;background:var(--red);display:flex;align-items:center;justify-content:center;cursor:pointer;font-family:var(--fb);font-size:9px;letter-spacing:0.15em;text-transform:uppercase;color:var(--white);z-index:0;}
  .history-row-title{font-family:var(--fd);font-size:17px;color:var(--white);}
  .history-row-meta{font-size:9px;color:var(--warm-gray);letter-spacing:0.12em;margin-top:3px;}

  /* PROGRESS */
  .prog-day-header{padding:20px 24px 8px;display:flex;align-items:center;gap:10px;cursor:pointer;}
  .prog-day-title{font-family:var(--fd);font-size:20px;font-weight:300;color:var(--white);}
  .prog-day-toggle{font-size:10px;color:var(--warm-gray);margin-left:auto;}
  .prog-ex-item{padding:14px 24px;border-bottom:1px solid rgba(255,255,255,0.04);}
  .prog-ex-name{font-family:var(--fd);font-size:16px;color:var(--parchment);margin-bottom:6px;}

  /* UTIL */
  .primary-btn{display:block;width:calc(100% - 32px);margin:0 16px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:3px;padding:16px 24px;color:rgba(255,255,255,0.5);font-family:var(--fb);font-size:9px;letter-spacing:0.28em;text-transform:uppercase;cursor:pointer;transition:all 0.2s;text-align:center;}
  .primary-btn:hover{border-color:rgba(201,168,76,0.4);color:var(--gold);}
  .divider{height:1px;background:rgba(255,255,255,0.05);margin:20px 0;}
  .back-btn{background:none;border:none;color:var(--ash);font-family:var(--fb);font-size:9px;letter-spacing:0.22em;cursor:pointer;margin-bottom:10px;padding:0;text-transform:uppercase;display:block;}
  .empty{text-align:center;padding:44px 24px;color:var(--warm-gray);font-family:var(--fd);font-style:italic;font-size:16px;}
  .overlay{position:fixed;inset:0;background:rgba(0,0,0,0.88);z-index:200;display:flex;align-items:flex-end;}
  .sheet{background:var(--deep);border-top:1px solid rgba(255,255,255,0.08);width:100%;max-width:430px;margin:0 auto;padding:32px 24px 48px;border-radius:4px 4px 0 0;}
  .sheet-title{font-family:var(--fd);font-size:26px;font-weight:300;color:var(--white);margin-bottom:8px;}
  .sheet-sub{font-size:11px;color:var(--warm-gray);letter-spacing:0.1em;margin-bottom:24px;line-height:1.6;}
  .minput{width:100%;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.18);border-radius:3px;padding:14px 16px;color:var(--white);font-family:var(--fb);font-size:14px;outline:none;margin-bottom:10px;transition:border-color 0.2s;}
  .minput:focus{border-color:rgba(255,255,255,0.45);}
  .mactions{display:flex;gap:8px;margin-top:10px;}
  .mcancel{flex:1;background:none;border:1px solid rgba(255,255,255,0.1);border-radius:3px;padding:14px;color:var(--ash);font-family:var(--fb);font-size:9px;letter-spacing:0.2em;text-transform:uppercase;cursor:pointer;}
  .mconfirm{flex:1;background:var(--gold);border:none;border-radius:3px;padding:14px;color:var(--black);font-family:var(--fb);font-size:9px;letter-spacing:0.2em;text-transform:uppercase;cursor:pointer;}
  .mdelete{flex:1;background:var(--red);border:none;border-radius:3px;padding:14px;color:var(--white);font-family:var(--fb);font-size:9px;letter-spacing:0.2em;text-transform:uppercase;cursor:pointer;}
  .warmup-set{padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);font-family:var(--fd);font-size:17px;color:var(--white);}
  .warmup-set:last-child{border-bottom:none;}
  .warmup-aside{font-size:12px;color:var(--ash);margin-left:8px;}
`;

function Toast({ message, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2200); return () => clearTimeout(t); }, []);
  return <div className="toast">{message}</div>;
}

function LineChart({ data, color = "#c9a84c", height = 120 }) {
  if (!data || data.length < 2) return <div className="empty">Not enough data yet</div>;
  const vals = data.map(d => d.value), min = Math.min(...vals), max = Math.max(...vals), range = max - min || 1;
  const W = 360, pad = 24;
  const pts = data.map((d, i) => ({ x: pad + (i / (data.length - 1)) * (W - pad * 2), y: height - pad - ((d.value - min) / range) * (height - pad * 2), label: d.label, value: d.value }));
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const area = `${path} L ${pts[pts.length-1].x} ${height} L ${pts[0].x} ${height} Z`;
  const gid = `g${Math.abs(color.split("").reduce((a, c) => a + c.charCodeAt(0), 0))}`;
  return (
    <svg viewBox={`0 0 ${W} ${height}`} className="chart-svg">
      <defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.18"/><stop offset="100%" stopColor={color} stopOpacity="0"/></linearGradient></defs>
      <path d={area} fill={`url(#${gid})`}/><path d={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      {pts.map((p, i) => (
        <g key={i}><circle cx={p.x} cy={p.y} r="3" fill={color}/>
          {i === pts.length - 1 && <><circle cx={p.x} cy={p.y} r="5.5" fill="none" stroke={color} strokeWidth="1" opacity="0.35"/><text x={p.x} y={p.y - 11} textAnchor="middle" fill={color} fontSize="10" fontFamily="'Josefin Sans',sans-serif">{p.value}</text></>}
          <text x={p.x} y={height - 3} textAnchor="middle" fill="#5a5548" fontSize="8" fontFamily="'Josefin Sans',sans-serif">{p.label}</text>
        </g>
      ))}
    </svg>
  );
}

function SetInput({ value, placeholder, onChange }) {
  const [local, setLocal] = useState(value);
  const [focused, setFocused] = useState(false);
  const committed = !focused && local !== "" && local !== undefined;
  useEffect(() => { if (!focused) setLocal(value); }, [value, focused]);
  return (
    <input className={`sinput${committed ? " committed" : ""}`} type="number" placeholder={placeholder}
      value={local} onChange={e => { setLocal(e.target.value); onChange(e.target.value); }}
      onFocus={() => setFocused(true)} onBlur={() => { setFocused(false); onChange(local); }}/>
  );
}

// Swipeable history row
function SwipeableRow({ children, onDelete }) {
  const [swiped, setSwiped] = useState(false);
  const startX = useRef(null);
  return (
    <div className="history-row-wrap">
      <div className={`history-row${swiped ? " swiped" : ""}`}
        onTouchStart={e => { startX.current = e.touches[0].clientX; }}
        onTouchEnd={e => { const dx = startX.current - e.changedTouches[0].clientX; if (dx > 60) setSwiped(true); else if (dx < -20) setSwiped(false); }}
        onClick={() => { if (swiped) { setSwiped(false); } }}>
        {children}
      </div>
      {swiped && <div className="history-del-reveal" onClick={onDelete}>Delete</div>}
    </div>
  );
}

// ── SWIM LOG FORM ─────────────────────────────────────────────────────────────
function SwimLogForm({ swimLogs, setSwimLogs, onBack, weekKey }) {
  const td = today();
  const [date, setDate] = useState(td);
  const [dist, setDist] = useState("");
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState(null);
  const thisWeekSwims = swimLogs.filter(s => getWeekKey(s.date) === weekKey).sort((a, b) => b.date.localeCompare(a.date));

  const logSwim = () => {
    const n = Number(dist); if (!n || n <= 0) return;
    setSwimLogs(prev => [...prev, { id: Date.now(), date, weekKey: getWeekKey(date), distance: n }]);
    setDist(""); setSaved(true); setToast("Swim logged ✦");
  };

  const deleteSwim = (id) => setSwimLogs(prev => prev.filter(s => s.id !== id));

  return (
    <div className="screen">
      {toast && <Toast message={toast} onDone={() => setToast(null)}/>}
      <div className="hdr">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div className="hdr-title">Swimming</div>
        <div className="hdr-sub">Log a session</div>
      </div>
      <div className="date-row">
        <span className="date-label">Date</span>
        <input type="date" className="date-input" value={date} onChange={e => { setDate(e.target.value); setSaved(false); }}/>
      </div>
      <div className="swim-form-wrap">
        <input className="swim-dist-input" type="number" placeholder="0" value={dist} onChange={e => { setDist(e.target.value); setSaved(false); }}/>
        <div className="swim-dist-label">yards</div>
        <button className={`save-btn${saved ? " saved" : ""}`} onClick={!saved ? logSwim : undefined}>
          {saved ? "✓ Logged" : "Log Swim"}
        </button>
        {thisWeekSwims.length > 0 && (
          <div className="swim-this-week">
            <div style={{ fontSize: 9, letterSpacing: "0.28em", color: "var(--warm-gray)", textTransform: "uppercase", marginBottom: 10, marginTop: 8 }}>This Week</div>
            {thisWeekSwims.map((s, i) => (
              <div className="swim-week-item" key={s.id || i}>
                <div className="swim-week-date">{formatDate(s.date)}</div>
                <div className="swim-week-dist">{s.distance} yd</div>
                <button className="swim-week-del" onClick={() => deleteSwim(s.id)}>✕</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── SESSION FORM ──────────────────────────────────────────────────────────────
function SessionForm({ initialDraft, workouts, swimLogs, setSwimLogs, onSave, onDelete, onBack, isEdit }) {
  const [draft, setDraft] = useState(() => JSON.parse(JSON.stringify(initialDraft)));
  const [saved, setSaved] = useState(isEdit);
  const [showCustom, setShowCustom] = useState(false);
  const [customName, setCustomName] = useState(""), [customRep, setCustomRep] = useState("");
  const [toast, setToast] = useState(null);
  const [warmupEx, setWarmupEx] = useState(null);
  const [confirmDel, setConfirmDel] = useState(false);

  const prevSession = workouts.filter(w => w.type === draft.type && w.date < draft.date).sort((a, b) => b.date.localeCompare(a.date))[0];
  const getPrevLastSet = (exName) => { const sets = prevSession?.exercises?.[exName]?.sets?.filter(s => s.weight || s.reps); return sets?.length ? sets[sets.length - 1] : null; };

  const updateSet = (exName, idx, field, value) => {
    setDraft(prev => { const sets = [...(prev.exercises[exName]?.sets || [])]; sets[idx] = { ...sets[idx], [field]: value }; return { ...prev, exercises: { ...prev.exercises, [exName]: { ...prev.exercises[exName], sets } } }; });
    setSaved(false);
  };
  const addSet = (exName) => { setDraft(prev => { const sets = [...(prev.exercises[exName]?.sets || []), { weight: "", reps: "" }]; return { ...prev, exercises: { ...prev.exercises, [exName]: { ...prev.exercises[exName], sets } } }; }); setSaved(false); };
  const deleteSet = (exName, idx) => { setDraft(prev => { const sets = (prev.exercises[exName]?.sets || []).filter((_, i) => i !== idx); return { ...prev, exercises: { ...prev.exercises, [exName]: { ...prev.exercises[exName], sets } } }; }); setSaved(false); };
  const addCustom = () => { if (!customName.trim()) return; setDraft(prev => ({ ...prev, exercises: { ...prev.exercises, [customName]: { repRange: customRep, sets: [] } } })); setCustomName(""); setCustomRep(""); setShowCustom(false); setSaved(false); };
  const saveSession = () => { onSave(draft); setSaved(true); setToast("Session saved ✦"); };

  const exercises = draft.exercises || {};

  return (
    <div className="screen">
      {toast && <Toast message={toast} onDone={() => setToast(null)}/>}
      <div className="hdr">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div className="hdr-title">{WORKOUT_DAYS[draft.type]?.label}</div>
        <div className="hdr-sub">{isEdit ? "Editing session" : "New session"}</div>
      </div>
      <div className="date-row">
        <span className="date-label">Date</span>
        <input type="date" className="date-input" value={draft.date} onChange={e => { setDraft(p => ({ ...p, date: e.target.value, weekKey: getWeekKey(e.target.value) })); setSaved(false); }}/>
      </div>

      {Object.entries(exercises).map(([exName, exData]) => {
        const prevSet = getPrevLastSet(exName);
        const firstW = parseFloat((exData.sets || [])[0]?.weight);
        const canWarmup = WARMUP_EXERCISES.includes(exName) && !isNaN(firstW) && firstW > 0;
        return (
          <div className="exblock" key={exName}>
            <div className="exhdr">
              <div className="exhdr-top">
                <div className="exname">{exName}</div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                  {WARMUP_EXERCISES.includes(exName) && <button className={`warmup-btn${canWarmup ? " active" : ""}`} onClick={() => canWarmup && setWarmupEx({ name: exName, weight: firstW })}>Warm-up</button>}
                  {exData.repRange && <div className="rrbadge">{exData.repRange} reps</div>}
                </div>
              </div>
              {prevSet && <div className="prev-log-note">Last session — {prevSet.weight ? `${prevSet.weight} lbs` : ""}{prevSet.reps ? ` × ${prevSet.reps}` : ""}</div>}
            </div>
            <div className="sets-area">
              {(exData.sets || []).map((set, idx) => (
                <div className="set-row" key={idx}>
                  <div className="set-num">{idx + 1}</div>
                  <SetInput value={set.weight} placeholder="lbs" onChange={v => updateSet(exName, idx, "weight", v)}/>
                  <SetInput value={set.reps} placeholder="reps" onChange={v => updateSet(exName, idx, "reps", v)}/>
                  <button className="del-set-btn" onClick={() => deleteSet(exName, idx)}>×</button>
                </div>
              ))}
              <button className="add-set-btn" onClick={() => addSet(exName)}>+ Add Set</button>
            </div>
          </div>
        );
      })}

      <button className="primary-btn" style={{ marginTop: 8 }} onClick={() => setShowCustom(true)}>+ Custom Exercise</button>
      <button className={`save-btn${saved ? " saved" : ""}`} onClick={!saved ? saveSession : undefined} style={{ marginTop: 16 }}>{saved ? "✓ Session Saved" : "Save Session"}</button>
      {isEdit && <button className="delete-session-btn" onClick={() => setConfirmDel(true)}>Delete Session</button>}

      {warmupEx && (
        <div className="overlay" onClick={() => setWarmupEx(null)}>
          <div className="sheet" onClick={e => e.stopPropagation()}>
            <div className="sheet-title">Warm-up — {warmupEx.name}</div>
            <div className="sheet-sub">Working weight: {warmupEx.weight} lbs</div>
            {getWarmupSets(warmupEx.name, warmupEx.weight).map((s, i) => (
              <div className="warmup-set" key={i}>{i + 1}. {s.reps} × {fmtW(s.weight)} lbs
                {BARBELL_EXERCISES.includes(warmupEx.name) && <span className="warmup-aside">{s.bar ? "(Bar)" : `(${fmtW(s.aside)} lbs a-side)`}</span>}
              </div>
            ))}
            <div className="mactions" style={{ marginTop: 24 }}><button className="mconfirm" onClick={() => setWarmupEx(null)}>Got it</button></div>
          </div>
        </div>
      )}
      {showCustom && (
        <div className="overlay" onClick={() => setShowCustom(false)}>
          <div className="sheet" onClick={e => e.stopPropagation()}>
            <div className="sheet-title">Custom Exercise</div>
            <input className="minput" type="text" placeholder="Exercise name" value={customName} onChange={e => setCustomName(e.target.value)}/>
            <input className="minput" type="text" placeholder="Rep range (e.g. 8-10)" value={customRep} onChange={e => setCustomRep(e.target.value)}/>
            <div className="mactions"><button className="mcancel" onClick={() => setShowCustom(false)}>Cancel</button><button className="mconfirm" onClick={addCustom}>Add</button></div>
          </div>
        </div>
      )}
      {confirmDel && (
        <div className="overlay" onClick={() => setConfirmDel(false)}>
          <div className="sheet" onClick={e => e.stopPropagation()}>
            <div className="sheet-title">Delete Session</div>
            <div className="sheet-sub">{WORKOUT_DAYS[draft.type]?.label} · {formatDate(draft.date)}{"\n"}This cannot be undone.</div>
            <div className="mactions"><button className="mcancel" onClick={() => setConfirmDel(false)}>Cancel</button><button className="mdelete" onClick={() => { onDelete(draft); setConfirmDel(false); }}>Delete</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── HOME ──────────────────────────────────────────────────────────────────────
function HomeScreen({ workouts, bodyWeights, waterLogs, swimLogs, onOpenLog, onDeleteWorkout, onOpenSwim }) {
  const td = today();
  const weekKey = getWeekKey(td);
  const todayWater = waterLogs.filter(l => l.date === td).reduce((s, l) => s + l.amount, 0);
  const todayWeight = bodyWeights.find(b => b.date === td);
  const waterPct = Math.min(100, (todayWater / 3000) * 100);
  const quote = getDailyQuote();
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [longPressTimer, setLongPressTimer] = useState(null);
  const thisWeek = workouts.filter(w => getWeekKey(w.date) === weekKey);
  const thisWeekSwims = swimLogs.filter(s => getWeekKey(s.date) === weekKey);
  const allFiveLogged = DAY_ORDER.every(k => thisWeek.find(w => w.type === k)) && thisWeekSwims.length > 0;

  const handleLongPress = (logged, key) => {
    if (!logged) return;
    const t = setTimeout(() => setConfirmDelete(logged), 600);
    setLongPressTimer(t);
  };
  const cancelLongPress = () => { if (longPressTimer) { clearTimeout(longPressTimer); setLongPressTimer(null); } };

  return (
    <div className="screen">
      <div className="hdr">
        <div className="hdr-label">{getGreeting()}</div>
        <div className="hdr-title">Jiang</div>
        <div className="hdr-sub">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</div>
      </div>
      <div className="quote"><div className="quote-text">"{quote.text}"</div><div className="quote-src">— {quote.source}</div></div>

      <div className="slabel">Today at a Glance</div>
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 9, letterSpacing: "0.25em", color: "var(--warm-gray)", textTransform: "uppercase" }}>Hydration</div>
          <div style={{ fontFamily: "var(--fd)", fontSize: 20, color: waterPct >= 100 ? "var(--gold)" : "var(--white)" }}>{todayWater} <span style={{ fontSize: 12, color: "var(--ash)" }}>/ 3000 ml</span></div>
        </div>
        <div className="pbar-wrap" style={{ margin: 0 }}><div className={`pbar-fill${waterPct >= 100 ? " done" : ""}`} style={{ width: `${waterPct}%` }}/></div>
        {waterPct >= 100 && <div className="glow-msg">Goal achieved, Jiang ✦</div>}
      </div>
      {todayWeight && (
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 9, letterSpacing: "0.25em", color: "var(--warm-gray)", textTransform: "uppercase" }}>Body Weight</div>
            <div style={{ fontFamily: "var(--fd)", fontSize: 24, color: "var(--white)" }}>{todayWeight.weight} <span style={{ fontSize: 12, color: "var(--ash)" }}>lbs</span></div>
          </div>
        </div>
      )}

      <div className="slabel">This Week's Battle Plan</div>
      <div className={`bp-wrap${allFiveLogged ? " complete" : ""}`}>
        {allFiveLogged && <div className="bp-complete-label">✦ Week Complete — Forged in Full ✦</div>}
        <div className="bp-grid">
          {DAY_ORDER.map(key => {
            const val = WORKOUT_DAYS[key];
            const logged = thisWeek.find(w => w.type === key);
            return (
              <div key={key}
                className={`bp-card${logged ? " logged" : " empty"}`}
                onClick={() => { cancelLongPress(); onOpenLog(key, logged || null); }}
                onTouchStart={() => handleLongPress(logged, key)}
                onTouchEnd={cancelLongPress}
                onMouseDown={() => handleLongPress(logged, key)}
                onMouseUp={cancelLongPress}
                onMouseLeave={cancelLongPress}>
                <div className="bp-label">{val.label}</div>
                <div className="bp-meta">{logged ? formatDate(logged.date) : "Not logged"}</div>
                <span className="bp-icon">{logged ? "✦" : "+"}</span>
              </div>
            );
          })}
        </div>
        <div className="swim-panel" onClick={onOpenSwim}>
          <div className="swim-panel-left">
            <div className="swim-panel-title">Swimming</div>
            <div className="swim-panel-meta">{thisWeekSwims.length > 0 ? `${thisWeekSwims.length} session${thisWeekSwims.length > 1 ? "s" : ""} this week` : "Not logged this week"}</div>
          </div>
          <span className={`swim-star${thisWeekSwims.length > 0 ? " lit" : ""}`}>✦</span>
        </div>
      </div>

      {confirmDelete && (
        <div className="overlay" onClick={() => setConfirmDelete(null)}>
          <div className="sheet" onClick={e => e.stopPropagation()}>
            <div className="sheet-title">Delete Session</div>
            <div className="sheet-sub">{WORKOUT_DAYS[confirmDelete.type]?.label} · {formatDate(confirmDelete.date)}{"\n"}This cannot be undone.</div>
            <div className="mactions"><button className="mcancel" onClick={() => setConfirmDelete(null)}>Cancel</button><button className="mdelete" onClick={() => { onDeleteWorkout(confirmDelete); setConfirmDelete(null); }}>Delete</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── HISTORY ───────────────────────────────────────────────────────────────────
function HistoryScreen({ workouts, setWorkouts, swimLogs, setSwimLogs }) {
  const [editing, setEditing] = useState(null);
  const [editingSwim, setEditingSwim] = useState(false);

  if (editingSwim) return <SwimLogForm swimLogs={swimLogs} setSwimLogs={setSwimLogs} onBack={() => setEditingSwim(false)} weekKey={getWeekKey(today())}/>;

  if (editing) {
    return (
      <SessionForm
        initialDraft={editing} workouts={workouts} swimLogs={swimLogs} setSwimLogs={setSwimLogs}
        onSave={(draft) => { setWorkouts(prev => { const f = prev.filter(w => !(w.date === editing.date && w.type === editing.type)); return [...f, draft]; }); setEditing(draft); }}
        onDelete={(draft) => { setWorkouts(prev => prev.filter(w => !(w.date === draft.date && w.type === draft.type))); setEditing(null); }}
        onBack={() => setEditing(null)} isEdit={true}
      />
    );
  }

  const sorted = [...workouts].sort((a, b) => b.date.localeCompare(a.date));
  const allSwimSorted = [...swimLogs].sort((a, b) => b.date.localeCompare(a.date));
  const byWeek = {};
  sorted.forEach(w => { const wk = getWeekKey(w.date); if (!byWeek[wk]) byWeek[wk] = { workouts: [], swims: [] }; byWeek[wk].workouts.push(w); });
  allSwimSorted.forEach(s => { const wk = getWeekKey(s.date); if (!byWeek[wk]) byWeek[wk] = { workouts: [], swims: [] }; byWeek[wk].swims.push(s); });
  const weekKeys = Object.keys(byWeek).sort((a, b) => b.localeCompare(a));

  if (!weekKeys.length) return (
    <div className="screen"><div className="hdr"><div className="hdr-label">Archive</div><div className="hdr-title">History</div></div><div className="empty">No sessions logged yet</div></div>
  );

  return (
    <div className="screen">
      <div className="hdr"><div className="hdr-label">Archive</div><div className="hdr-title">History</div></div>
      {weekKeys.map(wk => (
        <div key={wk}>
          <div className="week-header">{getWeekLabel(wk)}</div>
          {byWeek[wk].workouts.map((w, i) => (
            <SwipeableRow key={i} onDelete={() => setWorkouts(prev => prev.filter(s => !(s.date === w.date && s.type === w.type)))}>
              <div style={{ flex: 1 }} onClick={() => setEditing(JSON.parse(JSON.stringify(w)))}>
                <div className="history-row-title">{WORKOUT_DAYS[w.type]?.label}</div>
                <div className="history-row-meta">{formatDate(w.date)} · {Object.keys(w.exercises || {}).length} exercises</div>
              </div>
              <span style={{ color: "var(--warm-gray)", fontSize: 14 }}>›</span>
            </SwipeableRow>
          ))}
          {byWeek[wk].swims.map((s, i) => (
            <SwipeableRow key={`swim-${i}`} onDelete={() => setSwimLogs(prev => prev.filter(sl => sl.id !== s.id))}>
              <div style={{ flex: 1 }}>
                <div className="history-row-title" style={{ color: "var(--blue)" }}>Swimming</div>
                <div className="history-row-meta">{formatDate(s.date)} · {s.distance} yd</div>
              </div>
            </SwipeableRow>
          ))}
        </div>
      ))}
    </div>
  );
}

// ── WATER ─────────────────────────────────────────────────────────────────────
function WaterScreen({ waterLogs, setWaterLogs }) {
  const td = today();
  const [custom, setCustom] = useState("");
  const todayLogs = waterLogs.filter(l => l.date === td);
  const total = todayLogs.reduce((s, l) => s + l.amount, 0);
  const pct = Math.min(100, (total / 3000) * 100);
  const freq = {};
  waterLogs.forEach(l => { freq[l.amount] = (freq[l.amount] || 0) + 1; });
  const sortedAmts = Object.entries(freq).sort((a, b) => b[1] - a[1]).map(([a]) => Number(a));
  const quickAmts = sortedAmts.length >= 3 ? sortedAmts.slice(0, 3) : [500, 550, 900];
  const addWater = (amt) => { const n = Number(amt); if (!n || n <= 0) return; setWaterLogs(prev => [...prev, { date: td, amount: n, time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) }]); setCustom(""); };
  const removeLog = (idx) => { const idxs = waterLogs.reduce((acc, l, i) => { if (l.date === td) acc.push(i); return acc; }, []); setWaterLogs(prev => prev.filter((_, i) => i !== idxs[idx])); };

  return (
    <div className="screen">
      <div className="hdr"><div className="hdr-label">Hydration</div><div className="hdr-title">Water</div><div className="hdr-sub">{formatDate(td)}</div></div>
      <div className="water-wrap">
        <div className="water-big" style={{ color: pct >= 100 ? "var(--gold)" : "var(--white)" }}>{total}</div>
        <div className="water-unit-label">ml consumed</div>
        <div className="water-goal-label">Goal: 3,000 ml</div>
        <div className="pbar-wrap"><div className={`pbar-fill${pct >= 100 ? " done" : ""}`} style={{ width: `${pct}%` }}/></div>
        {pct >= 100 && <div className="glow-msg">Hydrated and forged, Jiang ✦</div>}
        <div className="quick-grid">{quickAmts.map((amt, i) => <button key={i} className="qbtn" onClick={() => addWater(amt)}><div className="qbtn-label">Quick</div><div className="qbtn-val">+{amt} ml</div></button>)}</div>
        <div className="custom-row">
          <input className="winput" type="number" placeholder="Custom ml" value={custom} onChange={e => setCustom(e.target.value)} onKeyDown={e => e.key === "Enter" && addWater(custom)}/>
          <button className="add-btn" onClick={() => addWater(custom)}>Add</button>
        </div>
        {todayLogs.length > 0 && (
          <div className="wlog-list">
            <div style={{ fontSize: 9, letterSpacing: "0.28em", color: "var(--warm-gray)", textTransform: "uppercase", marginBottom: 10, marginTop: 24 }}>Today's Log</div>
            {[...todayLogs].reverse().map((l, i) => (
              <div className="wlog-item" key={i}><div className="wlog-time">{l.time}</div><div className="wlog-amt">+{l.amount} ml</div><button className="delbtn" onClick={() => removeLog(todayLogs.length - 1 - i)}>✕</button></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── PROGRESS ──────────────────────────────────────────────────────────────────
function ProgressScreen({ workouts, bodyWeights, setBodyWeights, swimLogs }) {
  const td = today();
  const [bwInput, setBwInput] = useState("");
  const [openDays, setOpenDays] = useState({ legs: true, push: false, pull: false, arms: false });
  const [selEx, setSelEx] = useState(null);
  const todayBw = bodyWeights.find(b => b.date === td);
  const bwChart = [...bodyWeights].sort((a, b) => a.date.localeCompare(b.date)).slice(-12).map(b => ({ value: b.weight, label: formatDate(b.date).split(",")[0] }));
  const logBW = () => { if (!bwInput) return; const idx = bodyWeights.findIndex(b => b.date === td); if (idx >= 0) setBodyWeights(prev => prev.map((b, i) => i === idx ? { ...b, weight: Number(bwInput) } : b)); else setBodyWeights(prev => [...prev, { date: td, weight: Number(bwInput) }]); setBwInput(""); };
  const getExChart = (exName) => workouts.filter(w => w.exercises?.[exName]?.sets?.some(s => s.weight)).sort((a, b) => a.date.localeCompare(b.date)).slice(-8).map(w => { const sets = w.exercises[exName].sets.filter(s => s.weight); return { value: Math.max(...sets.map(s => Number(s.weight))), label: formatDate(w.date).split(",")[0] }; });
  const getPR = (exName) => { const ws = workouts.flatMap(w => (w.exercises?.[exName]?.sets || []).filter(s => s.weight).map(s => Number(s.weight))); return ws.length ? Math.max(...ws) : null; };

  return (
    <div className="screen">
      <div className="hdr"><div className="hdr-label">Growth</div><div className="hdr-title">Progress</div></div>
      <div className="slabel">Body Weight</div>
      <div className="bw-row">
        <input className="bwinput" type="number" step="0.1" placeholder={todayBw ? `${todayBw.weight} lbs today` : "lbs"} value={bwInput} onChange={e => setBwInput(e.target.value)}/>
        <button className="logbtn" onClick={logBW}>Log</button>
      </div>
      {bwChart.length >= 2 && <div className="chart-wrap"><LineChart data={bwChart} color="#c4b99a" height={110}/></div>}
      <div className="divider"/>
      <div className="slabel">Lift Progress</div>
      {DAY_ORDER.map(dayKey => {
        const day = WORKOUT_DAYS[dayKey], isOpen = openDays[dayKey];
        return (
          <div key={dayKey}>
            <div className="prog-day-header" onClick={() => setOpenDays(p => ({ ...p, [dayKey]: !p[dayKey] }))}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: day.color, flexShrink: 0 }}/>
              <div className="prog-day-title">{day.label}</div>
              <div className="prog-day-toggle">{isOpen ? "▲" : "▼"}</div>
            </div>
            {isOpen && day.exercises.map(ex => {
              const chart = getExChart(ex.name), pr = getPR(ex.name), isSel = selEx === ex.name;
              return (
                <div className="prog-ex-item" key={ex.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }} onClick={() => setSelEx(isSel ? null : ex.name)}>
                    <div className="prog-ex-name">{ex.name}</div>
                    {pr && <div style={{ fontFamily: "var(--fd)", fontSize: 16, color: "var(--gold)" }}>PR {pr} lbs</div>}
                  </div>
                  {isSel && <div style={{ marginTop: 12 }}>{chart.length >= 2 ? <LineChart data={chart} color="#c9a84c" height={100}/> : <div style={{ fontSize: 12, color: "var(--warm-gray)", fontStyle: "italic", fontFamily: "var(--fd)", padding: "8px 0" }}>Log at least 2 sessions to see the chart</div>}</div>}
                </div>
              );
            })}
          </div>
        );
      })}
      {swimLogs.length >= 2 && <>
        <div className="divider"/>
        <div className="slabel">Swimming</div>
        <div className="chart-wrap"><LineChart data={[...swimLogs].sort((a,b)=>a.date.localeCompare(b.date)).slice(-8).map(s=>({value:s.distance,label:formatDate(s.date).split(",")[0]}))} color="#6B8CAE" height={110}/></div>
      </>}
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function HerculesApp() {
  const [tab, setTab] = useState("home");
  const [workouts, setWRaw] = useState(() => load("hc_workouts", []));
  const [waterLogs, setWLRaw] = useState(() => load("hc_water", []));
  const [bodyWeights, setBWRaw] = useState(() => load("hc_bw", []));
  const [swimLogs, setSLRaw] = useState(() => load("hc_swim", []));
  const [logContext, setLogContext] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [showSwimLog, setShowSwimLog] = useState(false);

  const p = (key, setter) => (fn) => setter(prev => { const n = typeof fn === "function" ? fn(prev) : fn; save(key, n); return n; });
  const setWorkouts = p("hc_workouts", setWRaw);
  const setWaterLogs = p("hc_water", setWLRaw);
  const setBodyWeights = p("hc_bw", setBWRaw);
  const setSwimLogs = p("hc_swim", setSLRaw);

  const deleteWorkout = (w) => setWorkouts(prev => prev.filter(s => !(s.date === w.date && s.type === w.type)));

  const handleOpenLog = (type, existing) => { setLogContext({ type, existing }); setShowPicker(false); setShowSwimLog(false); setTab("log"); };
  const handleOpenSwim = () => { setShowSwimLog(true); setShowPicker(false); setTab("log"); };

  const nav = [
    { key: "home", label: "Home", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
    { key: "water", label: "Water", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg> },
    { key: "history", label: "History", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
    { key: "progress", label: "Progress", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  ];

  const renderMain = () => {
    if (tab === "log") {
      if (showSwimLog) return <SwimLogForm swimLogs={swimLogs} setSwimLogs={setSwimLogs} onBack={() => { setShowSwimLog(false); setTab("home"); }} weekKey={getWeekKey(today())}/>;
      if (logContext) {
        const { type, existing } = logContext;
        const td = today();
        let draft;
        if (existing) { draft = JSON.parse(JSON.stringify(existing)); }
        else { const exercises = {}; WORKOUT_DAYS[type].exercises.forEach(ex => { exercises[ex.name] = { repRange: ex.repRange, sets: [] }; }); draft = { date: td, weekKey: getWeekKey(td), type, exercises }; }
        return (
          <SessionForm initialDraft={draft} workouts={workouts} swimLogs={swimLogs} setSwimLogs={setSwimLogs}
            onSave={(d) => { setWorkouts(prev => { const f = prev.filter(w => !(w.date === d.date && w.type === d.type)); return [...f, d]; }); }}
            onDelete={(d) => { deleteWorkout(d); setLogContext(null); setTab("home"); }}
            onBack={() => { setLogContext(null); setTab("home"); }} isEdit={!!existing}/>
        );
      }
      setTab("home"); return null;
    }
    if (tab === "home") return <HomeScreen workouts={workouts} bodyWeights={bodyWeights} waterLogs={waterLogs} swimLogs={swimLogs} onOpenLog={handleOpenLog} onDeleteWorkout={deleteWorkout} onOpenSwim={handleOpenSwim}/>;
    if (tab === "water") return <WaterScreen waterLogs={waterLogs} setWaterLogs={setWaterLogs}/>;
    if (tab === "history") return <HistoryScreen workouts={workouts} setWorkouts={setWorkouts} swimLogs={swimLogs} setSwimLogs={setSwimLogs}/>;
    if (tab === "progress") return <ProgressScreen workouts={workouts} bodyWeights={bodyWeights} setBodyWeights={setBodyWeights} swimLogs={swimLogs}/>;
  };

  const isLogActive = tab === "log";

  return (
    <>
      <style>{S}</style>
      <div className="app">
        <div className="grain"/>

        {/* Plus button overlay on home */}
        {tab === "home" && (
          <button className="plus-btn" style={{ position: "fixed", top: 52, right: "max(24px, calc(50vw - 191px))", zIndex: 60 }} onClick={() => setShowPicker(true)}>+</button>
        )}

        {renderMain()}

        {/* Log picker sheet */}
        {showPicker && (
          <div className="log-picker-overlay" onClick={() => setShowPicker(false)}>
            <div className="log-picker-sheet" onClick={e => e.stopPropagation()}>
              <div className="log-picker-title">Log a Session</div>
              <div className="log-picker-grid">
                {DAY_ORDER.map(key => {
                  const val = WORKOUT_DAYS[key];
                  const saved = workouts.find(w => w.date === today() && w.type === key);
                  return (
                    <button key={key} className="log-picker-btn" style={{ "--acc": val.color }} onClick={() => handleOpenLog(key, null)}>
                      <div className="log-picker-label">{val.label}</div>
                      <div className="log-picker-sub">{saved ? "✓ Logged today" : `${val.exercises.length} exercises`}</div>
                    </button>
                  );
                })}
              </div>
              <button className="log-picker-swim" onClick={handleOpenSwim}>
                <div className="log-picker-swim-label">Swimming</div>
                <div className="log-picker-swim-sub">Log distance in yards</div>
              </button>
              <button className="log-picker-cancel" onClick={() => setShowPicker(false)}>Cancel</button>
            </div>
          </div>
        )}

        <nav className="bnav">
          {nav.map(item => (
            <button key={item.key} className={`ni${tab === item.key && !isLogActive ? " active" : ""}`}
              onClick={() => { setLogContext(null); setShowSwimLog(false); setShowPicker(false); setTab(item.key); }}>
              {item.icon}{item.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
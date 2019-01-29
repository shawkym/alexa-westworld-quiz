function r(template) {
  for (var
    info = r.db[r.locale][template.join('\x01')],
    out = [info.t[0]],
    i = 1, length = info.t.length; i < length; i++
  ) out[i] = arguments[1 + info.v[i - 1]] + info.t[i];
  return out.join('');
}
r.locale = 'default';
r.db = {};

r.set = locale => (tCurrent, ...rCurrent) => {
  const key = tCurrent.join('\x01');
  let db = r.db[locale] || (r.db[locale] = {});
  db[key] = {
    t: tCurrent.slice(),
    v: rCurrent.map((value, i) => i)
  };
  const config = {
    for: other => (tOther, ...rOther) => {
      db = r.db[other] || (r.db[other] = {});
      db[key] = {
        t: tOther.slice(),
        v: rOther.map((value, i) => rCurrent.indexOf(value))
      };
      return config;
    }
  };
  return config;
};

exports.r = r;

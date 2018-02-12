// S4 Generator
const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

// GUID Generator
const guid = () => `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;

// Map values
const map = (value, low1, high1, low2, high2) => low2 + (high2 - low2) * (value - low1) / (high1 - low1);

export {
  guid,
  s4,
  map
}